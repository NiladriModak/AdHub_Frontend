import React, { useEffect, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { clearError, getProduct } from '../../action/productAction'
import ProductCart from '../Home/ProductCart';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import "./Proucts.css";


function Products() {
    const dispatch=useDispatch();
    const {loading,product,productsCount,filteredProductsCount,resultPerPage,error} = useSelector((state)=>state.product);
    const [currentPage, setcurrentPage] = useState(1)
    const setcurrentPageNo=(e)=>{
        // console.log(e);
        setcurrentPage(e);
        
    }
    const ty=product;
    const alert = useAlert();
    const keyword=useParams();
    console.log(keyword)
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError);
        }
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch,alert,error,keyword,currentPage])
    
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <h2 className='ProductsHeading'>Products</h2>
                    <div className='products'>
                        {ty && ty.map(items=>(
                            <ProductCart key={items._id} product={items}/>
                        ))}
                    </div>
                    <div>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setcurrentPageNo}
                            nextPageText='Next'
                            prevPageText='Prev'
                            firstPageText='1st'
                            lastPageText='Last'
                            itemClass='page-limit'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                    </div>
                </>
            }
        </>
    )
}

export default Products
