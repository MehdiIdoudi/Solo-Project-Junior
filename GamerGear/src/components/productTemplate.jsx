// import React from 'react'

function ProductTemplate(props) {
  return (
    <div className="products-container">
        <img src={props.imageUrl} alt="pc Image" className="product-image" />
        <h1 className="product-name">{props.name}</h1>
        <p className="product-description">{props.price}</p>
        <p className="product-stock">{props.stock}</p>
        <input type="button" className="btn-add" value="add to card" />
        
    </div>
  )
}

export default ProductTemplate