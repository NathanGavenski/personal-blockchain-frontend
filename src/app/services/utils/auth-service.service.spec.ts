import { firebaseConfig } from 'src/environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from '../utils/auth-service.service';
import { AngularFireModule } from 'angularfire2';
import { UserModel, FireUser } from 'src/test-objects/Users';

describe('AuthServiceService', () => {

  let service: AuthService;
  let fire: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AngularFireAuth,
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ]
    });
  });

  beforeEach(inject([AuthService, AngularFireAuth], (ser: AuthService, auth: AngularFireAuth) => {
    service = ser;
    fire = auth;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should try to create an user and login', fakeAsync(() => {
    spyOn(fire.auth, 'createUserWithEmailAndPassword')
      .and.returnValue(Promise.resolve());
    spyOn(service, 'getLogingUserId');
    service.signUpEmail(UserModel);
    tick();

    expect(fire.auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(service.getLogingUserId).toHaveBeenCalled();
  }));

  it('should try to login', () => {
    spyOn(fire.auth, 'signInWithEmailAndPassword')
      .and.returnValue(Promise.resolve());
    service.login(UserModel);

    expect(fire.auth.signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should try to get the login user', () => {
    spyOn(fire.auth, 'onAuthStateChanged')
      .and.returnValue(Promise.resolve(FireUser));
    service.getLogingUser();

    expect(fire.auth.onAuthStateChanged).toHaveBeenCalled();
  });

  it('should try to delete the user', () => {
    spyOn(fire.auth, 'onAuthStateChanged')
      .and.returnValue(Promise.resolve(FireUser));
    service.deleteUser();

    expect(fire.auth.onAuthStateChanged).toHaveBeenCalled();
  });

  it('should try to logout the user', () => {
    spyOn(fire.auth, 'signOut')
      .and.returnValue(Promise.resolve());
    service.logout();

    expect(fire.auth.signOut).toHaveBeenCalled();
  });
});
