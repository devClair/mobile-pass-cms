import React, { useState, useContext, useCallback, useEffect } from "react";
import {
  Paper,
  Grid,
  Avatar,
  createMuiTheme,
  ThemeProvider,
  Fab,
  Divider,
  FormControlLabel,
  Checkbox,
  Input,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Dropzone, { useDropzone } from "react-dropzone";
import NavigationIcon from "@material-ui/icons/Navigation";

//component
import { RatioContainer } from "../ratio-container";

const useStyles = makeStyles((theme) => ({
  container: { padding: "18.5px 14px" },

  dropzone: {
    width: "100%",
    height: "100%",
    maxWidth: 720,
    padding: "5px",
    borderRadius: "2px",
    border: "2px dashed #a2a2a2",

    background: "#efefef",
    color: "#a2a2a2",
    transition: "border 0.24s ease-in-out",
    "&:focus": {
      borderColor: "#2196f3",
    },
    "&:disabled": {
      opacity: "0.6",
    },
  },
  dropzoneMessage: {
    height: "100%",
  },
  previewAsside: {
    margin: "8px 0px",
    color: "#a2a2a2",
  },
}));

const ImageDropZone = (props) => {
  const classes = useStyles();

  const { isEditable, currentImage, onChange, w, h, minSize } = props;

  const onDrop = useCallback((acceptedFiles) => {
    console.log("PPAP: Basic -> acceptedFiles", acceptedFiles);
    // Do something with the files
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
  } = useDropzone(onDrop);

  useEffect(() => {
    for (const file of acceptedFiles) {
      onChange({
        img: URL.createObjectURL(file),
        file: file,
      });
    }
  }, [acceptedFiles]);

  useEffect(() => {
    console.log(currentImage);
  }, [currentImage]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className={classes.container}>
      {isEditable && (
        <aside className={classes.previewAsside}>
          <Typography variant="body1">
            {`Recommanded size is "${minSize}"`}
          </Typography>
        </aside>
      )}

      {isEditable ? (
        <div {...getRootProps({ className: classes.dropzone })}>
          <input name={props.name} ref={props.register} {...getInputProps()} />
          <RatioContainer w={w} h={h}>
            {currentImage ? (
              <img
                src={currentImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.dropzoneMessage}
              >
                <Grid item>
                  <Typography variant="body1">
                    Drag 'n' drop some files here, or click to select files
                  </Typography>
                </Grid>
              </Grid>
            )}
          </RatioContainer>
        </div>
      ) : (
        <div className={classes.dropzone}>
          <RatioContainer w={w} h={h}>
            {currentImage ? (
              <img
                src={currentImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.dropzoneMessage}
              >
                <Grid item>
                  <Typography variant="body1">
                    Drag 'n' drop some files here, or click to select files
                  </Typography>
                </Grid>
              </Grid>
            )}
          </RatioContainer>
        </div>
      )}
      {isEditable && (
        <aside className={classes.previewAsside}>
          <ul>{files}</ul>
        </aside>
      )}
    </section>
  );
};

export default ImageDropZone;
