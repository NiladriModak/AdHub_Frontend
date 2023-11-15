import axios from "axios"
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants"


export const getProduct=(keyword="",currentPage=1)=>async(dispatch)=>{
    
    try{
        dispatch({type: ALL_PRODUCT_REQUEST});
        let link=`/products`
        // console.log("curent",keyword)
        let key="";
        if('keyword' in keyword){
            key=keyword.keyword;
        }
        link=`/products?keyword=${key}&page=${currentPage}`
        const {data} = await axios.get(link);
        console.log(data)
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message,})
    }
}


export const getAdminProduct=(keyword="",currentPage=1)=>async(dispatch)=>{
    
    try{
        dispatch({type: ADMIN_PRODUCT_REQUEST});
        const {data} = await axios.get("/admin/products");
        // console.log(data)
        dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:error.response.data.message,})
    }
}


export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/products/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data.product})
    } catch (error) {
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message,})
    }
}

export const newReview=(reviewData)=>async (dispatch)=>{

    try{
        dispatch({type:NEW_REVIEW_REQUEST});
        const config={
            header:{"Content-Type":"application/json"}
        }
        const {data} = await axios.put('/review',reviewData,config);
        dispatch({type:NEW_REVIEW_SUCCESS,payload:data.success})
    }catch(error){
        dispatch({type:NEW_REVIEW_FAIL,
            payload:error.response.data.message,})
    }
}

//create Product(admin)
export const createProduct=(productData)=>async (dispatch)=>{

    try{
        dispatch({type:NEW_PRODUCT_REQUEST});
        const config={
            header:{"Content-Type":"application/json"}
        }
        for (var pair of productData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        const {data} = await axios.post('/admin/products/new',productData,config);
        dispatch({type:NEW_PRODUCT_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message,})
    }
}

export const deleteProduct=(id)=>async (dispatch)=>{

    try{
        dispatch({type:DELETE_PRODUCT_REQUEST});
        const {data} = await axios.delete(`/admin/products/${id}`);
        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data.success})
    }catch(error){
        dispatch({type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message,})
    }
}
