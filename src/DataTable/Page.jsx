import React from 'react'

const Page = (props) => {
  const { pageNumber, currentPageNumber, onChange } = props

  const pageClass =
    currentPageNumber === pageNumber ? "page-link button-outline" : "page-link";

  const renderedPageNumber = () => {
    return pageNumber + 1
  }

  const onSelect = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }

  return(
    <li className="page-item mr-1">
      <button className={pageClass} onClick={onSelect} >{renderedPageNumber()}</button>
    </li>
  )
}

export default Page
