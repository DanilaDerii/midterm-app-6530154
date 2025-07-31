import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);
  const [selectedItem, setSelectedItem] = useState(products[0].code);

  const addItem = () => {
    const product = products.find((v) => selectedItem === v.code);

    const newItem = {
      item: product.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discountRef.current.value) || 0,
    };

    // Merge duplicate items if same product name and price
    setDataItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.item === newItem.item && Number(it.ppu) === Number(newItem.ppu)
      );

      if (existingIndex >= 0) {
        // merge qty & discount
        const updated = [...prev];
        updated[existingIndex].qty += newItem.qty;
        updated[existingIndex].discount += newItem.discount;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const deleteByIndex = (index) => {
    setDataItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setDataItems([]);
  };

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedItem(selectedCode);
    const product = products.find((v) => v.code === selectedCode);
    setPpu(product.price);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* Left side form */}
        <Grid item xs={12} md={4} sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <InputLabel>Item</InputLabel>
            <Select
              fullWidth
              inputRef={itemRef}
              value={selectedItem}
              onChange={productChange}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Price Per Unit"
              type="number"
              fullWidth
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(Number(e.target.value))}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              defaultValue={1}
              inputRef={qtyRef}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Discount"
              type="number"
              fullWidth
              defaultValue={0}
              inputRef={discountRef}
            />
          </Box>

          <Button variant="contained" fullWidth onClick={addItem}>
            Add
          </Button>
        </Grid>

        {/* Right side table */}
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
