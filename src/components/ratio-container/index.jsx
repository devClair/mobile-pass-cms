import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ratio_container: (props) => ({
    position: "relative",
    width: "100%",
    paddingTop: `${props?.padding_top}%`,
  }),
  ratio_item: {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
}));

export const RatioContainer = (props) => {
  const { children, w, h } = props;
  const padding_top = (Number(h) / Number(w)) * 100;
  const classes = useStyles({ padding_top: padding_top });

  /* 사용예시(16:9의 고정비율을 얻고 싶을 경우)
    <Grid container>
        <Grid item xs={12} md={6}>
          <RatioContainer w={16} h={9}>
            <img src={} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </RatioContainer>
        </Grid>
    </Grid> 
  */

  return (
    <div className={classes.ratio_container}>
      <div className={classes.ratio_item}>{children}</div>
    </div>
  );
};
