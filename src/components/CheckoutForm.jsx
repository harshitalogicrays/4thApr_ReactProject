import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserEmail, selectUserID } from '../redux/slices/authSlice'
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../redux/slices/cartSlice'
import { selectShippingAddress } from '../redux/slices/checkoutSlice'
import spinnerImg from '../assets/spinner.jpg'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import emailjs from '@emailjs/browser';
const CheckoutForm = () => {
    const [message,setMessage]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const UserID=useSelector(selectUserID)
    const userEmail=useSelector(selectUserEmail)
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectCartTotalAmount)
    const shippingAddress=useSelector(selectShippingAddress)

    useEffect(()=>{
        let clientSecret=new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    },[stripe])

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setMessage(null)
        setIsLoading(true)
        const paymentIntent=await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/checkout-success"
            },
            redirect:"if_required"
        }).then((result)=>{
            if(result.error){
                toast.error(result.error)
                setMessage(result.message)
                return ;
            }
            if(result.paymentIntent){
                if(result.paymentIntent.status=="succeeded"){
                    setIsLoading(false)
                    toast.success("payment done")
                    saveorder()
                }
            }
        })
            setIsLoading(false)     
    }

    let saveorder=()=>{
        let today=new Date()
        const date=today.toDateString()
        const time=today.toLocaleTimeString()
        const orderConfig={
            userID:UserID,userEmail:userEmail,orderDate:date,orderTime:time,
            orderAmount:totalAmount,shippingAddress:shippingAddress,cartItems:cartItems,orderStatus:'Order Placed',
            createdAt:Timestamp.now().toDate()
        }
        try{
            addDoc(collection(db,"orders"),orderConfig)
            dispatch(CLEAR_CART())
            //send email
            emailjs.send('service_6mb4fno', 'template_evvp4gq', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
            .then((result) => {
                toast.success("order placed")
                 navigate('/checkout-success')
            }, (error) => {
                console.log(error.text);
            });
        }  
        catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
        <div className='row'>
            <div className='card col-5 m-2 shadow'>
                <CheckoutSummary/>
            </div>
            <div className='card col-5 m-2 shadow'>
                <PaymentElement id="payment_intent" ></PaymentElement>
                    <button type="submit" disabled={isLoading || !stripe || !elements} class="btn btn-primary mt-2">
                    <span>{isLoading ?<img src={spinnerImg} alt='loading' height='50px' />:<>(Pay Now)</> } </span>
                    </button>
            </div>
        </div>
        </form>
        <div>{message && <h3>{message}</h3>}</div>
    </div>
  )
}

export default CheckoutForm
