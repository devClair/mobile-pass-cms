// import React, { useEffect, useState } from "react";

// import Wrapper from "./styles";
// import { Grid } from "@material-ui/core";

// import ReactExport from "react-data-export";
// import { Pagination } from "@material-ui/lab";

// // redux
// import { useDispatch } from "react-redux";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// const TableFooter = (props) => {
//   const reducer_type = window.location.pathname.split("/")[1];
//   const { data, count, page, excel } = props;
//   const dispatch = useDispatch();

//   return (
//     <Wrapper>
//       <Grid container justify="space-between" className="table_footer">
//         <Grid item className="btn_excel">
//           <button
//             variant="contained"
//             className="btn_excel"
//             onClick={() => {
//               alert("s3로 리다이렉트");
//             }}
//           >
//             엑셀저장
//           </button>
//           {/* <ExcelFile
//             element={
//               <button variant="contained" className="btn_excel">
//                 엑셀저장
//               </button>
//             }
//           >
//             <ExcelSheet data={data} name="등록수업 정보">
//               {children}
//             </ExcelSheet>
//           </ExcelFile> */}
//         </Grid>
//         <Grid className="table_pagination">
//           <Pagination
//             page={page}
//             count={count}
//             onChange={(e, n) => {
//               dispatch({
//                 type: "SET_LIST_PARAMS",
//                 payload: {
//                   list_params: {
//                     current_page: n,
//                   },
//                   reducer_type: reducer_type,
//                 },
//               });
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Wrapper>
//   );
// };

// export default TableFooter;
