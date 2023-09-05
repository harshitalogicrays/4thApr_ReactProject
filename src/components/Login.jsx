import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import Loader from './Loader'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { selectURL } from '../redux/slices/cartSlice'
import { useSelector } from 'react-redux'

const Login = () => {
  let [email,setEmail]=useState()
  let [password,setPassword]=useState()
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  const saveurl=useSelector(selectURL)
  let redirectURL=()=>{
    if(saveurl.includes('cart'))
      navigate('/cart')
    else
      navigate('/')
    }


  let handleSubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    const ref=doc(db,"users",user.uid)
    let docSnap=await getDoc(ref);
    if(docSnap.exists()){
      if(docSnap.data().role=="admin")
        navigate('/admin')
      else if(docSnap.data().role=="user")
        // navigate('/')
        redirectURL()
    }
    setIsLoading(false)
    toast.success("LoggedIn successfully")
    
  })
  .catch((error) => {
    setIsLoading(false)
      toast.error(error.message)
  });
  }
  const provider = new GoogleAuthProvider();
  let LoginwithGoogle=(e)=>{
    e.preventDefault();
    setIsLoading(true)
    signInWithPopup(auth, provider)
  .then(async(result) => {
     const user = result.user;
     let role="user"
     let name=user.displayName
     let email=user.email
     const ref=doc(db,"users",user.uid)    
     await setDoc(ref,{email,role,name,createdAt:Timestamp.now().toDate()})
    setIsLoading(false)
    toast.success("LoggedIn successfully")
    // navigate('/')
    redirectURL()
  }).catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });

  }
  return (
    <div className='container mt-5 col-5'>
      {isLoading&& <Loader/>}
      <h1 style={{textAlign:'center'}}>Login</h1>
      <hr class="border border-primary border-3 opacity-75"/>
      <form action="" >
         <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control" name="email" id="formId1" placeholder="" value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
        <label for="formId1">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control" name="password" id="formId1" placeholder=""  value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
        <label for="formId1">Password</label>
      </div>
      <div class="d-grid gap-2">
        <button type="submit" name="" id="" class="btn btn-primary" onClick={handleSubmit}>Login</button>
      </div>     
      <p>-------------------or-----------------</p>
      <div class="d-grid gap-2">
        <button type="submit" name="" id="" class="btn btn-danger" onClick={LoginwithGoogle}>Login with Google</button>
      </div>
      </form>
    </div>
  )
}

export default Login
