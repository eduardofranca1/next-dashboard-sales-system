"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Refresh, Search } from "@mui/icons-material";
import { Order, OrderStatus } from "@/types/Order";
import { api } from "@/libs/api";
import { OrderItem } from "@/components/OrderItem";
import { dateFormat } from "@/libs/dateFormat";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewProduct = () => {};

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
          <Typography
            component={"h5"}
            variant="h5"
            sx={{ color: "#555", mr: 2 }}
          >
            Products
          </Typography>
          <Button onClick={handleNewProduct}>New Product</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: 50, display: { xs: "none", md: "table-cell" } }}
              >
                ID
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Price
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                Category
              </TableCell>
              <TableCell sx={{ xs: 50, md: 130 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Page;
