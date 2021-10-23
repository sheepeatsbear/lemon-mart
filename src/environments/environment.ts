// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
  // authMode: AuthMode.Firebase,
  firebase: {
    apiKey: 'AIzaSyCZmW8L4PlnJBuw9yCzBpO5JcXeszVUTYA',
    authDomain: 'lemon-mart-85275.firebaseapp.com',
    projectId: 'lemon-mart-85275',
    storageBucket: 'lemon-mart-85275.appspot.com',
    messagingSenderId: '132912493669',
    appId: '1:132912493669:web:d502cc07d4fe14c811428c',
    measurementId: 'G-YK9SJDLXL7',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
