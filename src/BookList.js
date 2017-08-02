import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class BookList extends Component {
    static propTypes = {
      books: PropTypes.array.isRequired,
      onUpdateBook: PropTypes.func.isRequired
    }

  render() {
    const { books, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
            <Shelf 
              title="Currently Reading" 
              books={ books.filter((book) => book.shelf === 'currentlyReading') }
              onUpdateBook={onUpdateBook} 
            />
            <Shelf 
              title="Want to Read" 
              books={ books.filter((book) => book.shelf === 'wantToRead') }
              onUpdateBook={onUpdateBook} 
            />
            <Shelf 
              title="Read" 
              books={ books.filter((book) => book.shelf === 'read') }  
              onUpdateBook={onUpdateBook} 
            />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
