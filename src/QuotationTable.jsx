import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Quotation
        </Typography>
        <Typography>No items</Typography>
      </Box>
    );
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu - v.discount, 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quotation
      </Typography>
      <Button
        variant="outlined"
        color="error"
        startIcon={<MdClear />}
        sx={{ mb: 2 }}
        onClick={clearAll}
      >
        Clear
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">-</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center">Price/Unit</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((v, i) => {
            const amount = v.qty * v.ppu - v.discount;
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <BsFillTrashFill
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteByIndex(i)}
                  />
                </TableCell>
                <TableCell align="center">{v.qty}</TableCell>
                <TableCell>{v.item}</TableCell>
                <TableCell align="center">{v.ppu}</TableCell>
                <TableCell align="center">{v.discount}</TableCell>
                <TableCell align="right">{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
            <TableCell align="right">
              <strong>Total Discount:</strong>
            </TableCell>
            <TableCell align="right">{totalDiscount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
            <TableCell align="right">
              <strong>Total:</strong>
            </TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}

export default QuotationTable;
