import React from 'react'
import ProductCard1 from './ProductCard1'
import ProductCard2 from './ProductCard2'

const ProductCard = ({ type = 1, title, description, veg, url1, product,fetchCartProducts,cartProducts,addons,setLoginTray }) => {
  switch (type) {
    case 1: return <ProductCard1 title={title} description={description} veg={veg} url1={url1} product={product}/>
    case 2: return <ProductCard2 title={title} description={description} veg={veg} url1={url1} product={product} fetchCartProducts={fetchCartProducts} cartProducts={cartProducts} addons={addons} setLoginTray={setLoginTray}/>
    default: return <></>
  }
}

export default ProductCard;