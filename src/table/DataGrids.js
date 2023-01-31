import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
const columns_own = [
  { field: "ApplicationId", headerName: "ID" },
  { field: "TransactionDate", headerName: "Date" },
  { field: "TransactionDescription", headerName: "Description", width: 600 },
  { field: "TransactionAmount", headerName: "Amount" },
  { field: "TransactionClassification", headerName: "Classification" },
  { field: "BankName", headerName: "Bank" },
  { field: "IndustryClass", headerName: "Industry" },
  { field: "IndustryCat", headerName: "SubIndustry" },
  { field: "AccountNumber", headerName: "AccountNumber" }
];

const DataGrids = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("./data/data_Set_prep_probabilities_Added.csv")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);
  //console.log(tableData);
  return (
    <DataGrid
      rows={tableData}
      columns={columns_own}
      pageSize={5}
      rowsPerPageOptions={[10]}
      checkboxSelection
    />
  );
};

export default DataGrids;
