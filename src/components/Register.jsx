import React, { useState } from 'react'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase/config'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
let intialValue={
  id:'',name:'',email:'',mobile:'',password:'',confirmpassword:'',role:'user'
}

const Register = () => {
  const [form,setForm]=useState({...intialValue})
  const [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let handleSubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, form.email, form.password)
  .then(async(userCredential) => {
        const user = userCredential.user;
        let {email,password,name,mobile,role}=form
        const ref=doc(db,"users",user.uid)    
        await setDoc(ref,{email, password,role,name,mobile, 
          createdAt:Timestamp.now().toDate()})
        setIsLoading(false)
        toast.success("Registered successfully")
        navigate('/login')
  })
  .catch((error) => {
    setIsLoading(false)
      toast.error(error.message)
  });
  }
  return (
    <div className='container mt-5'>
      {isLoading && <Loader/>}
    <h1 style={{textAlign:'center'}}>Register Form</h1><hr class="border border-primary border-3 opacity-75"/>
      <form  onSubmit={handleSubmit}>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control" name="name" id="formId1" placeholder="" value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <label for="formId1">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control" name="email" id="formId1" placeholder="" value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <label for="formId1">Email</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control" name="mobile" id="formId1" placeholder="" value={form.mobile}
          onChange={(e)=>setForm({...form,mobile:e.target.value})}/>
        <label for="formId1">Mobile</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control" name="password" id="formId1" placeholder=""  value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <label for="formId1">Password</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control" name="confirmpassword" id="formId1" placeholder="" value={form.confirmpassword}
          onChange={(e)=>setForm({...form,confirmpassword:e.target.value})}/>
        <label for="formId1">Confirm Password</label>
      </div>
      <div class="d-grid gap-2">
        <button type="submit" name="" id="" class="btn btn-primary">Register</button>
      </div>
      </form>
    </div>
  )
}

export default Register
