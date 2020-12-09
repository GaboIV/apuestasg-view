// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  optionsWebsocketsEcho: {
    authEndpoint: "http://localhost/apuestasg-backend/public" + `/broadcasting/auth`,
    broadcaster: 'pusher',
    key: 'ASDASD2121',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    disableStats: true,
    encrypted: false,
    enabledTransports: ['ws']
  },
  url: 'https://api.apuestasg.win' + "/api/"
  // url: "http://localhost/apuestasg-backend/public" + '/api/',
  // functions: 'http://agsw.apuestasg.win/php/funciones'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
