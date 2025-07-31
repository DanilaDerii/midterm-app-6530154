import { useState, useRef, useEffect } from "react";
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

// ✅ Direct JSON import (Vite bundles this automatically)
import productsData from "./products.json";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [ppu, setPpu] = useState(0);
  const [dataItems, setDataItems] = useState([]);

  // ✅ Load products from JSON on mount
  useEffect(() => {
    setProducts(productsData);
    if (productsData.length > 0) {
      setSelectedItem(productsData[0].code);
      setPpu(productsData[0].price);
    }
  }, []);

  const addItem = () => {
    const product = products.find((v) => selectedItem === v.code);
    if (!product) return;

    const newItem = {
      item: product.name,
      ppu: Number(ppuRef.current.value),
      qty: Number(qtyRef.current.value),
      discount: Number(discountRef.current.value) || 0,
    };

    // ✅ Merge duplicate items if same name & price
    setDataItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.item === newItem.item && Number(it.ppu) === Number(newItem.ppu)
      );

      if (existingIndex >= 0) {
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
    if (product) {
      setPpu(product.price);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {/* ✅ LEFT FORM PANEL */}
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

        {/* ✅ RIGHT TABLE PANEL */}
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
