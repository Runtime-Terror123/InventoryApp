import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${apiURL}/orders/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      setOrder(data);
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/items/${id}`);
  };

  const orderColumns = [
    { field: "id", headerName: "Item ID", width: 150 },
    { field: "name", headerName: "Item name", flex: 1 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 150 },
  ];

  const modifiedItems = order?.Items.map((item) => ({
    ...item,
    quantity: item.OrderItem?.quantity || 0,
  }));

  if (!order) return <CircularProgress />;

  return (
    <Box>
      <Box>
        <Typography variant="h4">Order #{order.id}</Typography>
        <Typography variant="h6">From: {order.User}</Typography>
        <Typography>Total: ${order.totalPrice}</Typography>
      </Box>
      <Box>
        <DataGrid
          getRowId={(row) => row.id}
          rows={modifiedItems}
          columns={orderColumns}
          onRowClick={(row) => handleRowClick(row.id)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Order;
