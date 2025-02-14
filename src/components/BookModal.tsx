import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box, 
} from "@mui/material";
import { Book } from "../core/model/library";

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  selectedBook: Book | null;
}

const BookModal = ({ open, onClose, selectedBook }: BookModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedBook?.title}</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Auteur:</strong> {selectedBook?.author}xw
          </Typography>
          <Typography variant="body1">
            <strong>Contenu:</strong> {selectedBook?.content}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;