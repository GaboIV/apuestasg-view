export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyC3sXwYzLreMVwmHk963mS2I3KXYN32MVE',
    authDomain: 'ventasg-572ba.firebaseapp.com',
    databaseURL: 'https://ventasg-572ba.firebaseio.com',
    projectId: 'ventasg-572ba',
    storageBucket: '',
    messagingSenderId: '759187144031'
  },
  optionsWebsocketsEcho: {
    authEndpoint: "https://api.apuestasg.win/broadcasting/auth",
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    wsHost: 'api.apuestasg.win',
    wsPort: 80,
    wssPort: 443,
    disableStats: true,
    encrypted: true,
    enabledTransports: ['ws', 'wss']
  },
  // url: 'https://api.apuestasg.win' + "/api/"
  url: 'https://apuestasg.herokuapp.com' + "/api/"
};
