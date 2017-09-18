import React from 'react';
import ReactDOM from 'react-dom';
import './Playlist.css';
import TrackList from './Components/TrackList/TrackList.js';

export class Playlist extends React.Component {

  render(
    <div className="Playlist">
      <input defaultValue={'New Playlist'} />
      <TrackList />
      <a class="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  );
}
