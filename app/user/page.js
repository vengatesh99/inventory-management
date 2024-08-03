"use client";
import Image from "next/image";
// import styles from "./page.module.css";
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
} from "@mui/material";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
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

/*Icons import*/
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CameraIcon from "@mui/icons-material/Camera";


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
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [isCart, setIsCart] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const [image, setImage] = useState(null);

  const updateInventory = async () => {
    const inventoryRef = query(collection(firestore, "inventory"));
    const docs = await getDocs(inventoryRef); //reference for all docs present in inventory collection
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    // console.log("Inventory List",inventoryList)
  };

  const editItem = async(newItem) => {
    // const inventoryRef = query(collection(firestore, "inventory"));
    // const docs = await getDocs(inventoryRef);
    const docRef = doc(collection(firestore, "inventory"), itemName);
    setDoc(docRef,
      {
        ...newItem
      }
    )
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    } else {
      //Handle document not exist
    }
    await updateInventory(); //Update the state of inventory list
  };

  const addItem = async (item) => {
    const itemLower = item.toLowerCase();
    const docRef = doc(collection(firestore, "inventory"), itemLower); //reference for a particular document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      console.log(docRef);
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory(); //Update the state of inventory list
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClearCart = async () => {
    const inventoryRef = collection(firestore, "inventory");
    const querySnapshot = await getDocs(inventoryRef);
    // console.log("what ois this",querySnapshot)
    querySnapshot.forEach(async (document) => {
      const docRef = doc(collection(firestore, "inventory"), document.id);
      await deleteDoc(docRef);
    });

    await updateInventory();
  };

  const removeCard = async (id) => {
    const docRef = doc(collection(firestore, "inventory"), id);
    await deleteDoc(docRef);
    await updateInventory();
  };
  const handleSetImage = async (imageb64) => {
    // setImage(imageb64)
    const item = await ClassifyImg(imageb64);
    addItem(item);
    // if (item !==''){
    //   addItem(item)
    // }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  useEffect(() => {
    if (inventory.length == 0) {
      setIsCart(false);
    } else {
      setIsCart(true);
    }
  }, [inventory]);

  // useEffect(()=>{
  //   console.log("image changed")
  //   ClassifyImg(image)
  // },[image])

  return (
    <Box width="100vw" height="100vh">
      <Header setSearchString={setSearchString} />
      <Box
        // width="100%"
        // height="100%"
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
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
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
                      title={items.name}
                      quantity={items.quantity}
                      clearItem={removeCard}
                      addItem={addItem}
                      removeItem={removeItem}
                      editItem = {editItem}
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
  );
}
