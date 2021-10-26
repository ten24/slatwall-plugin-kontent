import React, { useEffect, useState } from 'react'
import { ProductsPicker } from '../../components/ProductsPicker'
import KontentPluginSDK from '../../services/kontentPluginSDK'
import ProductCard from '../../components/ProductCard'
import { SlatwalApiService } from '../../services/slatwallService'
const KontentSDK = new KontentPluginSDK()

function ProductPicker() {
  const [loaded, setLoaded] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [disabled, setDisabled] = useState(true)

  const elementChange = data => {
    console.log('Product Saved !')
  }

  KontentSDK.listenElementChanges([], elementChange)

  useEffect(() => {
    if (loaded) {
      KontentSDK.setHeight(500)
      console.log('Loaded Product Plugin')
      const kontentData = KontentSDK.getElement()
      setDisabled(kontentData?.disabled)
      if (kontentData?.value) {
        const payload = {
          entityName: 'product',
          includeCategories: true,
          includeImages: true,
          limitCountTotal: 0,
          includeAttributesMetadata: true,
        }

        payload['f:productID:in'] = kontentData.value
        SlatwalApiService.general
          .getEntity(payload, {
            'SWX-requestSiteCode': process.env.REACT_APP_SLATWALL_SITE_CODE,
          })
          .then(response => {
            if (response.isSuccess() && response.success().data && response.success().data.pageRecords) {
              setSelectedProducts(response.success().data.pageRecords)
            } else {
              console.log('There was an error fetching the data.')
              setSelectedProducts([])
            }
          })
      }
    } else {
      KontentSDK.init(setLoaded)
    }
  }, [loaded])

  const saveProducts = () => {
    const productList = selectedProducts.length ? selectedProducts.map(product => product.productID).join(',') : null
    KontentSDK.setValue(productList)
  }
  if (!loaded) return ''

  if (disabled) {
    return (
      <div>
        <h2>Publish new version to update product list</h2>
        <div className="product-disabled">{Array.isArray(selectedProducts) && selectedProducts.length > 0 ? selectedProducts.map(product => <ProductCard key={product.productID} product={product} />) : 'No product mapped'}</div>
      </div>
    )
  } else {
    return <> {loaded && <ProductsPicker saveProducts={saveProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} </>
  }
}

export default ProductPicker
