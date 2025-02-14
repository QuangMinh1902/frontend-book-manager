import { useState } from "react";
import { Box, Paper, Typography, Grid, Pagination } from "@mui/material";
import { styled } from "@mui/system";
import {
  useGetBooksQuery,
  useSearchBooksQuery,
  useSearchByRegexQuery,
  useSearchByPhraseQuery,
  useSearchByWeightingQuery,
  useSearchByNLPQuery,
  useSearchByMetadataQuery,
  useSearchByFuzzyQuery,
} from "../core/api/book";
import { Book } from "../core/model/library";
import BookModal from "./BookModal";
import { useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { StyledTitle } from "./Search";

const StyledImage = styled("img")({
  width: "100%",
  height: "300px",
  objectFit: "contain",
  borderRadius: "8px",
});

const BooksGrid = () => {
  const { query, type } = useSelector((state: RootState) => state.search);

  console.log({ query, type });

  const effectiveType = type.trim() || "keyword";

  const { data: defaultBooks } = useGetBooksQuery();

  const { data: keywordBooks } = useSearchBooksQuery(query, {
    skip: effectiveType !== "keyword" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
  const { data: regexBooks } = useSearchByRegexQuery(query, {
    skip: effectiveType !== "regex" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
  const { data: phraseBooks } = useSearchByPhraseQuery(query, {
    skip: effectiveType !== "phrase" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
  const { data: weightingBooks } = useSearchByWeightingQuery(query, {
    skip: effectiveType !== "pondéré" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
  const { data: nlpBooks } = useSearchByNLPQuery(query, {
    skip: effectiveType !== "contextuel" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
  const { data: fuzzyBooks } = useSearchByFuzzyQuery(query, {
    skip: effectiveType !== "similaire" || !query.trim(),
    refetchOnMountOrArgChange: true,
  });
 
  const { data: metadataBooks } = useSearchByMetadataQuery(
    { author: query, year: 0, genre: "" },
    {
      skip: effectiveType !== "metadata" || !query.trim(),
      refetchOnMountOrArgChange: true,
    }
  );

  let booksToDisplay: Book[] | undefined = defaultBooks;

  if (query.trim()) {
    switch (effectiveType) {
      case "keyword":
        booksToDisplay = keywordBooks;
        break;
      case "regex":
        booksToDisplay = regexBooks;
        break;
      case "phrase":
        booksToDisplay = phraseBooks;
        break;
      case "pondéré":
        booksToDisplay = weightingBooks;
        break;
      case "contextuel":
        booksToDisplay = nlpBooks;
        break;
      case "similaire":
        booksToDisplay = fuzzyBooks;
        break;
      case "metadata":
        booksToDisplay = metadataBooks;
        break;
     
      default:
        booksToDisplay = keywordBooks || defaultBooks;
    }
  }

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalBooks = booksToDisplay ? booksToDisplay.length : 0;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const displayedBooks =
    booksToDisplay?.slice(startIndex, startIndex + itemsPerPage) || [];
  // console.log({ totalPages, totalBooks, startIndex, displayedBooks });

  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleClickOpen = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // console.log({value})
    setPage(value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {displayedBooks ?  displayedBooks?.map((book: Book) => (
          <Grid
            key={book.id}
            item
            xs={12} // 1 livres par ligne sur mobile
            sm={4} // 3 livres par ligne sur tablette
            md={4} // 3 livres par ligne sur écran moyen
            // lg={4} // 5 livres par ligne sur grand écran
            onClick={() => handleClickOpen(book)}
          >
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#fff",
                borderRadius: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                cursor: "pointer",
              }}
            >
              <StyledImage src={book.coverImageUrl} alt={book.title} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {book.author}
              </Typography>
            </Paper>
          </Grid>
        ))  : <StyledTitle> Aucun livre trouvé</StyledTitle>}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
      <BookModal
        open={open}
        onClose={handleClose}
        selectedBook={selectedBook}
      />
    </Box>
  );
};

export default BooksGrid;
