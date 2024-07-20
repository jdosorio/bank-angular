import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { LottieMockComponent } from './lottie-mock'; // Ajusta la ruta según tu estructura

describe('NavbarComponent', () => {
  let fixture: NavbarComponent;

  beforeEach(() => {
    fixture = new NavbarComponent();
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have correct animation options', () => {
    const expectedOptions = {
      path: '/assets/bank.json',
    };
    expect(fixture.options).toEqual(expectedOptions);
  });

  it('should call animationCreated when animation is created', () => {
    const mockAnimationItem = {} as any;
    const spy = jest.spyOn(fixture, 'animationCreated');
    fixture.animationCreated(mockAnimationItem);
    expect(fixture.animationCreated).toHaveBeenCalledWith(mockAnimationItem);
  });


});
