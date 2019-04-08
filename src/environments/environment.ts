// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyC1T4xvelyDJmMJtXh3EN25awxMAIAuHCs',
  authDomain: 'personal-blockchain.firebaseapp.com',
  databaseURL: 'https://personal-blockchain.firebaseio.com',
  projectId: 'personal-blockchain',
  storageBucket: 'personal-blockchain.appspot.com',
  messagingSenderId: '161243979174'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
