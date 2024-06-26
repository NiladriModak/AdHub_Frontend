import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, deleteUser } from "../../action/userAction.js";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import MetaData from "../layout/Metadata.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";

import { getAllUsers } from "../../action/userAction.js";
import { DELETE_USER_RESET } from "../../constants/userConstants.js";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id, alert));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, navigate]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        const userRole = params.row.role;
        return userRole === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const userId = params.row.id;
        return (
          <Fragment>
            <Link to={`/admin/user/${userId}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(userId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
