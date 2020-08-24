import React, { useState, useEffect } from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = (props) => {
  const { rows, rowsPerPage } = props;
  const [availableRows, setAvailableRows] = useState(rows);

  const calculateTotalNumberOfPages = () => {
    if (!rowsPerPage || rowsPerPage === 0) {
      // If rowsPerPage is not defined or is 0, default to 5
      return 5;
    }

    return Math.ceil(availableRows.length / rowsPerPage)
  }

  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(calculateTotalNumberOfPages());

  useEffect(() => {
    setCurrentPageNumber(0);
    setTotalNumberOfPages(calculateTotalNumberOfPages());
  }, [availableRows])

  const search = (e) => {
    const text = e.target.value;
    let rowsFound = rows

    if (text) {
      rowsFound = rows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
      })
    }

    setAvailableRows(rowsFound);
  }

  const rowsToRender = () => {
    let startIndex = currentPageNumber * rowsPerPage;
    let rowsOnPage = availableRows.slice(startIndex, startIndex + rowsPerPage);
    return rowsOnPage.map((row) => <Row key={row.per_id}>{row}</Row>)
  }

  return(
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          { rowsToRender() }
        </tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={setCurrentPageNumber} />
    </div>
  )
}

export default DataTable;
