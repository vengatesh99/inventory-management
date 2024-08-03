"use client";
import Image from "next/image";

import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
  Item,
  Container,
  Paper,
  Collapse,
  IconButton,
  Grow,
  Fade
} from "@mui/material";
import { firestore } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import {
  query,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import AlertTitle from '@mui/material/AlertTitle';
import { useParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import theme from "../../../components/CameraComponent"


/*Icons import*/
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CameraIcon from "@mui/icons-material/Camera";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';

/*Components Import*/
import NoCart from "@/components/NoCart";
import InventoryCard from "@/components/InventoryCard";
import Header from "@/components/Header";
import CameraComponent from "@/components/CameraComponent";

import ClassifyImg from "@/components/ClassifyImg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [cardItem, setCardItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const [image, setImage] = useState(null);
  const [editDone, setEditDone] = useState(false);
  const [openAlert,setOpenAlert] = useState(false)
  const modalItem = useRef(null);
  const modalQuantity = useRef(null);
  const params = useParams();
  const [checked, setChecked] = useState(false);
  const [effect,setEffect] = useState(false)

  const currentUser = params.id;
  const inventoryRef = collection(firestore, "inventory");

  const updateInventory = async () => {
    const currentUserDoc = doc(inventoryRef, currentUser);
    const currentUserDocSnap = await getDoc(currentUserDoc);
    const itemsArray = currentUserDocSnap.data().data;
    // console.log(itemsArray.data)
    // const docs = await getDocs(inventoryRef); //reference for all docs present in inventory collection
    const inventoryList = [];
    itemsArray.forEach((item) => {
      inventoryList.push({
        ...item,
      });
    });
    setInventory(inventoryList);
  };

  const editCard = async (prevItem, newItem) => {
    const currentUserDoc = doc(inventoryRef, currentUser);
    const docSnap = await getDoc(currentUserDoc);

    const newInventory = inventory.map((item) => {
      if (item.name === prevItem.name) {
        return {
          ...newItem,
        };
      } else {
        return {
          ...item,
        };
      }
    });

    const newDocData = {
      ...docSnap.data(),
      data: newInventory,
    };
    await setDoc(currentUserDoc, newDocData);
    setInventory(newInventory);
    setEditDone(true);
  };

  const removeItem = async (itemToDelete) => {
    const currentUserDoc = doc(inventoryRef, currentUser);
    const docSnap = await getDoc(currentUserDoc);

    let itemList = docSnap.data().data;
    const newItemList = itemList.filter((item) => {
      if (item.name !== itemToDelete.name) {
        return item;
      }
    });

    const newDocData = {
      ...docSnap.data(),
      data: newItemList,
    };
    console.log("New Item List in remove Item", newItemList);

    await setDoc(currentUserDoc, newDocData);
    setInventory(newItemList);
  };

  const addItem = async ({ name, quantity, ...props }) => {
    const itemLower = name.toLowerCase();
    const currentUserDoc = doc(inventoryRef, currentUser);
    const docSnap = await getDoc(currentUserDoc);
    let itemList = docSnap.data().data;
    let flag = false;
    let newItemList = itemList.map((item) => {
      if (item.name === name.toLowerCase()) {
        flag = true;
        const prev = item.quantity;
        return {
          ...item,
          quantity: prev + parseInt(quantity),
        };
      } else {
        return {
          ...item,
        };
      }
    });
    if (!flag) {
      newItemList.push({
        name: name.toLowerCase(),
        quantity: parseInt(quantity),
        ...props,
      });
    }
    const newDocData = {
      ...docSnap.data(),
      data: newItemList,
    };
    console.log("items in add item function", newItemList);

    await setDoc(currentUserDoc, newDocData);
    setInventory(newItemList);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClearCart = async () => {
    const currentUserDoc = doc(inventoryRef, currentUser);
    const docSnap = await getDoc(currentUserDoc);
    const newDoc = {
      ...docSnap.data(),
      data: [],
    };
    await setDoc(currentUserDoc, newDoc);
    setInventory([]);
  };

  const handleSetImage = async (imageb64) => {
    setImage(imageb64);
    const item = await ClassifyImg(imageb64);
    const InventoryItem = {
      name: item,
      quantity: 1,
      image: imageb64,
    };
    addItem(InventoryItem);
    // if (item !==''){
    //   addItem(item)
    // }
  };

  useEffect(() => {
    updateInventory();
    setEffect(true)
  }, []);

  useEffect(() => {
    if (inventory.length == 0) {
      setIsCart(false);
    } else {
      setIsCart(true);
    }
  }, [inventory]);

  return (
    <>
    <Header setSearchString={setSearchString} />
    <Box width="100vw" height="100vh" sx={{bgcolor:'#cfd8dc'}}>
      {editDone && (
        <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert((prev)=>!prev);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Changes Saved!
        </Alert>
      </Collapse>
      )}
      <Box
        display={"flex"}
        justifyContent={"normal"}
        flexDirection={"column"}
        gap={2}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={"row"} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                inputRef={modalItem}
              />
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                fullWidth
                inputRef={modalQuantity}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem({
                    name: modalItem.current.value,
                    quantity: modalQuantity.current.value,
                  });
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        {isCart && (
          <Container sx={{ my: 2 }}>
            <Grid container rowSpacing={3}>
              {inventory
                .filter((item) => {
                  return searchString.toLowerCase() === ""
                    ? item
                    : item.name
                        .toLowerCase()
                        .includes(searchString.toLowerCase());
                })
                .map((items) => (
                  <Grid item key={items.id} xs={12} md={6} lg={4}>
            
                    <InventoryCard
                      cardItem={items}
                      clearItem={removeItem}
                      editItem={editCard}
                      setOpenAlert = {setOpenAlert}
                    />
                    
                  </Grid>
                ))}
            </Grid>
          </Container>
        )}
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          gap={4}
          width="100vw"
          height="40px"
          mt={2}
        >
          <Button variant="contained" onClick={handleOpen}>
            <AddOutlinedIcon />
            Add New Item
          </Button>
          <Button variant="contained" onClick={handleClearCart}>
            <ShoppingCartOutlinedIcon />
            Clear Cart
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenCam(true);
            }}
          >
            <CameraIcon />
            Open Camera
          </Button>
        </Box>
        <Box>
          {openCam && (
            <CameraComponent
              handleSetImage={handleSetImage}
              isCamOpen={openCam}
              setOpenCam={setOpenCam}
            />
          )}
        </Box>
        {!isCart && <NoCart />}
      </Box>
    </Box>
    </>
  );
}
