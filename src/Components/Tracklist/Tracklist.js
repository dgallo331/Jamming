import React from 'react';
import './Tracklist.css';
import Track from './../Track/Track';


export default class Tracklist extends React.Component{
  constructor(props) {
    super(props);
    this.renderTracks = this.renderTracks.bind(this);
  }
  renderTracks() {
    this.props.tracks.map(track => {
      return <Track key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
    });
  }
  render() {
    return (
      <div className="TrackList">
        {
          this.renderTracks
        }
      </div>
    );
  }
}
