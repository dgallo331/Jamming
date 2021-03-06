import React from 'react';
import SearchBar from './../SearchBar/SearchBar.js';
import SearchResults from './../SearchResults/SearchResults.js';
import Playlist from './../Playlist/Playlist.js';
import './App.css';
import Spotify from './../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {SearchResults: [],
      playlistName:'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(!tracks.includes(track)){
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    const name = this.state.playlistName
    Spotify.savePlaylist(name, trackUris).then(() => {
      this.setState({playlistName: 'New Playlist'})
      this.setState({playlistTracks: []})
    });
  }
  search(term) {
    Spotify.search(term).then(searchResults =>
    this.setState({SearchResults: searchResults}));
  }
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults}
            onAdd={this.addTrack}
            />
            <Playlist playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App
