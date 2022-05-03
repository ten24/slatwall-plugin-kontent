import { ListingPaginationModern } from './ListingPaginationModern'

const ProductGrid = ({ products, selectedProducts, setSelectedProducts, currentPage, setCurrentPage }) => {
  const onSelectProduct = product => {
    const hasProduct = selectedProducts.filter(prod => prod.productID === product.productID).length > 0
    let products = [...selectedProducts, product]
    if (hasProduct) {
      products = [...selectedProducts, product].filter(prod => prod.productID !== product.productID)
    }
    setSelectedProducts(products)
  }
  return (
    <div>
      <div className="product-grid">
        {products.map(data => {
          return (
            <div className="dropdown-options product-card" key={data.productID}>
              <img src={data?.images?.length ? `${process.env.REACT_APP_SLATWALL_IMAGE_HOST}${data.images[1]}` : ''} alt="" />
              <div className="product-details">
                <span className="product-code">{data.productCode}</span>
                <span className="product-brand">{data.brandName}</span>
                <p>{data.productName}</p>
                <div className="product-price">
                  <p className="text-secondary">{data.listPrice !== ' ' && <s>${data.listPrice}</s>}</p>
                  <span> {data.salePrice !== ' ' && `$${data.salePrice}`}</span>
                </div>
                <button
                  className="btn btn--secondary"
                  onClick={() => {
                    onSelectProduct(data)
                  }}
                  disabled={selectedProducts.filter(sp => data.productID === sp.productID).length ? true : false}
                >
                  Add
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <ListingPaginationModern count={products.length} currentPage={currentPage} setPage={setCurrentPage} pageMax={12} />
    </div>
  )
}

export { ProductGrid }
