import React, { useState, useEffect } from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = (props) => {
  const { rows, rowsPerPage } = props;
  const [availableRows, setAvailableRows] = useState(rows);

  const calculateTotalNumberOfPages = () => {
    if (rowsPerPage === 0) return 0

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

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

  const rowsToRender = availableRows
    .map(row => <Row key={row.per_id} row={row} />)
    .slice(...rowsInPageNumber(currentPageNumber))

  return(
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          { rowsToRender }
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
