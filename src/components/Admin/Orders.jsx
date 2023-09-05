import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectorders, store_orders } from '../../redux/slices/orderSlice'
import Loader from '../Loader'
import spinnerImg from '../../assets/spinner.jpg'
import { useNavigate } from 'react-router-dom'
const Orders = () => {
    let {data,isLoading}=useFetchCollection("orders")
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let orders=useSelector(selectorders)
    useEffect(()=>{
        dispatch(store_orders({orders:data}))
    },[data,dispatch])
  
    let handleOrder=(id,orderStatus)=>{
        if(orderStatus == 'Delivered'){
            navigate('/admin/orders')
        }
        else
            navigate(`/admin/order-details/${id}/${orderStatus}`)
    }
  return (
    <div className='container shadow ms-5 mt-3 p-3'>
    {isLoading && <Loader/>}
    <h1>Orders</h1><hr/>

    {orders.length == 0 ? 
      <><img src={spinnerImg} alt="loading..." style={{width:'50px',height:'50px'}}/></>
    :
    <>
    <table className="table table-bordered table-hover">
           <thead>
             <tr>
               <th>s/n</th>
               <th>Date</th>
               <th>Order ID</th>
               <th>Order Amount</th>
               <th>Order Status</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order, index) => {
               const {
                 id, orderDate, orderTime, orderAmount, orderStatus,} = order;
               return (
                 <tr key={id} onClick={()=>handleOrder(id,orderStatus)}>
                   <td>{index + 1}</td>
                   <td> {orderDate} at {orderTime}
                   </td>
                   <td>{id}</td>
                   <td> {"$"}{orderAmount} </td>
                   <td>
                     <p className={
                         orderStatus !== "Delivered"
                           ? "text-danger": "text-success"  } >
                       {orderStatus}
                     </p>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>   
   </>
    }
  </div>
  )
}

export default Orders
