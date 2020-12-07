import React, { useState, useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import produce from "immer";

// @material-ui/core/styles
import {
  makeStyles,
  styled,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

// @material-ui/core
import {
  Container,
  Grid,
  IconButton,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  Box,
  Slider,
  Chip,
  InputAdornment,
} from "@material-ui/core";

// @material-ui/icons
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

// @material-ui/pickers
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// react-hook-form
import { Controller, useFormContext, useFieldArray } from "react-hook-form";

// clsx
import clsx from "clsx";

// @date-io/date-fns
import DateFnsUtils from "@date-io/date-fns";

// date-fns
import {
  subMonths,
  addMonths,
  startOfToday,
  endOfToday,
  format,
  endOfMonth,
} from "date-fns";

// draft-js
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
  convertFromHTML,
} from "draft-js";

// react-draft-wysiwyg
import { Editor } from "react-draft-wysiwyg";

// draftjs-to-html
import draftToHtml from "draftjs-to-html";

// html-to-draftjs
import htmlToDraft from "html-to-draftjs";

// react-draft-wysiwyg.css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components/dropzone
import Dropzone from "../../components/dropzone";

// components/search-dialog
import SearchDialog from "../../components/search-dialog";

// components/chips-array
import ChipsArray from "../../components/chips-array";

const useStyles = makeStyles((theme) => ({
  upload_button: {
    color: "white",
    backgroundColor: "rgba(76,175,80,1.0)",
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

    borderBottom: "solid 1px white",
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
    paddingLeft: "5px",
    paddingRight: "5px",
    backgroundColor: "#dddddd",
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
    backgroundColor: "#f1f1f1",
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
  chip: {
    margin: theme.spacing(0.5),
    "& .MuiChip-label": {
      // backgroundColor: "red",
      paddingBottom: 2,
    },
  },
}));

const useTextFieldStyles = makeStyles((theme) => ({
  accountInput: {
    color: theme.palette.primary.main,
    height: 78,
    marginTop: 8,
  },
  autofillCustom: {
    // "&:-internal-autofill-selected": {
    //   backgroundColor: "red !important",
    //   // WebkitBoxShadow: "0 0 0 1000px white inset"
    // },
    "&:-webkit-autofill": {
      // WebkitBoxShadow: "0 0 0 1000px white inset",
      boxShadow: "0 0 0 1000px white inset",
    },
  },
  termsInput: {
    backgroundColor: theme.palette.grey[100],
  },
}));

export const SelectController = (props) => {
  const classes = useStyles();

  const {
    // isEditable,
    menuItems,
    name,
  } = props;
  const { control, reset, watch } = useFormContext();

  return (
    <Controller
      as={
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {menuItems[0].key}
          </InputLabel>

          <Select className={classes.selectOutlined} variant="outlined">
            {menuItems?.map((x) => {
              return (
                <MenuItem key={x.key} value={x.value}>
                  {x.key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      }
      name={name}
      control={control}
      defaultValue={""}
    />
    // <></>
  );
};

export const TextFieldController = (props) => {
  const textFieldClasses = useTextFieldStyles();
  const {
    name,
    className,
    placeholder,
    pattern,
    label,
    icon,
    // errorMessage,
    type,
    errors,
    multiline,
    rows,
    noCheck,
  } = props;
  const { control, watch, register, setValue } = useFormContext();
  // console.log({ errors });
  const errorMessage = {
    required: `*${placeholder} 항목은 필수입니다.`,
  };

  return (
    <Controller
      as={
        <TextField
          className={textFieldClasses[className]}
          variant="outlined"
          fullWidth
          // size="small"
          placeholder={placeholder}
          label={label}
          helperText={
            errors[name] &&
            (errorMessage[errors[name].type]
              ? errorMessage[errors[name].type]
              : errors[name].message)
            // errors[name] && errors[name].message
          }
          inputProps={{
            className: textFieldClasses.autofillCustom,
            onBlur: (e) => {
              // console.log(e.target.value);
              !noCheck && setValue(name, e.target.value.replace(/(\s*)/g, ""));
            },
            // readOnly: !isEditable,
            // step: step,
            // min: min,
            // max: max,
            type: type ? type : "text",
          }}
          InputProps={{
            startAdornment: icon && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          error={errors[name]}
          // onBlur={(e) => {
          //   console.log(e);
          // }}

          multiline={multiline}
          rows={rows}
          // fullWidth={fullWidth ? true : false}
        />
      }
      control={control}
      // defaultValue={""}
      name={name}
      rules={{
        required: true,
        // pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
        pattern: pattern,
      }}
    ></Controller>
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

  const { isEditable, name, onChange, handleDelete } = props;

  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  //   value = instructor_info: [
  //     {
  //       user_no: lecture.tb_lecturer.tb_lecturer_content.user_no,
  //       name: lecture.tb_lecturer.tb_lecturer_content.lecturer_name,
  //       title: lecture.tb_lecturer.tb_lecturer_content.lecturer_title,
  //     },

  useEffect(() => {
    console.log({ fields });
  }, [fields]);

  return (
    <Box px={1}>
      <Grid container alignItems="center">
        <Grid item>
          {fields.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <Controller
                  as={
                    <Chip
                      key={item.key}
                      className={classes.chip}
                      label={item.label}
                      // variant="outlined"
                      // onDelete={isEditable && handleDelete(index)}
                      color={isEditable ? "primary" : "default"}
                      // avatar={avatar && <Avatar src="" />}
                    />
                  }
                  name={`${name}[${index}].user_no`}
                  control={control}
                  // defaultValue={item.label} // make sure to set up defaultValue
                />
              </React.Fragment>
            );
          })}
          {/* <ChipsArray
            chipData={value.map((x) => {
              return { key: x.user_no, label: x.name };
            })}
            handleDelete={handleDelete}
            isEditable={isEditable}
            avatar
            name={name}
          /> */}
        </Grid>
        <Grid item>
          <SearchDialog onChange={onChange} />
        </Grid>
      </Grid>
    </Box>

    // control={control}
    // defaultValue={""}
    // name={name}
    // rules={{
    //   required: true,
    // }}
  );
};

export const SearchAndChips = (props) => {
  const classes = useStyles();
  const { isEditable, placeholder, name } = props;
  const [value, setValue] = useState("");

  const handleOnClick = () => {
    if (value) {
      append({ key: fields.length, label: value });
      setValue("");
    }
  };

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  const handleDelete = (index) => () => {
    remove(index);
  };
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
                  placeholder={placeholder}
                />
                <IconButton onClick={handleOnClick} size="small">
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>
          )}
          <Grid item>
            <Box py={1}>
              {fields.map((item, index) => {
                return (
                  <React.Fragment key={item.id}>
                    <Controller
                      as={
                        <Chip
                          key={item.key}
                          className={classes.chip}
                          label={item.label}
                          // variant="outlined"
                          onDelete={isEditable && handleDelete(index)}
                          color={isEditable ? "primary" : "default"}
                          // avatar={avatar && <Avatar src="" />}
                        />
                      }
                      name={`${name}[${index}].label`}
                      control={control}
                      // defaultValue={item.label} // make sure to set up defaultValue
                    />
                  </React.Fragment>
                );
              })}
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
        // defaultValue={value}
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
