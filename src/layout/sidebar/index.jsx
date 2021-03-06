import React, { Fragment, useState } from "react";

// material-ui/core/styles
import { makeStyles } from "@material-ui/core/styles";

// material-ui/core
import {
  Grid,
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  // ListItemIcon,
  // ListItemText,
} from "@material-ui/core";

// components
import { RatioContainer } from "../../components/ratio-container";

// images
import UserImage from "../../images/layout/user.png";

// react-router-dom
import { Link, useHistory } from "react-router-dom";

// clsx
import clsx from "clsx";

// redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
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

    "&.MuiListItem-button": {
      "&:hover": {
        backgroundColor: (props) => theme.palette.primary.light,
        "&::before": {
          content: '" "',
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: "100%",
          backgroundColor: "white",
        },
      },
    },
  },
  currentPath: {
    backgroundColor: (props) => theme.palette.primary.light,
    "&::before": {
      content: (props) => !props.hover && '" "',
      position: "absolute",
      left: 0,
      top: 0,
      width: 4,
      height: "100%",
      backgroundColor: "white",
    },
  },
  itemImage: {
    width: 24,
    marginBottom: 12,
  },
  logoContainer: {
    overflow: "hidden",
    "& .logoBottom": {
      lineHeight: 1.0,
      paddingLeft: 8,
      letterSpacing: 13,
    },
  },
}));

/* Sidebar */
const data = [
  {
    key: "user",
    label: "회원관리",
    icon: UserImage,
  },
  {
    key: "report",
    label: "검사기록",
    icon: UserImage,
  },
  {
    key: "push",
    label: "푸쉬알림",
    icon: UserImage,
  },
  {
    key: "id",
    label: "ID 관리",
    icon: UserImage,
  },
  {
    key: "terms",
    label: "고객센터",
    icon: UserImage,
  },
];

const Sidebar = (props) => {
  const { drawerWidth, locationPathname } = props;
  const [hover, setHover] = useState(false);
  const classes = useStyles({ drawerWidth: drawerWidth, hover: hover });
  const history = useHistory();
  const reducer = useSelector((state) => state.reducerMobilePass);
  const dispatch = useDispatch();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Grid
        className={classes.toolbar}
        container
        justify="center"
        // alignItems="center"
      >
        <Grid item className={classes.logoContainer}>
          <Typography variant="body1" color="textPrimary" align="center">
            STANDARD
          </Typography>
          <Typography
            variant="body1"
            color="textPrimary"
            align="center"
            className="logoBottom"
          >
            PASS
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List disablePadding>
        {data.map((x, i) => {
          return (
            <ListItem
              className={clsx(
                classes.listItem,
                (x.key === locationPathname?.split("/")[1] ||
                  (locationPathname === "/" && i === 0)) &&
                  !hover &&
                  classes.currentPath
              )}
              button
              key={x.key}
              onClick={() => {
                dispatch({
                  type: "SET_LIST_PARAMS",
                  payload: {
                    reducer_key: x.key,
                    list_params: {
                      ...reducer.list_params_default[x.key],
                    },
                  },
                });
                history.push(`/${x.key}`);
              }}
              onMouseEnter={(e) => {
                setHover(true);
              }}
              onMouseLeave={(e) => {
                setHover(false);
              }}
            >
              <Grid container alignItems="center" justify="center">
                <Grid item className={classes.itemImage}>
                  <RatioContainer w={44} h={51}>
                    <img
                      src={x.icon}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </RatioContainer>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textPrimary"
                  >
                    {x.label}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;

// const Sidebar = () => {
//   const path = window.location.pathname.split("/")[1];

//   return (
//     <Wrapper>
//       <Grid className="sidebar">
//         <Grid container justify="center" alignItems="center" className="logo">
//           <Grid item>
//             <Grid className="img_box" onClick={() => {}}>
//               <img src="/images/logo_icon.png" alt="" />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid className="gnb">
//           <ul>
//             {data.map((x, index) => {
//               return (
//                 <li key={index} className={path === x.key ? "on" : ""}>
//                   <Link to={`/${x.key}`}>{x.value}</Link>
//                   {/* <span
//                     onClick={() => {
//                       // console.log(x.key);
//                       setPageKey(x.key);
//                       currentPage(x.key, "");
//                     }}
//                   >
//                     {x.value}
//                   </span> */}
//                   {/* <Depth2Component menu={x} pageKey={pageKey} /> */}
//                 </li>
//               );
//             })}
//           </ul>
//         </Grid>
//       </Grid>
//     </Wrapper>
//   );
// };
