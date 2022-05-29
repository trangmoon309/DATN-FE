import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import NavigationBar from './../../components/NavigationBar/NavigationBar';
import FilterBar from './../../components/Filter/FilterBar';
import "../../table.css"

let PageSize = 10;

const TransactionList = props => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return [].slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const options = [
    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }],

    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }],

    [{ value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }]
  ]

  return (
    <div>
    <div style={{"z-index": "2em" }}>
      <NavigationBar></NavigationBar>
    </div>
    <div className="app" >
      <FilterBar
        datas={options}
      ></FilterBar>
      <table className="dataTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creation Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{"margin-left":"70%"}}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={[].length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  </div>
  );
};

export default TransactionList;