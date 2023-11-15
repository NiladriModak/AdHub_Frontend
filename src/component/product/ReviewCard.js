import React from 'react'
import Profile from "../../images/Profile.png"
import "./productDetails.css";
import { Rating } from '@mui/material';
function ReviewCard(props) {
    
      const options={
        
        value: props.review.rating,
        readOnly: true,
        precision: 0.5,
      }
  return (
    <div className='reviewCard'>
        <img src={Profile} alt='User'/>
        <p>{props.review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{props.review.Comment}</span>
    </div>
  )
}

export default ReviewCard
