/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  InputBase,
  styled,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearch } from "../core/reducer/search";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterPopover from "./FilterPopover";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const SearchBarContainer = styled("form")(({ theme }) => ({
  transform: "translateX(60%)",
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: "5px 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
  border: "1px solid #0d9bbf",
}));

export const StyledTitle = styled(Typography)(() => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#AF8C6A",
  textTransform: "uppercase",
}));

const StyledLogo = styled("img")({
  height: 100,
  width: 100,
});

const Search = () => {
  const [localQuery, setLocalQuery] = useState<string>("");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [typeResearch, setTypeResearch] = useState<string>("");

  console.log({ typeResearch });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (localQuery.trim()) {
      dispatch(setSearch({ query: localQuery, type: typeResearch }));
      console.log("Mot-clé de recherche :", localQuery);
    }
  };

  const handleRefresh = () => {
    dispatch(setSearch({ query: "", type: "" }));
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItem: "center" }}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <StyledLogo src="images/logo-book.png" alt="Logo" />
        <StyledTitle>GutenSearch</StyledTitle>
      </Box>
      <SearchBarContainer onSubmit={handleSubmit}>
        <Tooltip title="Recharger les livres">
          <IconButton color="info" onClick={handleRefresh}>
            <AutorenewIcon />
          </IconButton>
        </Tooltip>
        <InputBase
          placeholder="Rechercher un livre "
          sx={{ width: "100%" }}
          value={localQuery}
          onChange={handleChange}
        />
        <IconButton type="submit" color="info">
          <SearchIcon />
        </IconButton>
        <Tooltip title="Type de recherche">
          <IconButton color="info" onClick={handleFilterClick}>
            <FilterListIcon />
          <Typography>{typeResearch.toUpperCase()} </Typography>
          </IconButton>
        </Tooltip>

        <FilterPopover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClosePopover}
          typeHandler={setTypeResearch}
        />
      </SearchBarContainer>
    </Box>
  );
};

export default Search;
