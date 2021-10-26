import { useEffect, useState, useRef } from 'react'
import { FilterSidebar } from './FilterSidebar'
import { ProductGrid } from './ProductGrid'
import { SelectedProductsSidebar } from './SelectedProductsSidebar'
import LoadingBar from 'react-top-loading-bar'
import ProductLoading from '../assets/components/ProductLoading'
import { SlatwalApiService } from '../services/slatwallService'

const ProductsPicker = ({ saveProducts, selectedProducts, setSelectedProducts }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState([])

  const [filters, setFilters] = useState({
    categories: [],
    productTypes: [],
    brands: [],
  })

  const loadingRef = useRef(null)

  useEffect(() => {
    loadingRef.current.continuousStart()
    setIsLoading(true)
    const payload = {
      entityName: 'product',
      'p:current': currentPage,
      includeCategories: true,
      includeImages: true,
      'p:show': 12,
      includeAttributesMetadata: true,
    }
    if (filters.categories.length) payload['f:categories.categoryID:in'] = filters.categories.join(',')
    if (filters.productTypes.length) payload['f:productType.productTypeID:in'] = filters.productTypes.join(',')
    if (filters.brands.length) payload['f:brand.brandID:in'] = filters.brands.join(',')
    if (searchTerm) payload['f:productName:like'] = `%${searchTerm}%`

    SlatwalApiService.general
      .getEntity(payload, {
        'SWX-requestSiteCode': process.env.REACT_APP_SLATWALL_SITE_CODE,
      })
      .then(response => {
        if (response.isSuccess() && response.success().data && response.success().data.pageRecords) {
          setProducts(response.success().data.pageRecords)
        } else {
          console.log('There was an error fetching the data.')
        }
        loadingRef.current.complete()
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, searchTerm])

  return (
    <div className="center-wrap">
      <LoadingBar color="#f11946" ref={loadingRef} />

      {selectedProducts && (
        <div className="main-container">
          <FilterSidebar filters={filters} setFilters={setFilters} searchTerm={searchTerm} setCurrentPage={setCurrentPage} setSearchTerm={setSearchTerm} />

          <div className="product-container">{isLoading ? <ProductLoading /> : <ProductGrid products={products} currentPage={currentPage} setCurrentPage={setCurrentPage} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}</div>
          <SelectedProductsSidebar saveProducts={saveProducts} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        </div>
      )}
    </div>
  )
}

export { ProductsPicker }
