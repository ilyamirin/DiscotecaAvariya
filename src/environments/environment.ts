// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'assets/',
  firebaseConfig: {
    apiKey: 'AIzaSyD0jXLb9pufSvYhZ2q2Hn7WpZbZoHSwhp0',
    authDomain: 'data-analysis-system.firebaseapp.com',
    databaseURL: 'https://data-analysis-system.firebaseio.com',
    projectId: 'data-analysis-system',
    storageBucket: 'data-analysis-system.appspot.com',
    messagingSenderId: '854322953386',
    appId: '1:854322953386:web:4eb5858c53ed93a5f124d3',
    measurementId: 'G-DLNFBMC928'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
