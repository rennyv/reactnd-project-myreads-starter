import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BookAPI from './BooksAPI.js'
import PropTypes from 'prop-types'

class SearchBook extends Component {
  static propTypes = {
      onUpdateBook: PropTypes.func.isRequired,
      books: PropTypes.array.isRequired
  }

  updateBooks = (books, terms) => {
    if (this.state.books !== books){
      this.setState({
        books,
        currentSearch: terms
      })
    }
  }

  cleanUp = (books) => {
    let clean = []
     
    books.forEach((book) => { 
      if (!(clean.some((c) => c.id === book.id) )){
        if(!book.authors){
          book.authors = []
        }
        
        if(!book.imageLinks) { book.imageLinks = {thumbnail: ''} }
        if(!book.imageLinks.thumbnail) { book.imageLinks.thumbnail = '' }
        
        let shelfBook = this.props.books.find((b) => b.id === book.id)
        if (shelfBook) {
         book.shelf = shelfBook.shelf
        } else {
          book.shelf = 'none'
        }
        clean.push(book) 
      } 
    })
    return clean 
  }

  updateQuery = (e) => {
    const { currentSearch } = this.state
    const searchTerms = e.trim()
    
    if(searchTerms !== ''){
      BookAPI.search(e, 1).then((books) => {
        if(books && currentSearch !== searchTerms){
          if(!books.error){
            let bookResults = this.cleanUp(books)
            this.updateBooks(bookResults, searchTerms)
          } else {
            this.updateBooks([],searchTerms)
          }
        }
      })
    } else {
      this.updateBooks([],'')
    }
  }

  state = {
      currentSearch: '',
      books: []
  }

  render() {
    const { books } = this.state
    const { onUpdateBook } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id + "-" + book.title + "-" + book.shelf}>
              <Book 
                book={ book }
                onUpdateBook={ onUpdateBook }
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )}
}

export default SearchBook
