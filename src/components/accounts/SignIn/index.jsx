import React, { useState, useEffect } from "react";

// clsx
import clsx from "clsx";

// @material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core
import {
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";

// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// react-router-dom
import { Link } from "react-router-dom";

// react-hook-form & @hookform
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// components/useFormComponents
import { TextFieldController } from "../../../components/useFormComponents";

// ./viewLogic
import { useSignIn } from "./viewLogic";

const useStyles = makeStyles((theme) => ({
  ["#555555"]: {
    color: theme.palette.grey[700],
  },
  ["#999999"]: {
    color: theme.palette.grey[500],
  },
  textEllipsis: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  formControlLabel: {
    marginTop: "-16px",
    marginRight: "32px",
    "& .MuiCheckbox-colorPrimary.Mui-checked": {
      color: "#A2B8D2",
    },
    "& .MuiFormControlLabel-label": {
      color: theme.palette.grey[700],
      paddingBottom: 2,
    },
    "& .MuiIconButton-root": {
      padding: 9,
    },
  },
}));

const SaveId = (props) => {
  const classes = useStyles();
  const { label } = props;
  return (
    <FormControlLabel
      control={<Checkbox color="primary" />}
      label={label}
      className={classes.formControlLabel}
    />
  );
};
const ChangePassword = (props) => {
  const classes = useStyles();
  const { label } = props;
  return (
    <FormControlLabel
      control={
        <Link to={`/accounts/?entryFlow=pwd`}>
          <IconButton color="primary">
            <SearchIcon color="action" />
          </IconButton>
        </Link>
      }
      label={label}
      className={classes.formControlLabel}
    />
  );
};

const SignIn = () => {
  const classes = useStyles();
  const [isReady, setIsReady] = useState(false);
  const methods = useForm({
    defaultValues: {
      name: "value",
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    /* reset, */
    errors,
    setError,
    /* clearErrors  */
  } = methods;
  const { signInApi } = useSignIn({ setError: setError });

  const onSubmit = (data) => {
    return signInApi({
      params: data,
      entries: entries,
    });
  };

  const entries = [
    {
      key: "id",
      component: (
        <TextFieldController
          name="id"
          className="accountInput"
          placeholder="E-MAIL"
          icon={<PersonOutlineOutlinedIcon color="disabled" />}
          errors={errors}
          // pattern={/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/}
        />
      ),
      invalidMessage: `이메일을 다시 확인해주세요.`,
    },
    {
      key: "pwd",
      component: (
        <TextFieldController
          name="pwd"
          className="accountInput"
          placeholder="PASSWORD"
          icon={<LockOutlinedIcon color="disabled" />}
          errors={errors}
          type="password"
          // pattern={`/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,`}
        />
      ),
      invalidMessage: `비밀번호를 다시 확인해주세요.`,
    },
  ];

  useEffect(() => {
    // console.log(Object.keys(watch()).find((x) => Boolean(watch(x)) === false));
    Object.keys(watch()).find((x) => Boolean(watch(x)) === false)
      ? setIsReady(false)
      : setIsReady(true);
  }, [watch()]);

  return (
    <>
      <Box pb={1}>
        <Typography variant="h4" className={classes["#555555"]}>
          로그인
        </Typography>
      </Box>
      <Box pb={9}>
        <Typography
          variant="body1"
          className={clsx(classes["#999999"], classes.textEllipsis)}
        >
          STANDARD PASS 관리자용 페이지 로그인
        </Typography>
      </Box>
      <FormProvider {...methods}>
        {entries.map((x) => {
          return <Box pb={1}>{x.component}</Box>;
        })}
      </FormProvider>
      <Box pb={5}>
        <SaveId label="아이디 저장" />
        <ChangePassword label="비밀번호 찾기" />
      </Box>
      <Button
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
        variant="contained"
        color={isReady ? "primary" : "default"}
        fullWidth
        size="large"
      >
        login
      </Button>

      <DevTool control={control} />
    </>
  );
};

export default SignIn;
