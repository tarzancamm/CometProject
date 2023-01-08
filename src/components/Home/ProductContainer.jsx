import React from 'react'
import ProductCard from './ProductCard'
import styles from './ProductContainer.module.css'

const ProductContainer = (props) => {
  const displayProducts = props.products.map((product) => <ProductCard products={product}/>)

  return (
    <div className={styles['product-container']}>
      {displayProducts ? displayProducts : <h4>No products to display</h4>}
    </div>
  )
}

export default ProductContainer