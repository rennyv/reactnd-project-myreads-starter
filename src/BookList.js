import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class BookList extends Component {
  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
            <Shelf title="Currently Reading" books={ books.filter((book) => book.shelf === 'currentlyReading') } />
            <Shelf title="Want to Read" books={ books.filter((book) => book.shelf === 'wantToRead') } />
            <Shelf title="Read" books={ books.filter((book) => book.shelf === 'read') } />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
