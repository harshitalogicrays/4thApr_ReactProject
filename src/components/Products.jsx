import React, { useEffect } from 'react'
import useFetchCollection from '../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../redux/slices/productSlice'
import ProductList from './ProductList'
import { selectFilterProducts } from '../redux/slices/filterSlice'

const Products = () => {
    let {data,isLoading}=useFetchCollection("products")
    let dispatch=useDispatch()
    let products=useSelector(selectProducts)
    let filterproducts=useSelector(selectFilterProducts)
    useEffect(()=>{
        dispatch(store_products({products:data}))
    },[data,dispatch])
  return (
    <div className='container'>
      <h1>Products </h1>
      <hr/>
      {
        filterproducts.length==0 ? <ProductList products={products}/>
        : <ProductList products={filterproducts}/> }
    </div>
  )
}

export default Products
