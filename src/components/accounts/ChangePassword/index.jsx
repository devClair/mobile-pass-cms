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
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// react-router-dom
import { Link, useHistory } from "react-router-dom";

// react-hook-form & @hookform
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

// components/useFormComponents
import { TextFieldController } from "../../../components/useFormComponents";

// ./viewLogic
import { useSignIn } from "./viewLogic";
import { NavigateBefore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  ["#555555"]: {
    color: theme.palette.grey[700],
  },
  ["#999999"]: {
    color: theme.palette.grey[500],
  },
  goToSignin: {
    color: "#a2b8d2",
    textDecoration: "underline",
  },
}));

const ChangePassword = () => {
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
    getValues,
    setValue,
    errors,
    setError,
    /* clearErrors  */
  } = methods;
  // const { signInApi } = useSignIn({ setError: setError });

  const history = useHistory();

  const onSubmit = (data) => {
    // return signInApi({
    //   params: data,
    //   entries: entries,
    // });
    history.push("/accounts/?entryFlow=signin");
  };

  const entries = [
    {
      key: "id",
      component: (
        <TextFieldController
          name="id"
          className="accountInput"
          placeholder="이메일 입력"
          icon={<PersonOutlineOutlinedIcon color="disabled" />}
          errors={errors}
          // pattern={/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/}
        />
      ),
      invalidMessage: `이메일 입력을 다시 확인해주세요.`,
    },
    {
      key: "authcode",
      component: (
        <TextFieldController
          name="authcode"
          className="accountInput"
          placeholder="인증번호 입력"
          icon={<VerifiedUserOutlinedIcon color="disabled" />}
          errors={errors}

          // pattern={`/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,`}
        />
      ),
      invalidMessage: `인증번호 입력을 다시 확인해주세요.`,
    },
    {
      key: "new_pwd",
      component: (
        <TextFieldController
          name="new_pwd"
          className="accountInput"
          placeholder="새 비밀번호 입력"
          icon={<LockOutlinedIcon color="disabled" />}
          type="password"
          errors={errors}
          // pattern={`/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,`}
        />
      ),
      invalidMessage: `새 비밀번호 입력을 다시 확인해주세요.`,
    },

    {
      key: "new_pwd_confirm",
      component: (
        <TextFieldController
          name="new_pwd_confirm"
          className="accountInput"
          placeholder="새 비밀번호 확인"
          icon={<LockOutlinedIcon color="disabled" />}
          type="password"
          errors={errors}
          // pattern={`/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,`}
        />
      ),
      invalidMessage: `새 비밀번호 입력을 다시 확인해주세요.`,
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
        <Link to={`/accounts/?entryFlow=signin`}>
          <Typography
            variant="body2"
            display="inline"
            className={classes.goToSignin}
          >
            홈으로 돌아가기
          </Typography>
        </Link>
      </Box>
      <Box pb={9}>
        <Typography variant="h4" className={classes["#555555"]}>
          비밀번호 찾기
        </Typography>
      </Box>
      <FormProvider {...methods}>
        {entries.map((x) => {
          return <Box pb={1}>{x.component}</Box>;
        })}
      </FormProvider>
      <Box pb={3}></Box>
      <Button
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
        // color="primary"
        // disabled={!isReady}
        color={isReady ? "primary" : "default"} /* 기획버전 */
        variant="contained"
        fullWidth
        size="large"
      >
        설정 완료
      </Button>

      <DevTool control={control} />
    </>
  );
};

// const ChangePassword = () => {
//   const history = useHistory();
//   return (
//     <>
//       <Link to={`/accounts/?entryFlow=signin`}>
//         <Button>home</Button>
//       </Link>
//     </>
//   );
// };

export default ChangePassword;
