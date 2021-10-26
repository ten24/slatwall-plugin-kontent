import { useEffect, useState } from 'react'
import * as SlatwalSDK from '@slatwall/slatwall-sdk'
const CheckboxField = ({ ID, name, onSelect, filterList }) => {
  const selectedClass = filterList.includes(ID) ? 'option option--is-checkbox option--is-selected' : 'option option--is-checkbox'
  return (
    <div className="option__pane" key={ID}>
      <span onClick={onSelect}>
        <input className="option__input--hidden" value={ID} id={ID} name={name} defaultChecked={filterList.includes(ID)} />
        <label className={selectedClass}>
          <span className="option__label">{name}</span>
        </label>
      </span>
    </div>
  )
}
const FilterBox = ({ list = [], toSet, selectedList, heading }) => {
  return (
    <div style={{ marginBottom: 5 }}>
      <p className="u-spacing-l headline-medium">{heading}</p>
      {list.length > 0 &&
        list.map(el => {
          return (
            <CheckboxField
              ID={el.id}
              name={el.name}
              onSelect={() => {
                toSet(el)
              }}
              filterList={selectedList}
            />
          )
        })}
    </div>
  )
}
const FilterSidebar = ({ filters, setFilters, searchTerm, setSearchTerm, setCurrentPage }) => {
  const [productTypes, setProductTypes] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const SlatwalApiService = SlatwalSDK.init({
    host: process.env.REACT_APP_SLATWALL_URL,
  })

  const getProductTypes = async () => {
    let productTypes = await getAPI('producttype')
    let sortedProductTypes = productTypes.sort((a, b) => a.productTypeName.localeCompare(b.productTypeName))
    setProductTypes(sortedProductTypes)
  }
  const getCategories = async () => {
    let categoryData = await getAPI('category')
    let sortedCategory = categoryData.sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    setCategories(sortedCategory)
  }
  const getBrands = async () => {
    let brandData = await getAPI('brand')
    let sortedBrands = brandData.sort((a, b) => a.brandName.localeCompare(b.brandName))
    setBrands(sortedBrands)
  }

  const getAPI = entity => {
    let payload = {
      entityName: entity,
      includeAttributesMetadata: true,
    }
    return SlatwalApiService.general
      .getEntity(payload, {
        'SWX-requestSiteCode': process.env.REACT_APP_SLATWALL_SITE_CODE,
      })
      .then(response => {
        if (response.isSuccess() && response.success().data && response.success().data.pageRecords) {
          return response.success().data.pageRecords
        } else {
          console.log('There was an error fetching the data.')
        }
      })
  }

  useEffect(() => {
    getProductTypes()
    getCategories()
    getBrands()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCategory = category => {
    let categories = [...filters.categories, category.categoryID]
    if (filters.categories.includes(category.categoryID)) {
      categories = categories.filter(categoryID => categoryID !== category.categoryID)
    }
    setCurrentPage(1)
    setFilters({ ...filters, categories })
  }
  const setBrand = brand => {
    let brands = [...filters.brands, brand.brandID]
    if (filters.brands.includes(brand.brandID)) {
      brands = brands.filter(brandID => brandID !== brand.brandID)
    }
    setCurrentPage(1)
    setFilters({ ...filters, brands })
  }
  const setProductType = productType => {
    let productTypes = [...filters.productTypes, productType.productTypeID]
    if (filters.productTypes.includes(productType.productTypeID)) {
      productTypes = productTypes.filter(productTypeID => productTypeID !== productType.productTypeID)
    }
    setCurrentPage(1)
    setFilters({ ...filters, productTypes })
  }

  const categoriesList = categories.map(cat => {
    return { ...cat, id: cat.categoryID, name: cat.categoryName }
  })

  const productTypesList = productTypes.map(pt => {
    return { ...pt, id: pt.productTypeID, name: pt.productTypeName }
  })

  const brandsList = brands.map(bran => {
    return { ...bran, id: bran.brandID, name: bran.brandName }
  })

  return (
    <div>
      <h3>Filters</h3>

      <input
        name="product-search"
        placeholder="Search Product"
        type="text"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setCurrentPage(1)
            setSearchTerm(e.target.value)
          }
        }}
        onBlur={e => {
          setCurrentPage(1)
          setSearchTerm(e.target.value)
        }}
        className="text-field__input product-search"
      ></input>
      <div>
        <FilterBox heading="Categories" list={categoriesList} toSet={setCategory} selectedList={filters.categories} />
      </div>
      <div>
        <FilterBox heading="Product Types" list={productTypesList} toSet={setProductType} selectedList={filters.productTypes} />
      </div>
      <div>
        <FilterBox heading="Brands" list={brandsList} toSet={setBrand} selectedList={filters.brands} />
      </div>
    </div>
  )
}

export { FilterSidebar }
