import React, { useEffect } from "react";

// material-ui/core/styles
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

// material-ui/core
import {
  Container,
  Grid,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

// components
import LoadingProgress from "../components/loading-progress";

// layout components
import Header from "./header";
import Sidebar from "./sidebar";
// import Footer from "./footer";

// redux
import { useSelector, useDispatch } from "react-redux";

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": { minHeight: 48 },
      "@media (min-width:600px)": {
        minHeight: 96,
      },
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        "@media (min-width: 600px)": {
          paddingLeft: 40,
          paddingRight: 40,
        },
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "white",
      },
    },
  },
  typography: {
    fontFamily: ["Noto Sans KR", "Montserrat", "sans-serif"].join(","),
  },
  palette: {
    // type: "dark",
    primary: {
      main: "#00479c",
      light: "#1A5AA6",
      dark: "#002e65",
      contrastText: "white",
    },
  },
});

const drawerWidth = 96;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main,
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    paddingTop: 16,
    background: theme.palette.primary.dark,
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  /* custom */
  listItem: {
    paddingTop: 24,
    paddingBottom: 12,
  },
  itemImage: {
    width: 24,
    marginBottom: 12,
  },
  logoTop: {
    letterSpacing: "1px",
  },
  logoBottom: {
    letterSpacing: 12,
    paddingLeft: 13,
    lineHeight: 1.0,
  },
}));

const Layout = (props) => {
  const { children, headerComponent, currentPath } = props;
  const classes = useStyles();
  // const dispatch = useDispatch();
  // dispatch({ type: "SET_PAGE_KEY", payload: "" });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <LoadingProgress></LoadingProgress>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} headerComponent={headerComponent} />
        <Sidebar drawerWidth={drawerWidth} currentPath={currentPath} />
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <Toolbar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;

// const Layout = (props) => {
//   const { children } = props;

//   return (
//     <ThemeProvider theme={theme}>
//       <LoadingProgress></LoadingProgress>
//       <Wrapper>
//         <Grid className="sidebar">
//           <Sidebar />
//         </Grid>
//         <Grid className="contents">
//           <Grid className="header">
//             <Header />
//           </Grid>
//           <main className="pages">
//             <Box py={5}>
//               <Container maxWidth="xl">{children}</Container>
//             </Box>
//           </main>
//         </Grid>
//       </Wrapper>
//     </ThemeProvider>
//   );
// };