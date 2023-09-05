import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase/config'
import Loader from '../Loader'
import './progress.css'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slices/productSlice'
let initialState={id:'',name:'',price:'',brand:'',countInStock:'',desc:'',imageURL:'',category:''}
let categories=[
  {id:1,name:'men'}, {id:2,name:'women'}, {id:3,name:'kids'}, {id:4,name:'electronics'},{id:5,name:'grocery'}
]
const AddProduct = () => {
  let {id}=useParams()
  let [product,setProduct]=useState({...initialState})
  let [uploadProgress,setUploadProgress]=useState(0)
  let [isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()

  let products=useSelector(selectProducts)
  let productEdit=products.find((item,index)=>item.id==id)
 
  useEffect(()=>{
    if(id){setProduct({...productEdit})}
    else {setProduct({...initialState})}
  },[id])

    let handleChange=(event)=>{
        setProduct({...product,[event.target.name]:event.target.value}) 
    }
        let handleImage=(event)=>{
           let file=event.target.files[0]
           const storageRef=ref(storage,`Ecommerce-4thApr/${Date.now()}${file.name}`) 
           const uploadTask=uploadBytesResumable(storageRef,file)
           uploadTask.on("state_changed",(snapshot)=>{
              // const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
              // setUploadProgress(progress)
            },(error)=>toast.error(error.message),
           ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
              setProduct({...product,imageURL:url}) 
            })
           }
           )
        }
        let handleSubmit=(e)=>{
          e.preventDefault()
          setIsLoading(true)
          if(!id){
          try{
            const docRef=addDoc(collection(db,"products"),{
              name:product.name,
              price:product.price,
              imageURL:product.imageURL,
              category:product.category,
              brand:product.brand,
              countInStock:product.countInStock,
              desc:product.desc,
              createdAt:Timestamp.now().toDate()
            });
            setIsLoading(false)
            toast.success("product added")
            navigate('/admin/viewproducts')
          }
          catch(error){
            setIsLoading(false)
          }
        }
        else{
          if(product.imageURL != productEdit.imageURL){
            let imageRef=ref(storage,productEdit.imageURL)
            deleteObject(imageRef)
          }
          try{
            setDoc(doc(db,"products",id),{
              name:product.name,
              price:product.price,
              imageURL:product.imageURL,
              category:product.category,
              brand:product.brand,
              countInStock:product.countInStock,
              desc:product.desc,
              createdAt:product.createdAt,
              updatedAt:Timestamp.now().toDate()
            });
            setIsLoading(false)
            toast.success("product updated")
            navigate('/admin/viewproducts')
          }
          catch(error){
            setIsLoading(false)
          }
        }
        }
  return (
    <div>
      {isLoading && <Loader/>}
      <h1>{id ? "Edit " : "Add "} Product</h1>
      <form onSubmit={handleSubmit}>
            <div className='row'>
            <div class="form-floating mb-3 col-6">
              <input
                type="text"
                class="form-control" name="name"  value={product.name}
                onChange={handleChange}/>
              <label for="formId1">Product Name</label>
            </div>
            <div class="form-floating mb-3 col-6">
              <input
                type="number"
                class="form-control" name="price" value={product.price}
                onChange={handleChange}/>
              <label for="formId1">Product Price</label>
            </div>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control" name="brand"  value={product.brand}
                onChange={handleChange}/>
              <label for="formId1">Product Brand</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control" name="countInStock" value={product.countInStock}
                onChange={handleChange}/>
              <label for="formId1">CountInStock</label>
            </div>
            {/* {uploadProgress ==0 ? null :
            <div className='progress mb-2'>
              <div className='progress-bar' style={{width:`${uploadProgress}%`}}>
                {uploadProgress <100 ? `Uploading ${uploadProgress}%`:
                `uploaded ${uploadProgress}%`}
              </div>
            </div>
            } */}
            <div class="form-floating mb-3">
              <input
                type="file"
                class="form-control" name="imageURL" accept='image/*' onChange={handleImage}/>
              <label for="formId1">Product Image</label>
            </div>
            {id && <img src={productEdit.imageURL} style={{width:'100px',height:'100px'}}/>}
            <div class="mb-3">
              <label for="" class="form-label">Category</label>
              <select class="form-select form-select-lg" name="category" value={product.category}   onChange={handleChange} id="">
                <option selected>Select one</option>
               {categories.map((c,index)=><option key={index}>{c.name}</option>)}
              </select>
            </div>
            <div class="mb-3">
            <label for="formId1">Product Description</label>
              <textarea class="form-control" name="desc" value={product.desc}
                onChange={handleChange}></textarea>
              
            </div>
            <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="btn btn-primary">Save Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct
