import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "../../../sass/adminPanel/dataTable.scss";

const CustomDataTable = ({ columns, data }) => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const filteredData = data.filter((row) => {
    return Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handlePageChange = (page) => {
    setPage(page.selected + 1);
  };

  const itemsPerPage = 10;

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const tableData = {
    columns: columns,
    data: paginatedData,
    pagination: true,
    paginationPerPage: itemsPerPage,
    paginationRowsPerPageOptions: [4, 20, 30],
    paginationTotalRows: filteredData.length,
    onChangePage: handlePageChange,
  };

  console.log("filteredData", filteredData);
  console.log("paginatedData", paginatedData);

  return (
    <div className="table_container">
      <div className="serach-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
          className="form-control mb-2"
        />
      </div>
      <DataTable className="custom-data-table" {...tableData} />
    </div>
  );
};

export default CustomDataTable;
