import React from 'react'
import {Link, Navigate} from "react-router-dom"
// import ReactStars from "react-rating-stars-component"
import { Rating } from '@mui/material'

function ProductCart(props) {
  const options={
    size:"large",   
    value: props.product.ratings,
    readOnly: true,
    precision: 0.5,
  }
  
  return (
    <Link className='productCard' to={`product/${props.product._id}`}>
      <img src={props.product.images[0].url} alt='#'/>
      <p>{props.product.name}</p>
      <div>
        <Rating className='Ratting' {...options} />
        <span>({props.product.numberOfReviews}) reviews</span>
      </div>
      {/* <span>Rs. {props.product.price}</span> */}
    </Link>
  )
}

export default ProductCart
