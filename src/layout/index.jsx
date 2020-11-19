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
import { RatioContainer } from "../components/ratio-container";

import UserImage from "../images/layout/user.png";

import Header from "./header";
import Sidebar from "./sidebar";
// import Footer from "./footer";

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

const Layout = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <LoadingProgress></LoadingProgress>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
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
