import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
}

export default function Shelf(props){
  const { title, books, onUpdateBook } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ title }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map((book) => (
              <li key={ book.id + "-" + book.title + "-" + book.shelf}>
                <Book 
                  book={ book }
                  onUpdateBook={ onUpdateBook }
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}

