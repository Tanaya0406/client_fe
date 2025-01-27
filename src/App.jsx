import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Typography,
  Button, 
  Tabs,
  Tab,
  IconButton
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";  
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; 
import dayjs from "dayjs";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';

// Main state variables for managing product data, search, filters, and pagination
const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const productsPerPage = 5;
   
    // Fetch products and categories data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get("https://fakestoreapi.com/products");
        const productsWithDates = productsResponse.data.map((product) => ({
          ...product,
          addedDate: dayjs().subtract(Math.floor(Math.random() * 30), "day"),
        }));
        setProducts(productsWithDates);
        setFilteredProducts(productsWithDates);

        const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
      setLoading(false);  // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

    // Handle search input change
  const handleSearch = (e) => setSearch(e.target.value);

  // Handle category filter selection
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  // Apply filters for search, category, and date range
  const handleFilter = () => {
    let filtered = [...products];

       // Filter products by search term
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter products by selected category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

      // Filter products by start date
    if (startDate) {
      filtered = filtered.filter((product) => dayjs(product.addedDate).isAfter(startDate));
    }

    // Filter products by end date
    if (endDate) {
      filtered = filtered.filter((product) => dayjs(product.addedDate).isBefore(endDate));
    }

    setFilteredProducts(filtered);
    setPage(1);  // Reset pagination to the first page
  };

   // Clear all filters
  const handleClear = () => {
    setSearch("");
    setSelectedCategory("");
    setStartDate(null);
    setEndDate(null);
    setFilteredProducts(products);
    setPage(1);
  };

  const handlePageChange = (event, value) => setPage(value);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  //pagination
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ fontFamily: "Arial, sans-serif",width:"100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FF7300",
            padding: "10px 20px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <Typography sx={{marginRight:"1rem" ,backgroundColor:"#FFB400" ,padding:"5px"}}>VJONE परिवार</Typography>
          <Typography sx ={{marginRight:"1rem"}}>DASHBOARD  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>CUSTOMERS  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>SIGNUP </Typography>
          <Typography sx ={{marginRight:"1rem"}}>QUERIES  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>RM'S  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>LEAD  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>LOCATIONS  </Typography>
          <Typography sx ={{marginRight:"1rem"}}>LEAD CONFIG  </Typography>
          <Typography sx ={{marginRight:"13rem"}}>BONUS CONFIG  </Typography>
          <NotificationsActiveIcon sx={{ marginRight: "0.5rem" }} />
          <Typography sx={{ marginRight: "1rem", display: "flex", alignItems: "center" ,borderRadius:"50%",backgroundColor:"white",color:"orange",padding:"0.5rem"}}> SP
</Typography>

          
<Typography sx={{ display: "flex", alignItems: "center" }}>
  Sanyukta Patil
  <LogoutIcon sx={{ marginLeft: "0.5rem" }} />
</Typography>
        </Box>

        <Typography 
  variant="h5" 
  sx={{ my: 2, fontWeight: "bold", fontSize: "1rem", color: "orange", display: "flex", alignItems: "center" }}
>
  <IconButton size="small" sx={{ marginleft:"5rem" }}>
    <ArrowBackIcon sx={{ color: "orange"}} />
  </IconButton>
  Go back
</Typography>

        <Typography variant="h5" sx={{ my: 2, fontWeight: "bold",marginLeft:"2rem" }}>
          All Customers
        </Typography>

        <Box
  sx={{
    display: "flex",
    gap: 2,
    flexDirection: "row",  
    mb: 3,
    alignItems: "center",  
    marginLeft:"2rem"
  }}
>
  <TextField
    label="Search"
    variant="outlined"
    value={search}
    onChange={handleSearch}
    sx={{ flexGrow: 1 }}  
  />
  <TextField
    label="Category"
    select
    value={selectedCategory}
    onChange={handleCategoryChange}
    sx={{ width: "20%" }}
  >
    <MenuItem value="">All Categories</MenuItem>
    {categories.map((category) => (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    ))}
  </TextField>
  <DatePicker
    label="Start Date"
    value={startDate}
    onChange={(newValue) => setStartDate(newValue)}
    renderInput={(params) => <TextField {...params} sx={{ width: "auto" }} />}
  />
  <DatePicker
    label="End Date"
    value={endDate}
    onChange={(newValue) => setEndDate(newValue)}
    renderInput={(params) => <TextField {...params} sx={{ width: "auto" }} />}
  />
  <Button
    variant="contained"
    sx={{ backgroundColor: "#FF7300", color: "#fff" }}
    onClick={handleFilter}
  >
    APPLY
  </Button>
  <Button
    variant="contained"
    sx={{ backgroundColor: "#FF0000", color: "#fff" }}
    onClick={handleClear}
  >
    CLEAR
  </Button>
</Box>


        <Tabs
  value={tabValue}
  onChange={handleTabChange}
  textColor="inherit"
  indicatorColor="primary"
  sx={{ mb: 3,marginLeft:"2rem" }}
>
  <Tab
    label={`APPROVED (${filteredProducts.length})`}
    sx={{
      "&.Mui-selected": {
        color: "#FF7300", 
        indicatorColor:"#FF7300"
      },
      fontWeight: "bold", 
    }}
  />
  <Tab
    label="NOT APPROVED (0)"
    disabled
    sx={{
      color: "gray", 
    }}
  />
</Tabs>


        {loading ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Typography variant="h6" sx={{ mt: 5, textAlign: "center" }}>
            No Results Found
          </Typography>
        ) : (
          <TableContainer sx={{marginLeft:"2rem"}} component={Paper}>
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell sx={{fontWeight:"bold"}}>Id</TableCell> 
                  <TableCell sx={{fontWeight:"bold"}}>Product Name</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Category</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Price</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Added Date</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{dayjs(product.addedDate).format("YYYY-MM-DD")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default App;
