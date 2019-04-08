import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarNavComponent } from './sidebar-nav.component';

describe('SidebarNavComponent', () => {
  let component: SidebarNavComponent;
  let fixture: ComponentFixture<SidebarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarNavComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have normal-activate and have son-activate', async(() => {
    component.activateSon = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#normal-activate')).toBeFalsy();
    expect(compiled.querySelector('#son-activate')).toBeTruthy();
  }));

  it('should have normal-activate and not have son-activate', async(() => {
    component.activateSon = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#normal-activate')).toBeTruthy();
    expect(compiled.querySelector('#son-activate')).toBeFalsy();
  }));

  it('sould deactivate the activate menu', async(() => {
    component.activate = undefined;
    component.alreadyHave = true;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#normal-activate').className).toContain('deactivate');
  }));

  it('should deactivate the view and renew menu', async(() => {
    component.activate = 'test';
    component.activateSon = true;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#view').className).toContain('deactivate');
    expect(compiled.querySelector('#renew').className).toContain('deactivate');
  }));
});
