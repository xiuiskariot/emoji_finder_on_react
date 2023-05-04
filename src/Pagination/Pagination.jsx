import React from 'react'
import "./Pagination.module.css"

export const Pagination = ({ emojiPerPage, totalEmoji, paginate }) => {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEmoji / emojiPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div>
      <ul>
        {
          pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
