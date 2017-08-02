import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BookAPI from './BooksAPI.js'

class SearchBook extends Component {
  updateQuery = (e) => {
    const { currentSearch } = this.state
    const searchTerms = e.trim()
    
    if(searchTerms !== ''){
      BookAPI.search(e, 1).then((books) => {
        if(books && currentSearch !== searchTerms){
          if(!books.error){
            this.setState({
                books: books,
                currentSearch: searchTerms
            })
          } else {
            this.setState({
                books: [],
                currentSearch: searchTerms
            })
          }
        }
      })
    } else {
      this.setState({
        currentSearch: '',
      books: []
      })
    }
  }

  state = {
      currentSearch: '',
      books: []
  }

  updateBook = (query) => {
      
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
            <li key={book.id}>
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
