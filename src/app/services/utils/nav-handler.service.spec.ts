import { TestBed, inject, tick, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { NavHandlerService } from './nav-handler.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mock',
  template: '<a id="mock-menu" class="nav-link"></a>'
})
class MockComponent { }

describe('NavHandlerService', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavHandlerService
      ],
      declarations: [
        MockComponent
      ]
    });
  });

  it('should be created', inject([NavHandlerService], (service: NavHandlerService) => {
    expect(service).toBeTruthy();
  }));

  it('should activate menu', fakeAsync(inject([NavHandlerService], (service: NavHandlerService) => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    service.activate('mock-menu');
    tick();

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#mock-menu').className).toContain('active');
  })));
});
