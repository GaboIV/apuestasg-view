export const environment = {
  production: false,

  url: 'http://vinobet.xd' + "/api/",

  // functions: 'http://agsw.apuestasg.win/php/funciones'

  optionsWebsocketsEcho: {
    authEndpoint: "http://vinobet.xd/broadcasting/auth",
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    wsHost: 'http://vinobet.xd',
    wsPort: 6001,
    disableStats: true,
    encrypted: false,
    enabledTransports: ['ws']

    // authEndpoint: "https://api.alonsobet.xyz/broadcasting/auth",
    // broadcaster: 'pusher',
    // key: 'ASDASD2121',
    // wsHost: 'api.alonsobet.xyz',
    // wsPort: 80,
    // wssPort: 443,
    // disableStats: true,
    // encrypted: true,
    // enabledTransports: ['ws', 'wss']
  },  
};
