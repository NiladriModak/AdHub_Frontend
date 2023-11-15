import React, { useEffect } from 'react'
import { CgChevronDoubleDown } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCart.js"
import Metadata from '../layout/Metadata';
import {clearError, getProduct} from "../../action/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"
import { useParams } from 'react-router-dom';
import ProductCart from './ProductCart.js';
// const product={
//     _id:"NILU",
//     name:"Blue shirt",
//     price:3000,
//     url:["https://i.ibb.co/DRST11n/1.webp"]
// }
function Home() {
  const alert=useAlert();
  const dispatch=useDispatch();
  const keyword=useParams();
  const {loading,error,product,productsCount}=useSelector((state)=>state.product)
  const ty=product
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearError())
    }
    dispatch(getProduct(keyword))
  }, [dispatch,error,alert,keyword])
  
  return (
    <>
    {loading?<Loader/>:<>
    <Metadata title={"AddHub"}/>
    <div className='banner'>
      {/* <h1>Welcome to Ecommerce</h1> */}
      <h1>Welcome to Advertising Hub</h1>
      {/* <p>Find Amazing Products Below</p> */}
      <p>Find Amazing Advertise Below</p>
      <a href='#homeHeading'>
          <button className='HomeButton'>
          <CgChevronDoubleDown size={30} color=' rgb(8, 86, 131)'/>  
          </button>
      </a>
    </div>
    <h2 className='homeHeading' id='homeHeading'>Featured Products</h2>

    <div className='container' id='container'>
      {ty && ty.map(items=>(
        <ProductCart key={items._id} product={items}/>
      ))}

    </div>
  </>}
  </>
  )
}
export default Home;
