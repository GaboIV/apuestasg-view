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
    authEndpoint: "https://api.apuestasg.alonsobet.xyz/broadcasting/auth",
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    wsHost: 'api.apuestasg.alonsobet.xyz',
    wsPort: 80,
    wssPort: 443,
    disableStats: true,
    encrypted: true,
    enabledTransports: ['ws', 'wss']
  },
  // url: 'https://api.apuestasg.alonsobet.xyz' + "/api/"
  url: 'https://api.apuestasg.alonsobet.xyz' + "/api/"
};
