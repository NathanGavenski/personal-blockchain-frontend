import { Component, Input } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from 'src/app/services/utils/auth-service.service';
import { WindowRefService } from 'src/app/services/utils/window-ref.service';
import { FireUser, UserModel } from 'src/test-objects/Users';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavBarComponent { }

@Component({
  selector: 'app-sidebar-nav',
  template: ''
})
class MockSideBarComponent {
  @Input() path;
  @Input() activate;
  @Input() alreadyHave;
  @Input() activateSon;
}

class MockAuthService {
  getLogingUser() {
    return Promise.resolve(FireUser);
  }

  login() { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        MockNavBarComponent,
        MockSideBarComponent
      ],
      providers: [
        WindowRefService,
        { provide: AuthService, useClass: MockAuthService }
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    spyOn(component.router, 'navigate').and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should direct to home if user is in session', fakeAsync(() => {
    spyOn(MockAuthService.prototype, 'getLogingUser').and.returnValue(Promise.resolve(FireUser));
    component.ngOnInit();
    tick();

    fixture.detectChanges();
    expect(component.router.navigate).toHaveBeenCalledWith(['home']);
  }));

  it('should login when promise is resolved', fakeAsync(() => {
    spyOn(MockAuthService.prototype, 'login').and.returnValue(Promise.resolve(FireUser));
    component.user = UserModel;
    const compiled = fixture.nativeElement;
    const loginButton = compiled.querySelector('#loginButton');
    loginButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(component.router.navigate).toHaveBeenCalledWith(['home']);
  }));

  it('should alert when promise is rejected', fakeAsync(() => {
    spyOn(MockAuthService.prototype, 'login').and.returnValue(Promise.reject({ code: '1', message: 'erro' }));
    spyOn(window, 'alert');

    component.user = JSON.parse(JSON.stringify(UserModel));
    const compiled = fixture.nativeElement;
    const loginButton = compiled.querySelector('#loginButton');
    loginButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Código: 1\nMensagem: erro');
  }));

  it('should alert when user is undefined', fakeAsync(() => {
    spyOn(window, 'alert');

    const compiled = fixture.nativeElement;
    const loginButton = compiled.querySelector('#loginButton');
    loginButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Favor informar um usuário e senha');
  }));

  it('should alert when mail is undefined', fakeAsync(() => {
    spyOn(window, 'alert');

    component.user = JSON.parse(JSON.stringify(UserModel));
    component.user.mail = undefined;
    const compiled = fixture.nativeElement;
    const loginButton = compiled.querySelector('#loginButton');
    loginButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Favor informar um usuário');
  }));

  it('should alert when password is undefined', fakeAsync(() => {
    spyOn(window, 'alert');

    component.user = JSON.parse(JSON.stringify(UserModel));
    component.user.password = undefined;
    const compiled = fixture.nativeElement;
    const loginButton = compiled.querySelector('#loginButton');
    loginButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Favor informar uma senha');
  }));

  it('should navigate to register and storage info into session', fakeAsync(() => {
    component.user = JSON.parse(JSON.stringify(UserModel));
    const compiled = fixture.nativeElement;
    const registerButton = compiled.querySelector('#register');
    registerButton.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(sessionStorage.getItem('mail')).toBe(UserModel.mail);
    expect(sessionStorage.getItem('password')).toBe(UserModel.password);
    expect(component.router.navigate).toHaveBeenCalledWith(['register']);
  }));
});
