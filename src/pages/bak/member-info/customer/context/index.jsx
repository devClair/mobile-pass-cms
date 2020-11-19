import React, { createContext, useState } from "react";

const UserInfoContext = createContext();

const ViewContext = ({ children }) => {
  const [state, setState] = useState({
    rowdata: {},
    isDetail: false,
  });

  return (
    <UserInfoContext.Provider value={{ state, setState }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default ViewContext;
