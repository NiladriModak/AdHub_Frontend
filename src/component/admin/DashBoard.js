import React, { useEffect }  from 'react'
import Sidebar from './Sidebar.js'
import "./dashboard.css"
import { Typography } from '@mui/material'
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
} from "../../action/productAction";
import { Link } from 'react-router-dom'
function DashBoard() {
  const dispatch=useDispatch();
  const { error, product } = useSelector((state) => state.product);
  const {users} = useSelector((state)=>state.allUsers);
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className='dashboardSummary'>
          <div>
            <p>All Summary</p>
          </div> 
        </div>
        <div className='dashboardSummaryBox2'>
          <Link to="/admin/products">
            <p>Products</p>
            <p>{product && product.length}</p>
          </Link> 
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>   
        </div>
      </div>
    </div>
  )
}

export default DashBoard
