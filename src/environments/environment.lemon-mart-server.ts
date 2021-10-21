import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: true,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
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
