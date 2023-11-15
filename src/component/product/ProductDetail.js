import React,{useEffect, useState} from 'react'
import Carousel from "react-material-ui-carousel"
import {useDispatch,useSelector} from "react-redux"
import {clearError, getProductDetails, newReview} from "../../action/productAction"
import { Link, useParams } from 'react-router-dom'
import "./productDetails.css";
import ReviewCard from "./ReviewCard.js"
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


function ProductDetail() {
    
    const {id}=useParams();
    const dispatch=useDispatch();
    const alert = useAlert();
    const {product,loading,error} = useSelector(
        (state)=>state.productDetails
    )
    const {success,error:reviewError} = useSelector((state)=>state.review)
    const {isAuthenticated} = useSelector((state)=>state.user);
    const [open,setOpen]=useState(false);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError())
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearError());
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(id))
    }, [dispatch,id,alert,error,success,reviewError])

    const options={
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      }

      const submitReviewToggle=()=>{
        open?setOpen(false):setOpen(true);
      }
      const submitReviewHandler=()=>{
        if(isAuthenticated){
        const myFrom=new FormData();
        myFrom.set("rating",rating);
        myFrom.set("Comment",comment);
        myFrom.set("ProductId",id);
        dispatch(newReview(myFrom));
        }else{
            alert.error("Login First");
        }
        setOpen(false);
      }
  return (
    <>
        {loading?<Loader/>:
            <>
            <div className='ProductDetails'>
                <div className='block1'>
                    <Carousel className='imageOfCarousel'>
                        {product.images && product.images.map((item,i)=>(
                            <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`}/>
                        ))}
                    </Carousel>
                </div>
                <div className='secondCont'>
                    <div className='DetailBlock-1'>
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className='DetailBlock-2'>
                        <Rating className='Rtng'{...options}/>
                        <span>({product.numberOfReviews}) reviews</span>
                    </div>
                    <div className='DetailBlock-3'>
                        <div className='DetailBlock-3-1'>
                            <h2>Links</h2>
                            {product.AdUrl && product.AdUrl.map((item, i) => (
                                <div className='Links' key={i}>
                                {i+1}.  
                                <a style={{margin:"0.4vmax"}} href={item}>{item}</a>
                                <br/>
                                </div>
                            ))}
                            <button>Add to saved</button>
                        </div>
                    </div>
                    <div className='DetailBlock-4'>
                        <p>
                            Description: <span> {product.description} </span>
                        </p>
                    </div>
                    {/* <button className='submitReview'>Submit</button> */}
                    <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                </div>
            </div>
            <h3 className='reviewHeading'>REVIEWS</h3>

            <Dialog aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className='submitDialog'></DialogContent>
                <Rating className='RatingArea' onChange={(e)=>setRating(e.target.value)} value={rating} size='large'/>
                <textarea 
                    className='submitDialogTextArea'
                    cols="30"
                    placeholder='Enter your review comment here'
                    rows='5'
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                >

                </textarea>
                <DialogActions>
                    <Button onClick={submitReviewToggle}>Cancel</Button>
                    <Button onClick={submitReviewHandler}>Submit</Button>
                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
        }
    </>
    
  )
}

export default ProductDetail
