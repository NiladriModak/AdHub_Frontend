import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../images/logo.png"
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";

const options={
    burgerColorHover:"#F39C12 ",//the menu option colour on hover
    logo,
    logoWidth:"22vmax",
    navColor1:"#34495E", 
    burgerColor:"black" ,//background colour of the layout
    logoHoverSize:"10px",
    logoHoverColor:"#F39C12",
    link1Text:"Home",
    link2Text:"Product",
    link3Text:"Contact",
    link4Text:"About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size:"2vmax",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-center",
    nav4justifyContent: "flex-start",
    link1Margin:"1vmax",
    link1Color:"white",
    link1ColorHover: "#F39C12",
    profileIconUrl:"/login",
    profileIcon:true,
    profileIconColor: "white",
    ProfileIconElement: MdAccountCircle, 
    cartIcon:true,
    cartIconColor: "white",
    CartIconElement:MdAddShoppingCart,
    
    searchIcon:true,
    searchIconColor: "white",
    SearchIconElement:MdSearch,
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
}

function Header() {
  return (
    <ReactNavbar {...options}/>
  )
}

export default Header
