import React from "react";

import Wrapper from "./styles";
import { Grid } from "@material-ui/core";

export const ModalInfo = (props) => {
  const { title, children, setModalSw } = props;
  return (
    <Wrapper>
      <Grid className="modal_info">
        <Grid className="modal">
          <h2>{title}</h2>
          {children}
          <button
            type="button"
            className="btn_close"
            onClick={() => {
              setModalSw(false);
            }}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export const ModalGH = (props) => {
  const { title, children } = props;
  return (
    <Wrapper>
      <Grid className="modal_wrap">
        <Grid className="modal">
          <h2>
            <span className="icon">
              <img src="/images/warning_icon.png" alt="" />
            </span>
            <span className="text">{title}</span>
          </h2>
          {children}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export const Modal = (props) => {
  const { title, children } = props;
  return (
    <Wrapper>
      <Grid className="modal_wrap">
        <Grid className="modal">
          <h2>
            <span className="icon">
              <img src="/images/warning_icon.png" alt="" />
            </span>
            <span className="text">{title}</span>
          </h2>
          {children}
        </Grid>
      </Grid>
    </Wrapper>
  );
};
