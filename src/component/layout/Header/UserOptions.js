import React, { Fragment, useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import Dashboard from '@mui/icons-material/Dashboard';
import ExitToApp from '@mui/icons-material/ExitToApp';
import  Person from '@mui/icons-material/Person';
import Backdrop from '@mui/material/Backdrop';
import  ListAlt from '@mui/icons-material/ListAlt';
import { SpeedDialAction} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {useAlert} from "react-alert";
import {useDispatch} from "react-redux"
import { logout } from '../../../action/userAction';
import "./Header.css";
function UserOptions({user}) {
  const navigate = useNavigate();
  const alert=useAlert();
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false)
  const orders=()=>{
    navigate("/saved")
  }
  const account=()=>{
    navigate("/account")
  }
  const userLogout=()=>{
    dispatch(logout())
    alert.success("Logged out sucessfully")
    navigate("/login")
    
  }
  const dashboard=()=>{
    navigate("/admin/dashboard");
  }
  const options=[
    {icon:<ListAlt/> ,name:"Saved", func:orders},
    {icon:<Person/> ,name:"Person", func:account},
    {icon:<ExitToApp/> ,name:"Logout", func:userLogout}
  ]
  if(user.role==="admin"){
    {options.unshift({icon:<Dashboard/> ,name:"Dashboard", func:dashboard})}
  }


  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:10}}/>
      <SpeedDial
        className='SpeedDial'
        ariaLabel="SpeedDial basic example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        // sx={{ position: 'fixed', top: "3vmax", right: "3vmax" }}
        open={open}
        icon={<img className='SpeedDialIcon' src={user.avatar.url} alt="Profile" />}
        direction='down'
      >
        {options.map((item)=>(
          <SpeedDialAction icon={item.icon} key={item.name} tooltipTitle={item.name} onClick={item.func}/>
        ))}
        
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
