import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
  Typography,
  CardActions,
  IconButton,
  dividerClasses,
  Box,
  TextField,
  Button,
  Grow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";

import { useRef, useState } from "react";

const InventoryCard = ({ cardItem, clearItem, editItem, setOpenAlert}) => {
  const titleRef = useRef(null);
  const quantityRef = useRef(null);
  const titleValueRef = useRef(null);
  const quantityValueRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [open,isOpen] = useState(true);


  function handleEdit() {
    const newItem = {
      ...cardItem,
      name: titleRef.current.value,
      quantity: quantityRef.current.value,
    }
    // console.log("Current Card Item",cardItem)
    // console.log("New Item", newItem)
    editItem(cardItem,newItem)
    setEdit(false)
    setOpenAlert(true)
  }

  return (
    <Grow in={open}>
    <Card sx={{ maxWidth: 345 }} elevation={2}>
      <CardHeader
        title={
          edit ? (
            <TextField
              inputRef={titleRef}
              id="standard-basic"
              label="Item"
              variant="standard"
              defaultValue={cardItem.name}
            ></TextField>
          ) : (
            cardItem.name
          )
        }
        action={
          <Box>
            <IconButton aria-label="delete" onClick={()=>{clearItem(cardItem)}}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => {
                setEdit(true)
              }}
            >
              <BorderColorTwoToneIcon />
            </IconButton>
          </Box>
        }
      />
      {/* Include the image later */}
      {cardItem.image && (
        <CardMedia
          component="img"
          height="194"
          image= {cardItem.image}
        />
      )}
      <CardContent>
        {edit ? (
          <TextField
            inputRef={quantityRef}
            id="standard-basic"
            label="Quantity"
            variant="standard"
            defaultValue={cardItem.quantity}
          />
        ) : (
          <Typography variant="body" color="text.primary">
            Quantity: {cardItem.quantity}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {edit && <IconButton aria-label="Done" onClick={handleEdit}>
          <Button variant="contained" onClick={handleEdit}>Done</Button>
        </IconButton>}
        {/* <IconButton aria-label="delete an item" onClick={removeSingleItem}>
          <RemoveCircleIcon />
        </IconButton> */}
      </CardActions>
    </Card>
    </Grow>
  );
};

export default InventoryCard;
