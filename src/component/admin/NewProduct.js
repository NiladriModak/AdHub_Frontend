import React , {Fragment, useEffect,useState} from 'react'
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import {
    clearError, createProduct,
} from "../../action/productAction";
import "./newProduct.css"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import Metadata from '../layout/Metadata';
import { Navigate, useNavigate } from 'react-router-dom';
function NewProduct() {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const {loading,error,success} = useSelector((state)=>state.newProduct)
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [images,setImages]=useState([]);
    const [imagePreview,setImagePreview]=useState([]);
    const [urls, setUrls] = useState(['']);
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearError);
      }
      if(success){
        alert.success("Product Created Successfully");
        navigate("/admin/dashboard");
        dispatch({type:NEW_PRODUCT_RESET})
      }
    //   
    //   
    }, [dispatch,alert,error,success,navigate])
    
    const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("description", description);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });

        // Append the URLs to the FormData
        console.log(urls)
        urls.forEach((url) => {
          if (url.trim() !== '') {
            myForm.append('AdUrl',url);
          }
        });

        dispatch(createProduct(myForm));
      };

      const createProductImagesChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        console.log(files)
        // setImages([]);
        // setImagePreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagePreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
  const handleUrlChange = (e, index) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = e.target.value;
    setUrls(updatedUrls);
  };

  const removeUrlInput = (index) => {
    const updatedUrls = [...urls];
    updatedUrls.splice(index, 1);
    setUrls(updatedUrls);
  };


  const addUrlInput = () => {
    setUrls([...urls, '']);
  };

  return (
    <Fragment>
        <Metadata title="CreateProduct"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                <form className='createProductForm'
                encType='multipart/form-data'
                onSubmit={createProductSubmitHandler}>
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon/>
                        <input type='text'
                        placeholder='Product name'
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <DescriptionIcon/>
                        <textarea 
                        placeholder='Product Description'
                        required
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        cols="30"
                        row="1"
                        />
                    </div>
                    <div className='UrlContainer'>
                      {/* <SpellcheckIcon /> */}
                      {urls.map((url, index) => (
                        <div key={index}>
                          <input
                            className='UrlInput'
                            type="text"
                            placeholder="Product URL"
                            value={url}
                            onChange={(e) => handleUrlChange(e, index)}
                          />
                          {index > 0 && (
                            <button className='UrlBtn' onClick={() => removeUrlInput(index)}>-</button>
                          )}
                          <button className='UrlBtn' onClick={addUrlInput}>+</button>
                        </div>
                      ))}
                      
                    </div>
                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage">
                        {imagePreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>
                    {/* <div>
                      <input type='text' name='url' 
                    </div> */}
                    <Button id='createProductBtn'
                    type='submit'
                    disabled={loading?true:false}>
                    Create
                    </Button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct
