import React, { Component } from 'react'

class Book extends Component {
  onSelectChange = (event) => {
    const { book, onUpdateBook } = this.props
    const newShelf = event.target.value
    onUpdateBook(book, newShelf)
  }

  render() {
    const { book } = this.props

    if(!book.authors){
      book.authors = []
    }
    if(!book.imageLinks) { book.imageLinks = {thumbnail: ''} }
    if(!book.imageLinks.thumbnail) { book.imageLinks.thumbnail = '' }

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
