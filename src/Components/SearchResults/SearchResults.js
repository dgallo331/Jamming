import React from 'react';
import ReactDOM from 'react-dom';
import './SearchResults.css';
import TrackList from './Components/TrackList/TrackList.js'

export class SearchResults extends React.Component {

  render(
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList />
    </div>
    );
}
