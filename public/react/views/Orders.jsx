import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../api";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiURL}/orders`);
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      setOrders(data);
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  };
  console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/orders/${id}`);
  };

  const ordersColumns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "User", headerName: "User", width: 150 },
    { field: "numItems", headerName: "Number of Items", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
  ];

  if (!orders) return <CircularProgress />;

  return (
    <Box className="orders-page">
      This is the orders page
      <DataGrid
        getRowId={(row) => row.id}
        rows={orders}
        columns={ordersColumns}
        onRowClick={(row) => handleRowClick(row.id)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
      />
    </Box>
  );
};

export default Orders;
