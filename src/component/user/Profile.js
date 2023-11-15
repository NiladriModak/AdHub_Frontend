import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import "./Profile.css"

function Profile() {
    const {user,loading,isAuthenticated}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    useEffect(() => {
      if(isAuthenticated===false){
        <Link to="/login"></Link>
      }
    }, [navigate,isAuthenticated])
    
  return (
    <Fragment>
        {loading?<Loader/>:<Fragment>
        <div className='ProfileContainer'>
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url?user.avatar.url:"/Profile.png"} alt='Name'/>
                <Link to="/me/updates">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined At</h4>
                    <p>{user.createdAt.substr(0,10)}</p>
                </div>
                <div>
                    <Link to="/password/update">Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Profile
