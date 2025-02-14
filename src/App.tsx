import { Box } from "@mui/material";
import Search from "./components/Search";
import BooksGrid from "./components/BooksGrid";

function App() {
  return (
    <Box sx={{ width: "100%" }}>
      <Search />
      <BooksGrid />
    </Box>
  );
}

export default App;
