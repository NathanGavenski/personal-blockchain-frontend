import { User } from 'src/app/components/models/user';

export const FireUser = {
  'uid': 'ZJ4B4pUT1ZVkI8tRP5fUwMjG28C2',
  'displayName': null,
  'photoURL': null,
  'email': 'nathangavenski@gmail.com',
  'emailVerified': false,
  'phoneNumber': null,
  'isAnonymous': false,
  'providerData': [{
    'uid': 'nathangavenski@gmail.com',
    'displayName': null,
    'photoURL': null,
    'email': 'nathangavenski@gmail.com',
    'phoneNumber': null,
    'providerId': 'password'
  }],
  'apiKey': '',
  'appName': '[DEFAULT]',
  'authDomain': '',
  'stsTokenManager': {
    'apiKey': '',
    'refreshToken': '',
    'accessToken': '',
    'expirationTime': ''
  },
  'redirectEventId': null,
  'lastLoginAt': '1543705306000',
  'createdAt': '1541523789000'
};

export const UserModel = new User(
  'nathangavenski@gmail.com', 'teste123', 'Nathan',
  'Gavenski', '51-993134034', '730512000',
  'N/A', '', 'Tv. Universina Araujo Nunes 72',
  '307', 'Porto Alegre', 'Rio Grande do Sul',
  91420526, ''
);
