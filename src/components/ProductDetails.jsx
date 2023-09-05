import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDocument from '../customHooks/useFetchDocument'
import spinnerImg from '../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, DECREASE_CART, selectCartItems } from '../redux/slices/cartSlice'
const ProductDetails = () => {
  const {id}=useParams()
  const {document}=useFetchDocument("products",id)
  const [product,setProduct]=useState(null)
  const cartItems=useSelector(selectCartItems)
  const cart=cartItems.find((item)=>item.id==id)
  const isCartAdded=cartItems.findIndex((item)=>item.id==id)
  const dispatch=useDispatch()
  useEffect(()=>{
    setProduct(document)
  },[document])
  let addtocart=(product)=>{
    console.log(product)
    dispatch(ADD_TO_CART(product))
}
  return (
    <div class="container mt-5">
      <h1>Product Details</h1><hr/>
      {product==null ? <img src={spinnerImg} style={{width:'150px'}}/>  :
        <div class="row shadow m-2 p-3">  
          <div className='col-4'>
          <img src={product.imageURL} style={{height:'250px',width:'300px',border:'2px solid black'}} />
           </div>
          <div className='col-4 offset-1'>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.desc}</p>
            {isCartAdded < 0  ?
            <button type="button" class="btn btn-danger" 
            onClick={()=>addtocart(product)}>Add to Cart</button>
              :
        <div className='input-group'>
                            <button type="button" onClick={()=>dispatch(DECREASE_CART(product))}>-</button>
                            <input type="text" className='text-center'readonly value={cart.cartQuantity}
                            style={{width:'40px'}}/>
                            <button type="button" onClick={()=>dispatch(ADD_TO_CART(product))}>+</button>
                        </div>
}
          </div>
        </div>
  }
    </div>
  )
}

export default ProductDetails
