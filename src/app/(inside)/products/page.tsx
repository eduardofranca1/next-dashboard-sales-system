"use client";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Product } from "@/types/Product";
import { Catergory } from "@/types/Category";
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton";
import { ProductTableItem } from "@/components/ProductTableItem";
import { ProductEditModal } from "@/components/ProductEditModal";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Catergory[]>([]);

  // states to delete
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product>();
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  // state to edit
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product>();
  const [loadingEditModal, setLoadingEditModal] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setProducts(await api.getProducts());
    setCategories(await api.getCategories());
    setLoading(false);
  };

  // Delete product

  // function to open modal
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      setLoadingDelete(true);
      await api.deleteProduct(productToDelete.id);
      setLoadingDelete(false);
      setShowDeleteDialog(false);
      await getProducts();
    }
  };

  // New and Edit product
  const handleNewProduct = () => {
    setProductToEdit(undefined);
    setEditModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  const handleSaveEditModal = async (event: FormEvent<HTMLFormElement>) => {
    // form data = é melhor para enviar imagens e textos juntos;
    let form = new FormData(event.currentTarget);

    setLoadingEditModal(true);

    if (productToEdit) {
      // form.append = para adicionar o ID do produto para Update
      form.append("id", productToEdit.id.toString());
      await api.updateProduct(form);
    } else {
      await api.createProduct(form);
    }
    setLoadingEditModal(false);
    setEditModalOpen(false);

    await getProducts();
  };

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
              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            )}
            {!loading &&
              products.map((itemMap, index) => (
                <ProductTableItem
                  item={itemMap}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
          </TableBody>
        </Table>

        <Dialog
          open={showDeleteDialog}
          // condição para previnir de fechar o modal ao clicar no botão "sim"
          onClose={() => (!loadingDelete ? setShowDeleteDialog(false) : null)}
        >
          <DialogTitle>
            Are you sure that you want to delete this product?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              It's not possible to go back after this action
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loadingDelete}
              onClick={() => setShowDeleteDialog(false)}
            >
              No
            </Button>
            <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <ProductEditModal
          openModal={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEditModal}
          disabled={loadingEditModal}
          product={productToEdit}
          categories={categories}
        />
      </Box>
    </>
  );
};

export default Page;
