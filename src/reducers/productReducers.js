import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                productsCount: action.payload.countProducts,
                resultPerPage: action.payload.resultPerPage
            };
        case ADMIN_PRODUCT_SUCCESS:
            return{
                loading: false,
                product: action.payload.product,
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }

}

export const reviewReducer=(state={ },action)=>{
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                success:false,
                loading:true,
            }
        case NEW_REVIEW_SUCCESS:
            return{
                //...state,
                loading:false,
                success:action.payload,
            } 
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading:false,
                success:false,
            }
        default:
            return state;
    }
}

export const newProductReducer=(state={ product:{} },action)=>{
    switch(action.type){
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                success:false,
                loading:true,
            }
        case NEW_PRODUCT_SUCCESS:
            return{
                //...state,
                loading:false,
                success:action.payload.success,
                product:action.payload.product,
            } 
        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                loading:false,
                success:false,
            }
        default:
            return state;
    }
}


export const deleteProductReducer=(state={ product:{} },action)=>{
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isDeleted:false,
                loading:true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload,
            } 
        case DELETE_PRODUCT_FAIL:
            return{
                ...state,
                loading:false,
                isDeleted:false,
                error:action.payload,
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading:false,
                isDeleted:false,
            }
        default:
            return state;
    }
}