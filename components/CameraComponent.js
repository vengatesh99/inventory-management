import React, { useState, useRef } from "react";
// import { Camera } from "react-camera-pro";
import Webcam from "react-webcam";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from '@mui/icons-material/Send';


const CameraComponent = ({ handleSetImage, isCamOpen, setOpenCam }) => {
  const camera = useRef(null);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexGrow={1}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexGrow={1}
        flexDirection={"column"}
        gap={4}
      >
        <Webcam ref={camera} />
        <Box
        display={"flex"}
        gap={4}
        mb={2}>
          <Button
            variant="contained"
            onClick={() => {
              const image = camera.current.getScreenshot();
              handleSetImage(image);
            }}
          >
          <SendIcon/>
            Take Photo
          </Button>
          {isCamOpen && (
            <Button
              variant="contained"
              onClick={() => {
                setOpenCam(false);
              }}
            >
              <CloseIcon />
              Close Camera
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CameraComponent;
