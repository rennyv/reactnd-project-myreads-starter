import React from 'react'
import { Route } from 'react-router-dom'
//import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import BookList from './BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList /> 
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBook />
        )}/>       
      </div>
    )
  }
}

export default BooksApp
