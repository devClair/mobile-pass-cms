import React from "react";

import Wrapper from "./styles";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";

const Table = (props) => {
  const { data, columns, pageSize, paging, onRowClick } = props;
  // console.log({ props });
  // console.log(Object.isFrozen(data));
  // const extensibleData = JSON.parse(JSON.stringify(data));
  // console.log(Object.isFrozen(extensibleData));
  return (
    <Wrapper>
      <Grid className="table">
        <MaterialTable
          title=""
          data={data}
          columns={columns}
          onRowClick={(event, rowData) => {
            if (onRowClick) {
              onRowClick(rowData);
            }
          }}
          options={{
            // search: search,
            // selection: selection,
            // paginationType: "stepped",
            pageSize: pageSize,
            paging: paging,
          }}
          // onSelectionChange={onSelectionChange}
        />
      </Grid>
    </Wrapper>
  );
};

export default Table;
