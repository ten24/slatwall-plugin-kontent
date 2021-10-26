import React from 'react'

function ProductCard({ product }) {
  return (
    <div className="dropdown-options product-card" key={product.productID}>
      <img src={product.images.length ? `${process.env.REACT_APP_SLATWALL_IMAGE_HOST}${product.images[1]}` : ''} alt="" />
      <div className="product-details">
        <span className="product-code">{product.productCode}</span>
        <span className="product-brand">{product.brandName}</span>
        <p>{product.productName}</p>
        <div className="product-price">
          <p className="text-secondary">{product.listPrice !== ' ' && <s>${product.listPrice}</s>}</p>
          <span> {product.salePrice !== ' ' && `$${product.salePrice}`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
