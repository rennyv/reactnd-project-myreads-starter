import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  onSelectChange = (event) => {
    const { book, onUpdateBook } = this.props
    const newShelf = event.target.value
    onUpdateBook(book, newShelf)
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
          <select onChange={this.onSelectChange} defaultValue={book.shelf}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        {(book.authors) ? book.authors.map((author, index) => (<div key={index} className="book-authors">{ author }</div>)) : (<div className="book-authors" />)}
      </div>
    )
  }
}

export default Book
