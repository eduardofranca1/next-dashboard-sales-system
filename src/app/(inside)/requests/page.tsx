"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Refresh, Search } from "@mui/icons-material";
import { Order, OrderStatus } from "@/types/Order";
import { api } from "@/libs/api";
import { OrderItem } from "@/components/OrderItem";
import { dateFormat } from "@/libs/dateFormat";

const Page = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  const getOrders = async () => {
    setSearchInput("");
    setOrders([]);
    setLoading(true);

    const result = await api.getOrders();

    setOrders(result);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setSearchInput("");
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === "enter") {
      if (searchInput != "") {
        let newOrders: Order[] = [];

        for (let i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }

        setFilteredOrders(newOrders);
      } else {
        setFilteredOrders(orders);
      }
    }
  };

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus);
    await getOrders();
  };

  const handlePrintAction = (order: Order) => {
    setPrintOrder(order);
    // aguadar um pouco, pois o react precisa atualizar o state, e renderizar
    setTimeout(() => {
      if (window) window.print();
    }, 200);
  };

  return (
    <>
      <Box sx={{ my: 3, displayPrint: "none" }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              component={"h5"}
              variant="h5"
              sx={{ color: "#555", mr: 2 }}
            >
              Requests
            </Typography>
            {loading && <CircularProgress size={24} />}
            {!loading && (
              <Button
                onClick={getOrders}
                size="small"
                sx={{ justifyContent: { xs: "flex-start", md: "center" } }}
              >
                <Refresh />
                <Typography
                  component={"div"}
                  sx={{ color: "#555", display: { xs: "none", sm: "block" } }}
                >
                  Atualizar
                </Typography>
              </Button>
            )}
          </Box>
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKey}
            placeholder="Search a request"
            variant="standard"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 4 }}>
          {loading && (
            <>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
              <Grid item xs={1}>
                <Skeleton variant="rectangular" height={220} />
              </Grid>
            </>
          )}
          {!loading &&
            filteredOrders.map((item, index) => (
              <Grid key={index} item xs={1}>
                <OrderItem
                  onPrint={handlePrintAction}
                  item={item}
                  onChangeStatus={handleChangeStatus}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box sx={{ display: "none", displayPrint: "block" }}>
        {printOrder && (
          <>
            <Typography component={"h5"} variant="h5">
              Pedido
            </Typography>
            <Box>ID: #{printOrder.id}</Box>
            <Box>Request date: {dateFormat(printOrder.orderDate)}</Box>
            <Box>Customer: {printOrder.userName}</Box>

            <Typography component={"h5"} variant="h5">
              Payment
            </Typography>
            <Box>
              Payment type:{" "}
              {printOrder.paymentType === "card" ? "Card" : "Money"}
            </Box>
            <Box>Subtotal: $ {printOrder.subtotal.toFixed(2)}</Box>
            <Box>Shipping price: $ {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.cupomDiscount && (
              <Box>
                Cupom discount: -$ {printOrder.cupomDiscount.toFixed(2)}
              </Box>
            )}
            <Box>Total: {printOrder.total.toFixed(2)}</Box>

            <Typography component={"h5"} variant="h5">
              Address
            </Typography>
            <Box>Zip Code: {printOrder.shippingAddress.cep}</Box>
            <Box>Address: {printOrder.shippingAddress.address}</Box>
            <Box>Number: {printOrder.shippingAddress.number}</Box>
            <Box>Complement: {printOrder.shippingAddress.complement}</Box>
            <Box>Neighborhood: {printOrder.shippingAddress.neighborhood}</Box>
            <Box>City: {printOrder.shippingAddress.city}</Box>
            <Box>State: {printOrder.shippingAddress.state}</Box>

            <Typography component={"h5"} variant="h5">
              Items
            </Typography>
            {printOrder.products.map((item, index) => (
              <Box key={index}>
                {item.amount}x {item.product.name}
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Page;
