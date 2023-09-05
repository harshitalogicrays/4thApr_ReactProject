import React from 'react'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

const ProductItem = ({id,name,price,desc,category,imageURL,brand,countInStock,product}) => {
    const dispatch=useDispatch()
    let addtocart=(product)=>{
        console.log(product)
        dispatch(ADD_TO_CART(product))
    }

  return (
    <div class="card col-3 m-3">
      <Link to={`/productdetails/${id}`}>
        <img class="card-img-top" src={imageURL} alt={name} style={{height:'200px'}}/>
        </Link>
        <div class="card-body">
            <h4 class="card-title">{name}</h4>
            <p class="card-text">{category}</p>
            <p class="card-text">{brand}</p>
            <p class="card-text">{price}</p>
            <button type="button" class="btn btn-danger" 
            onClick={()=>addtocart(product)}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductItem
