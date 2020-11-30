import React, { useContext, useState, useRef, useEffect } from "react";

import {
  Container,
  Grid,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  Box,
  Slider,
  FormControlLabel,
} from "@material-ui/core";

import clsx from "clsx";

import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

//-------------------------------------------
// date-fns
import {
  subMonths,
  addMonths,
  startOfToday,
  endOfToday,
  format,
  endOfMonth,
} from "date-fns";

import {
  makeStyles,
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

// components
import Dropzone from "../../components/dropzone";
import SearchDialog from "../../components/search-dialog";
import ChipsArray from "../../components/chips-array";

// wysiwyg
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
  },
  selectOutlined: {
    "& fieldset": {
      border: 0,
    },
    // maxHeight: 16.5,
    "& .MuiOutlinedInput-input": {
      paddingTop: 14,
      paddingBottom: 16,
    },
  },
  noBorderOutlined: {
    "& fieldset": {
      border: 0,
    },
  },
  timeInputCustom: (props) => ({
    "& .MuiOutlinedInput-input": {
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: "center",
    },
    // "& fieldset":  {
    //   border:  0,
    // },
    // "& fieldset": {
    //   border: props.isEditable ? "red" : 0,
    // },
  }),
  api_help: {
    color: "#ec407a !important",
  },
  checkbox: {
    margin: 0,
    // height: "unset!important",
    // marginTop: "5px",
    // color: "rgba(0, 0, 0, 0.26)!important",
  },
  table_container: {
    backgroundColor: "white",
    // border: "2px solid white",
  },
  row_container: {
    minHeight: 64,

    borderBottom: "solid 1px #bbbbbb",
    // "& > :first-child": {
    //   borderTop: "solid 1px #bbbbbb",
    // },
  },
  row_item: {
    height: "100%",
  },
  row_title: {
    height: "100%",
  },
  row_title_text_container: {
    height: "100%",
    backgroundColor: "#ddd",
    paddingLeft: "5px",
    paddingRight: "5px",
    // borderRadius: "3px",
  },
  row_title_text: {
    wordBreak: "keep-all",
    fontWeight: 500,
    lineHeight: "1.3",
    // "& .MuiTypography-subtitle1": {
    // lineHeight: "1.3",
    // },
  },
  row_content: {
    height: "100%",
    // paddingLeft: "10px",
    // paddingRight: "10px",
    // "& .MuiOutlinedInput-input": {
    //   padding: "5px 5px 7px 5px",
    // },
    "& .MuiTypography-subtitle1": {
      paddingLeft: "15px",
    },
  },
  row_content_text_container: {
    height: "100%",
  },
  // text_field: {
  //   padding: "6px 15px 7px 15px",
  // },
  text_area: {
    width: "calc(100% - 180px)",
    backgroundColor: "white",
  },

  slider: {
    // width: "80%",
    // margin
  },

  wysiwyg_wrapper: {},
  wysiwyg_editor: {
    padding: "18.5px 14px",
  },
}));

export const SelectComponent = (props) => {
  const classes = useStyles();
  const { isEditable, currentValue, onChange, menuItems, ref } = props;
  return (
    <>
      {isEditable ? (
        <Select
          className={classes.selectOutlined}
          variant="outlined"
          value={currentValue}
          onChange={onChange}
        >
          {menuItems.map((x) => {
            return (
              <MenuItem key={x.key} value={x.value}>
                {x.key}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        // <TextField
        //   id="outlined-multiline-static"
        //   defaultValue={lecture?.tb_lecture_department?.code_id}
        //   variant="outlined"
        //   // fullWidth
        //   // inputProps={{
        //   //   readOnly: !isEditable,
        //   // }}
        //   className={classes.text_field}
        //   ref={lecture_departmentRef}
        // />
        <Typography variant="subtitle1">
          {/* {lecture?.tb_lecture_department?.code_id} */}
          {menuItems?.find((x) => x.value == currentValue)?.key}
        </Typography>
      )}
    </>
  );
};

export const TextFieldComponent = (props) => {
  const classes = useStyles();
  const {
    isEditable,
    value,
    onChange,
    multiline,
    rows,
    number,
    placeholder,
    step,
    min,
    max,
    fullWidth,
    helperText,
  } = props;
  return (
    <>
      <TextField
        className={classes.selectOutlined}
        variant="outlined"
        placeholder={isEditable && placeholder}
        value={value}
        inputProps={{
          readOnly: !isEditable,
          step: step,
          min: min,
          max: max,
          type: number ? "number" : "text",
        }}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        // fullWidth
        fullWidth={fullWidth ? true : false}
      />
    </>
  );
};

export const TimeInputComponent = (props) => {
  const { isEditable, value, onChange, min, max } = props;
  const classes = useStyles({ isEditable: isEditable });
  return (
    <>
      <TextField
        className={clsx(
          classes.timeInputCustom,
          !isEditable && classes.noBorderOutlined
        )}
        variant="outlined"
        value={value}
        inputProps={{
          readOnly: !isEditable,
          // step: 10,
          min: min,
          max: max,
          type: "number",
        }}
        onChange={onChange}
        fullWidth
      />
    </>
  );
};

export const DatePickerComponent = (props) => {
  const classes = useStyles();
  const { isEditable, value, onChange } = props;
  return (
    <>
      {isEditable ? (
        <>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box width={168}>
              <KeyboardDatePicker
                variant="inline"
                inputVariant="outlined"
                className={classes.selectOutlined}
                allowKeyboardControl={true}
                value={value}
                onChange={onChange}
                format="yyyy-MM-dd"
                autoOk
              />
            </Box>
          </MuiPickersUtilsProvider>
        </>
      ) : (
        <Typography variant="subtitle1">
          {/* {lecture?.tb_lecture_department?.code_id} */}
          {/* {state.disease_info} */}
          {format(value, "yyyy-MM-dd")}
        </Typography>
      )}
    </>
  );
};

export const CheckBoxComponent = (props) => {
  const classes = useStyles();
  const { isEditable, checked, onChange, message } = props;
  return (
    <Grid container alignItems="center">
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onChange}
              disabled={!isEditable}
              color={"primary"}
            />
          }
          className={classes.checkbox}
          label={isEditable && message}
        />
      </Grid>
    </Grid>
  );
};

export const SearchFieldComponent = (props) => {
  const classes = useStyles();
  const { isEditable, value, onChange, handleDelete } = props;
  return (
    <>
      {isEditable ? (
        <Box px={1}>
          <Grid container alignItems="center">
            <Grid item>
              <ChipsArray
                chipData={value.map((x) => {
                  return { key: x.user_no, label: x.name };
                })}
                handleDelete={handleDelete}
                isEditable={isEditable}
                avatar
              />
            </Grid>
            <Grid item>
              <SearchDialog onChange={onChange} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <TextField
          className={classes.selectOutlined}
          variant="outlined"
          // value={value.name}
          value={value.map((x) => {
            return x.name;
          })}
          inputProps={{
            readOnly: !isEditable,
          }}
          fullWidth
          // fullWidth={fullWidth}
        />
        // <Typography variant="subtitle1">
        //   {/* {lecture?.tb_lecture_department?.code_id} */}
        //   {/* {state.disease_info} */}
        //   {value}
        // </Typography>
      )}
    </>
  );
};

export const SearchAndChips = (props) => {
  const classes = useStyles();
  const { isEditable, chipData, handleDelete, handleAdd, placeholder } = props;
  const [value, setValue] = useState("");

  const handleOnClick = () => {
    if (value) {
      handleAdd(value);
      setValue("");
    }
  };
  useEffect(() => {
    setValue("");
  }, [isEditable]);
  return (
    <>
      <Box px={1}>
        <Grid container alignItems="center" justify="space-between">
          {isEditable && (
            <Grid item xs={12}>
              <Box px={2} py={1} className={classes.add}>
                <TextField
                  // className={classes.selectOutlined}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    e.key === "Enter" && handleOnClick();
                  }}
                  placeholder={placeholder}
                  icon
                />
                <IconButton onClick={handleOnClick} size="small">
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>
          )}
          <Grid item>
            <Box py={1}>
              <ChipsArray
                chipData={chipData}
                handleDelete={handleDelete}
                isEditable={isEditable}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export const WysiwygComponent = (props) => {
  const classes = useStyles();
  const { isEditable, value, onChange, message, test } = props;

  const [content, setContent] = useState(EditorState.createEmpty());
  const [isEditor, setIsEditor] = useState(true);

  const save = () => {
    try {
      var text = draftToHtml(convertToRaw(content.getCurrentContent()));
      onChange(text);
    } catch (error) {
      console.log("save -> error", error);
    }
  };

  const load = async (text) => {
    try {
      const blocksFromHtml = htmlToDraft(text ? text : "");
      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        // ContentState를 EditorState기반으로 새 개체를 반환.
        // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
        const editorState = EditorState.createWithContent(contentState);
        setContent(editorState);
      }
    } catch (error) {
      console.log("Error", error);
      console.log("Error", error.code);
      console.log("Error", error.message);
      //   console.log('Error', error.response.data);
    }
  };

  useEffect(() => {
    load(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Editor
        onBlur={save}
        editorState={content}
        toolbarHidden={!isEditable}
        readOnly={!isEditable}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName={test}
        onEditorStateChange={(editorState) => {
          setContent(editorState);
        }}
      />
    </>
  );
};

export const SliderComponent = (props) => {
  const classes = useStyles();
  const { isEditable, value, onChange, marks } = props;

  // const marks = [
  //   {
  //     value: 0,
  //     label: '0°C',
  //   },
  //   {
  //     value: 20,
  //     label: '20°C',
  //   },
  //   {
  //     value: 37,
  //     label: '37°C',
  //   },
  //   {
  //     value: 100,
  //     label: '100°C',
  //   },
  // ];

  // function valuetext(value) {
  //   console.log({ value });
  //   return `${value}°C`;
  // }

  // function valueLabelFormat(value) {
  //   return marks.findIndex((mark) => mark.value === value) + 1;
  // }
  return (
    <Box px={3} pt={2}>
      <Slider
        className={classes.slider}
        defaultValue={value}
        // value={value}
        // valueLabelFormat={valueLabelFormat}
        // getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        valueLabelDisplay="auto"
        marks={isEditable && marks}
        // onChange={(event, value) => {
        //   onChange(value);
        // }}
        onChangeCommitted={(event, value) => {
          onChange(value);
        }}
        disabled={!isEditable}
        valueLabelDisplay="on"
      />
    </Box>
  );
};

export const ChipsArrayComponent = (props) => {
  const classes = useStyles();
  const { isEditable, value, onChange, handleDelete } = props;
  return (
    <>
      {isEditable ? (
        <Box px={1}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <ChipsArray
                chipData={value.map((x) => {
                  return { key: x.user_no, label: x.name };
                })}
                handleDelete={handleDelete}
              />
            </Grid>
            <Grid item>
              <SearchDialog onChange={onChange} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <TextField
          className={classes.selectOutlined}
          variant="outlined"
          value={value.name}
          inputProps={{
            readOnly: !isEditable,
          }}
          fullWidth
          // fullWidth={fullWidth}
        />
        // <Typography variant="subtitle1">
        //   {/* {lecture?.tb_lecture_department?.code_id} */}
        //   {/* {state.disease_info} */}
        //   {value}
        // </Typography>
      )}
    </>
  );
};

export const TableRowContainer = (props) => {
  const classes = useStyles();

  const { title, component, isFullWidth, isRequired } = props;

  return (
    <Grid
      item
      xs={12}
      sm={isFullWidth ? 12 : 6}
      className={classes.row_container}
    >
      <Grid container alignItems="center" className={classes.row_item}>
        <Grid
          item
          xs={4}
          sm={isFullWidth ? 2 : 4}
          lg={isFullWidth ? 1 : 2}
          className={classes.row_title}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.row_title_text_container}
          >
            <Grid item>
              {isRequired && (
                <Typography
                  variant="subtitle1"
                  display="inline"
                  align="center"
                  className={classes.row_title_text}
                  color="error"
                >
                  *
                </Typography>
              )}
              <Typography
                variant="subtitle1"
                display="inline"
                align="center"
                className={classes.row_title_text}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          sm={isFullWidth ? 10 : 8}
          lg={isFullWidth ? 11 : 10}
          className={classes.row_content}
        >
          <Grid
            container
            alignItems="center"
            className={classes.row_content_text_container}
          >
            <Grid item xs={12}>
              {component}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
