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

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {
    console.log(book, shelf)
    book.shelf = shelf
    this.setState((state) => ({
      books: (state.books.map((b) => b.id === book.id ? book : b) )
    }))
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
          <SearchBook />
        )}/>       
      </div>
    )
  }
}

export default BooksApp
