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

    //add unique key to the book
    book.simpleKey = book.id + "-" + book.industryIdentifiers[0].identifier

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

    BooksAPI.update(book, shelf).then((bookss) => {
      book.shelf = shelf

      this.setState((state) => ({
        books: books.filter(b => b.id !== book.id).concat([this.validateBook(book)])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={() => (<BookList books={ this.state.books } onUpdateBook={this.updateBook} /> )} /> 
        <Route path="/search" render={({ history }) => (
          <SearchBook onUpdateBook={this.updateBook} />
        )}/>       
      </div>
    )
  }
}

export default BooksApp
