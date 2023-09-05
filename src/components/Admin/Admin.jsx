import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Login from '../Login'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../redux/slices/authSlice'
import {  FaHome, FaUserCircle, FaUsers } from 'react-icons/fa'

const Admin = () => {
  let role=useSelector(selectUserRole)
  return (
    <>
    {role=="admin"?
    <div class="container-fluid">
    <div class="row">
        <div class="col-2 bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
               
                <a href="/" class="d-block p-3 link-dark text-decoration-none text-center" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                <FaUserCircle size={40}/><br/>
                  Dashboard
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                    <li class="nav-item">
                        <Link to='addproduct' class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">Add Product</Link>
                        
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='viewproducts'>
                        View Products
                        </Link>
                    </li>
                    <li>
                    <Link class="nav-link py-3 px-2" title="" 
                    data-bs-toggle="tooltip" data-bs-placement="right" 
                    data-bs-original-title="Home" to={'viewuser'}>
                        View Users
                        </Link>
                    </li>
                    <li>
                    <Link class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" to='orders'>
                        View Orders
                        </Link>
                    </li>
                </ul>
              
            </div>
        </div>
        <div class="col-8 offset-1 p-3">
            <Outlet/>
        </div>
    </div>
</div>
:
    <Login/>
  }
  </>
  )
}

export default Admin
