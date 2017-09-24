let accessToken;

const clientId = '25517b0f0a3f4bfb8f100ef0bd44212c';
const redirectUri = 'https://jamming.surge.sh';
/* purring-iron*/

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const token = window.location.href.match(/access_token=([^&]*)/)
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/)
    if(token && expiresIn){
      accessToken = token[1]
      window.setTimeout(() => accessToken = '', expiresIn[1] * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }else{
        window.location =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=track,album&q=${term}`,
    {headers: {Authorization: `Bearer ${accessToken}`}}
  ).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.items.map(track => (
        {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      ))
    }
  })
},
  savePlaylist(name, trackUri) {
    if(!name && !trackUri){
      console.log('not working')
      return;
    }
    let accessToken = Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userId;
    return fetch('https://api.spotify.com/v1/me',
        {headers:headers}
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userId = jsonResponse.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      })
    }).then(response => {

      return response.json()
    }).then(jsonResponse => {
      const playlistId = jsonResponse.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: trackUri})
      })
    })

  }
}
export default Spotify;
