import React, { useState } from "react";

import Wrapper from "./styles";
import { Grid } from "@material-ui/core";

const useTabs = (TabValue, Content) => {
  const [currentIndex, setCurrentIndex] = useState(TabValue);
  return {
    currentItem: Content[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const Radio = (props) => {
  const { data } = props;
  const { currentItem, changeItem } = useTabs(0, data);

  return (
    <Wrapper>
      {data.map((x, index) => {
        return (
          <em key={index} className="radio_wrap">
            <span
              className="radio_icon"
              onClick={() => {
                changeItem(index);
              }}
            >
              {currentItem.value === x.value ? (
                <img src="/images/check_on_icon.png" alt="" />
              ) : (
                <img src="/images/check_off_icon.png" alt="" />
              )}
            </span>
            <label>{x.value}</label>
          </em>
        );
      })}
    </Wrapper>
  );
};

export default Radio;
