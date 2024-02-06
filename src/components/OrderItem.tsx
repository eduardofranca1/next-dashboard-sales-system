import { dateFormat } from "@/libs/dateFormat";
import { Order, OrderStatus } from "@/types/Order";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

type Props = {
  item: Order;
  onChangeStatus: (id: number, newStatus: OrderStatus) => void;
};

export const OrderItem = ({ item, onChangeStatus }: Props) => {
  const getStatusBackground = (status: OrderStatus) => {
    const statuses = {
      preparing: "#2787BA",
      sent: "#27BA3A",
      delivered: "#999999",
    };
    return statuses[status];
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    onChangeStatus(item.id, event.target.value as OrderStatus);
  };

  return (
    //overflow: 'hidden' = o que passar do limite do primeiro box ele corta
    <Box
      sx={{
        border: "1px solid #EEE",
        color: "#FFF",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          backgroundColor: getStatusBackground(item.status),
        }}
      >
        <Box>
          <Typography component={"p"}>{dateFormat(item.orderDate)}</Typography>
          <Typography component={"p"}>{item.userName}</Typography>
          <Button size="small" sx={{ color: "#FFF", p: 0 }}>
            IMRPIMIR
          </Button>
        </Box>
        <Box>
          <Typography component={"p"} sx={{ fontSize: 24 }}>
            #{item.id}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 1, backgroundColor: "#EEE" }}>
        <Select
          variant="standard"
          value={item.status}
          fullWidth
          onChange={handleStatusChange}
        >
          <MenuItem value={"preparing"}>Preparing</MenuItem>
          <MenuItem value={"sent"}>Sent</MenuItem>
          <MenuItem value={"delivered"}>Delivered</MenuItem>
        </Select>
      </Box>
      <Box sx={{ p: 1, backgroundColor: "#FFF" }}>
        {item.products.map((itemMap, index) => (
          <Typography
            key={index}
            component={"p"}
            sx={{
              p: 1,
              color: "#000",
              fontWeight: "bold",
              borderBottom: "1px solid #CCC",
            }}
          >{`${itemMap.amount} x ${itemMap.product.name}`}</Typography>
        ))}
      </Box>
    </Box>
  );
};
