"use client";
import { useEffect, useState } from "react";
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

const Page = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

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

  const handleSearchInput = () => {};

  const handleSearchKey = () => {};

  const handleChangeStatus = async (id: number, newStatus: OrderStatus) => {
    await api.changeOrderStatus(id, newStatus);
    await getOrders();
  };

  return (
    <Box sx={{ my: 3 }}>
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
          onChange={handleSearchInput}
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
          orders.map((item, index) => (
            <Grid key={index} item xs={1}>
              <OrderItem item={item} onChangeStatus={handleChangeStatus} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Page;
