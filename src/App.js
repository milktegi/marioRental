import React, { Component } from 'react';
import './App.css';
import './components/movies'
import Movies from './components/movies'

class App extends Component {
  render() {
    return (
     <main className="container">
       <Movies/>
     </main>
    );
  }
}

export default App;
