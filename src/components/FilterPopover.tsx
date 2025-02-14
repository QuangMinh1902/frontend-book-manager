import { Popover, List, ListItemText, ListItemButton } from "@mui/material";

interface FilterPopoverProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  typeHandler: React.Dispatch<React.SetStateAction<string>>;
}

const FilterPopover = ({
  anchorEl,
  open,
  onClose,
  typeHandler,
}: FilterPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <List sx={{ width: 200 }}>
        <ListItemButton
          component="button"
          onClick={() => {
            typeHandler("keyword");
            onClose();
          }}
          sx={{ width: "100%" }}
        >
          <ListItemText primary="KeyWord" />
        </ListItemButton>
        <ListItemButton
          component="button"
          onClick={() => {
            typeHandler("regex");
            onClose();
          }}
          sx={{ width: "100%" }}
        >
          <ListItemText primary="Regex" />
        </ListItemButton>
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          onClick={() => {
            typeHandler("pondéré");
            onClose();
          }}
        >
          <ListItemText primary="Pondération" />
        </ListItemButton>
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          onClick={() => {
            typeHandler("phrase");
            onClose();
          }}
        >
          <ListItemText primary="Phrase" />
        </ListItemButton>
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          onClick={() => {
            typeHandler("contextuel");
            onClose();
          }}
        >
          <ListItemText primary="Contextuel" />
        </ListItemButton>
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          onClick={() => {
            typeHandler("author");
            onClose();
          }}
        >
          <ListItemText primary="Author" />
        </ListItemButton>
        <ListItemButton
          component="button"
          sx={{ width: "100%" }}
          onClick={() => {
            typeHandler("similaire");
            onClose();
          }}
        >
          <ListItemText primary="Similaire" />
        </ListItemButton>
      </List>
    </Popover>
  );
};

export default FilterPopover;
