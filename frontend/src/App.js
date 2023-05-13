import './App.css';
import { Suspense, useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
// import Loader from "./component/layout/Loader/Loader" 
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";


import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import ElementsLayout from "./component/Route/ElementsLayout";

import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
// import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Suspense>
        <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
  
   
    {/* <Route  exact path="/" Component={Home} /> */}
    <Route path="/" element={<Home/>}/>

    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route  exact path="/products" element={<Products/>} />

    <Route exact path="/contact" element={<Contact />} />
    <Route exact path="/about" element={<About />} />
    <Route exact path="/search" element={<Search/>} />

    <Route path="/products/:keyword" element={<Products/>}/>
  

   { <Route element={<ProtectedRoute/>}>
    <Route path='/account' element={<Profile/>}/>
   </Route> }

    {/* <Route path="/account" element={isAuthenticated  ? <Profile /> : <LoginSignUp />} /> */}


    {/* <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <LoginSignUp />} /> */}

    { <Route element={<ProtectedRoute/>}>
    <Route path='/me/update' element={<UpdateProfile/>}/>
   </Route> }

    {/* <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <LoginSignUp />} /> */}
    
    
    { <Route element={<ProtectedRoute/>}>
    <Route path='/password/update' element={<UpdatePassword/>}/>
   </Route> }
    <Route exact path="/password/forgot" element={<ForgotPassword/>} />


    <Route path="/password/reset/:token" element={<ResetPassword/>}/>

    {/* <Route exact path="/password/reset/:token" component={ResetPassword} /> */}
    
    <Route exact path ="/login" element={<LoginSignUp/>}/>    
    
    {/* <Route path="/login/shipping" element={isAuthenticated ? <Shipping /> : <LoginSignUp />} /> */}

    { <Route element={<ProtectedRoute/>}>
    <Route path='/login/shipping' element={<Shipping/>}/>
   </Route> }
    
    
    {/* <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />} /> */}
    
    { <Route element={<ProtectedRoute/>}>
    <Route path='/order/confirm' element={<ConfirmOrder/>}/>
   </Route> }
    
    <Route  path="/cart" element={<Cart/>} />

   
      {/* <Route path="/process/payment" element={isAuthenticated ? <Payment /> : <LoginSignUp/>} /> */}

     {/* {stripeApiKey  && ( <Route exact path = "/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>)} */}
    
   
     {stripeApiKey && (
            <Route
              element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          )}



      {/* <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />} /> */}

     {/* <Route path="/orders" element={isAuthenticated ? <MyOrders /> : <LoginSignUp />} /> */}
     
    {/* //  <Route path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />} /> */}
     
     
    {/* //  <Route path="/admin/dashboard" element={(isAuthenticated)  ? <Dashboard /> : <LoginSignUp />} /> */}
    
     
    {/* //  <Route path="/admin/products" element={(isAuthenticated)  ? <ProductList /> : <LoginSignUp />} /> */}
    
    {/* //  <Route path="/admin/product" element={(isAuthenticated)  ? <NewProduct /> : <LoginSignUp />} /> */}
    
     {/* <Route path="/admin/product/:id" element={(isAuthenticated)  ? <UpdateProduct /> : <LoginSignUp />} /> */}
    
    {/* //  <Route path="/admin/orders" element={(isAuthenticated)  ? <OrderList /> : <LoginSignUp />} /> */}
    
    {/* //  <Route path="/admin/order/:id" element={(isAuthenticated)  ? <ProcessOrder /> : <LoginSignUp />} /> */}
     
   
   
   <Route element={<ProtectedRoute />}>
            <Route path='/success' element={<OrderSuccess />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/orders' element={<MyOrders />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/order/:id' element={<OrderDetails />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/products' element={<ProductList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product' element={<NewProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/product/:id' element={<UpdateProduct />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/orders' element={<OrderList />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/order/:id' element={<ProcessOrder />} />
          </Route>
   
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/users' element={<UsersList />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/user/:id' element={<UpdateUser />} />
          </Route>

          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path='/admin/reviews' element={<ProductReviews />} />
          </Route>

          {/* <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> */}

    </Routes>
    
    <Footer/>
    
  </Router>
  </Suspense>
  );
}

export default App;
