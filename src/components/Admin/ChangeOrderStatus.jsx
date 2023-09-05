import React, { useState } from 'react'
import Loader from '../Loader'
import useFetchDocument from '../../customHooks/useFetchDocument'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';
const ChangeOrderStatus = ({order,id,s}) => {
    let [status,setStatus]=useState(s)
    let [isLoading,setIsLoading]=useState(false)
    let {document}=useFetchDocument("orders",id)
    let navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const orderConfig={
            userID:order.userID,
            userEmail:order.userEmail,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            orderAmount:order.orderAmount,
            shippingAddress:order.shippingAddress,
            cartItems:order.cartItems,
            orderStatus:status,
            createdAt:order.createdAt,
            updatedAt:Timestamp.now().toDate()
        }
        try{
            setDoc(doc(db,"orders",id),orderConfig)
            setIsLoading(false)
            emailjs.send('service_6mb4fno', 'template_evvp4gq', {user_email:orderConfig.userEmail,order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'ouyyULNr1Fl9QYxiJ')
            .then((result) => {
                toast.success("order status changed")
                 navigate('/admin/orders')
            }, (error) => {
                console.log(error.text);
            });           
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
    }
  return (
    <div className='container'>
        {isLoading && <Loader/>} 
        <h4>Update Order Status</h4>
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="" class="form-label">Update Order Status</label>
                <select class="form-select form-select-lg" name="status" 
                value={status} onChange={(e)=>setStatus(e.target.value)}
                >
                    <option value=''>-----choose one-----</option>
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Cancelled</option>
                    <option>Delivered</option>
                </select>
                <button type="submit" class="btn btn-primary mt-2">Update</button>
            </div>
        </form>
    </div>
  )
}

export default ChangeOrderStatus
