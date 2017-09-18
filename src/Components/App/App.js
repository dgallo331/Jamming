import React from 'react';
import ReactDom from 'react-dom';
import SearchBar from './Components/SearchBar/SearchBar.js';
import SearchResults from 'src/Components/SearchResults/SearchResults.js';
import Playlist from 'src/Components/Playlist/Playlist.js';
import './App.css';

class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}
