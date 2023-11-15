import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react';
import "./LoginSignUp.css"
import {useDispatch,useSelector} from "react-redux"
import { clearError,login,register} from '../../action/userAction';
import {useAlert} from "react-alert"
import Pic from "../../images/logo.png"
import history from '../../history';
// import MailOutlineIcon from "@mui/icons-material"
// import LockOpenIcon from "@material-ui/icons/LockOpenIcon"
function LoginSignUp() {

    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert=useAlert();
    const {loading,error,isAuthenticated}= useSelector((state)=>state.user)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // Default role is set to "user"
      });

    const {name,email,password,role} = user;

    const [avatar,setAvatar] = useState(Pic);
    const [avatarPreview,setAvatarPreview] = useState(Pic);

    const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        myForm.set("role", role);
        dispatch(register(myForm));
      };

      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const file = e.target.files[0]?e.target.files[0]:"/Profile.png"; // Get the first selected file
          if (file) {
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
      
            reader.readAsDataURL(file);
          } 
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearError());
      }
      if(isAuthenticated){
        navigate("/account");
      }
    }, [dispatch,error,isAuthenticated,alert,navigate]);
    

    const loginSubmit=(event)=>{
        event.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }
    const switchTab=(e,tab)=>{
        if(tab==='login'){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==='register'){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")
            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft");
        }
    }
  return (
    <Fragment>

        <div className='loginSignUpContainer'>
            <div className='loginSignUpBox'>
                <div>
                    <div className='loginsignUptoggle'>
                        <p
                            onClick={(e)=>switchTab(e,"login")}
                        >LOGIN</p>
                        <p
                            onClick={(e)=>switchTab(e,"register")}
                        >REGISTER</p>
                        
                    </div>
                    <button ref={switcherTab}></button>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            {/* <MailOutlineIcon/> */}
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e)=>setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            {/* <LockOpenIcon/> */}
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e)=>setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forget">Forget Password?</Link>
                        <input type='submit' value="login" className='loginBtn'/>
                    </form>

                    <form className='signUpForm' ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data'>
                        <div className='signUpName'>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                name='name'
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpRole">
                            <label>Role:</label>
                            <select
                                name="role"
                                value={user.role}
                                onChange={registerDataChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className='registerImage'>
                            <img src={avatarPreview} alt='PreviewImage'/>
                            <input 
                                type='file'
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type='submit' value="signUp" className='signUpBtn'/>
                    </form>

                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default LoginSignUp
