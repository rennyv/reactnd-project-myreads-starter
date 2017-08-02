import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import BookList from './BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  validateBook = (book) => {
    if(!book.authors){
      book.authors = []
    }
    if(!book.imageLinks) { book.imageLinks = {thumbnail: ''} }
    if(!book.imageLinks.thumbnail) { book.imageLinks.thumbnail = '' }

    return book
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      books = books.map(b => this.validateBook(b))
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {
    const { books } = this.state

    book.shelf = shelf

    this.setState((state) => ({
      books: books.filter(b => b.id !== book.id).concat([this.validateBook(book)])
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList 
            books={ this.state.books }
            onUpdateBook={this.updateBook} /> 
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBook onUpdateBook={this.updateBook} />
        )}/>       
      </div>
    )
  }
}

export default BooksApp
