import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Admin from './components/Admin/Admin'
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
import Products from './components/Products';
import ViewUser from './components/ViewUser';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess'
import OrderHistory from './components/OrderHistory';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';
function App() {
  return (
    <>
    <ToastContainer autoClose={2000}/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='viewproducts' element={<ViewProducts/>}/>
          <Route path='viewuser' element={<ViewUser/>}/>
          <Route path='edit/:id'  element={<AddProduct/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='order-details/:id/:orderStatus' element={<OrderDetails/>}/>
      </Route>
      <Route path='/products' element={<Products/>}/>
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    
    </>
  );
}

export default App;
