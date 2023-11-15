import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import WebFont from "webfontloader";
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'
import React from "react";
import ProductDetail from "./component/product/ProductDetail";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";
import LoginSignUp from "./component/user/LoginSignUp";
import history from './history';
import store from "./store"
import { loadUser } from "./action/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile.js"
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import DashBoard from "./component/admin/DashBoard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UserList from "./component/admin/UserList.js";

function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  React.useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser())
  }, [])
  
  return( 
  <Router history={history}>
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes >
      <Route exact path="/" Component={Home}/>
      <Route exact path="/product/:id" Component={ProductDetail}/>
      <Route exact path="/products/product/:id" Component={ProductDetail}/>
      <Route exact path="/products" Component={Products}/>
      <Route path="/products/:keyword" Component={Products}/>
      <Route exact path="/Search" Component={Search}/>
      <Route exact path="/login" Component={LoginSignUp}/>
      
      <Route element={<ProtectedRoute isAdmin={false}/>}>
        
        <Route exact path="/account" element={<Profile/>}/>
        
      </Route> 
      <Route element={<ProtectedRoute isAdmin={true}/>}>
        
        <Route  exact path="/admin/dashboard" element={<DashBoard/>}/>
        <Route  exact path="/admin/products" element={<ProductList/>}/> 
        <Route  exact path="/admin/product" element={<NewProduct/>}/> 
        <Route  exact path="/admin/users" element={<UserList/>}/>
      </Route> 
      {/* <Route element={<ProtectedRoute isAdmin={true}/>}>
        
      
        
      </Route>  */}
      
    </Routes>
    
    <Footer/>
  </Router>)
}

export default App;
