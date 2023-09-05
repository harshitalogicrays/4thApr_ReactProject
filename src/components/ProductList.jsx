import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
   <>
   {products.length==0 && <h1>No product Found</h1>}
   <div className='row'>
   {products.map((product,index)=><ProductItem key={index} product={product} {...product}/>)}
   </div>
   </>
  )
}

export default ProductList
