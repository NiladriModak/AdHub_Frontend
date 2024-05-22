import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid/DataGrid';

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  deleteProduct,
  getAdminProduct,
//   deleteProduct,
} from "../../action/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import MetaData from "../layout/Metadata.js";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";

import { useParams } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants.js";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error,navigate,isDeleted,deleteError]);

  const deleteProductHandler=(id)=>{

    dispatch(deleteProduct(id));


  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 350, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 450,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const productId = params.row.id; // Accessing the 'id' property from the row
        return (
          <Fragment>
            <Link to={`/admin/product/${productId}`}>
              <EditIcon />
            </Link>
            <Button onClick={() =>
                deleteProductHandler(productId)
              } >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
      });
    });
    
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            
            rows={rows}
            columns={columns}
            pageSize={16}
            disableSelectionOnClick
            className="productListTable"
            autoHeight="true"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
