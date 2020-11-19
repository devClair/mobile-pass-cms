import React from "react";
// import loadable from '@loadable/component';
// const WysiwygContent = loadable(() => import('./WysiwygContent'));

// export const WysiwygComponent = (props) => {
//   return <>{typeof window !== 'undefined' ? <WysiwygContent {...props} /> : <div>window undefined</div>}</>;
// };

import WysiwygContent from "./WysiwygContent";

export const WysiwygComponent = (props) => {
  return <WysiwygContent {...props} />;
};
