import React, { useEffect } from 'react'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_products } from '../../redux/slices/productSlice'
import { Link } from 'react-router-dom'
import {FaPen, FaTrash} from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'

const ViewProducts = () => {
  let {data,isLoading}=useFetchCollection("products")
  let dispatch=useDispatch()
  let products=useSelector(selectProducts)
  useEffect(()=>{
      dispatch(store_products({products:data}))
  },[data,dispatch])

  let handleDelete=(id,imageURL)=>{
    if(window.confirm("are you sure to delete this product??")){
      deleteProduct(id,imageURL)
    }
  }
  let deleteProduct=async(id,imageURL)=>{
    try{
        await deleteDoc(doc(db,"products",id))
        const re=ref(storage,imageURL)
        await deleteObject(re)
        toast.success("product deleted")
        }
    catch(error){
      toast.error(error.message)
    }
  }
  return (
    <div>
      <h1>All Products</h1>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Brand</th>
              <th scope="col">Stock</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product,index)=>
            <tr class="" key={index}>
              <td scope="row">{index+1}</td>
              <td>{product.name}</td>
              <td> <img src={product.imageURL} style={{width:'50px',height:'50px'}}/>
                </td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.countInStock}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/admin/edit/${product.id}`}  className="btn btn-success"><FaPen/></Link>
                <button type="button" class="btn btn-danger ms-2"
                onClick={()=>handleDelete(product.id,product.imageURL)}><FaTrash/></button>
              </td>
            </tr>
    )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewProducts
