import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount } from '../redux/slices/cartSlice'
import {FaTrashAlt} from 'react-icons/fa'
import { selectIsLoggedIn } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectCartTotalAmount)
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
             dispatch(CALCULATE_SUBTOTAL())          
             dispatch(SAVE_URL(''))
    },[dispatch,cartItems])
    let url=window.location.href
    let checkout=()=>{
        if(isLoggedIn)
          navigate('/checkout-details')
        else{
          dispatch(SAVE_URL(url))
          navigate('/login')
        }
         
    }
  return (
    <div className='container mt-4'>
      <h1>My Cart</h1>
      <hr/>
      <div class="table-responsive shadow">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th scope="col">Sr. No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.length==0 && <tr><td colSpan={7}>No Item in Cart</td></tr>}
                {cartItems.map((item,index)=>                
                <tr key={index}>
                    <td scope="row">{index+1}</td>
                    <td>{item.name}</td>
                    <td><img src={item.imageURL} style={{width:'50px',height:'50px'}} /></td>
                    <td scope="row">${item.price}</td>
                    <td>
                        <div className='input-group'>
                            <button type="button" onClick={()=>dispatch(DECREASE_CART(item))}>-</button>
                            <input type="text" className='text-center' value={item.cartQuantity} readonly
                            style={{width:'40px'}}/>
                            <button type="button" onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
                        </div>
                        
                        </td>
                    <td>${item.price * item.cartQuantity}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(index))}>
                            <FaTrashAlt/>
                        </button>
                    </td>
                </tr>
                )}

            </tbody>
        </table>
      </div>
      <div className='row mt-4'>
        <div className='col-4'>
            <button type="button" class="btn btn-danger btn-lg" onClick={()=>dispatch(CLEAR_CART())}>Clear cart</button>
        </div>
      
        <div class="card shadow col-4 offset-4">
                <div class="card-body">
                <h4 class="card-title">Total : <span className='float-end'>$
                {cartTotalAmount}</span></h4>
                <hr/>
                    <div class="d-grid gap-2">
                      <button type="button" name="" id="" class="btn btn-warning" onClick={checkout}>Checkout</button>
                    </div>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default Cart
