import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
import { ModalService } from '../../../services/modal.service';
import { of } from 'rxjs';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    // Mock del servicio ModalService
    const modalServiceMock = {
      modalState$: of(false), // Estado inicial del observable
      close: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PopupComponent],
      providers: [
        { provide: ModalService, useValue: modalServiceMock }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isVisible to false initially', () => {
    expect(component.isVisible).toBe(false);
  });

  it('should open the popup', () => {
    component.open();
    expect(component.isVisible).toBe(true);
  });

  it('should close the popup and call modalService.close()', () => {
    const closeSpy = jest.spyOn(modalService, 'close');
    component.close();
    expect(component.isVisible).toBe(false);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit confirmed event and close the popup on confirmDelete()', () => {
    const confirmedSpy = jest.spyOn(component.confirmed, 'emit');
    const closeSpy = jest.spyOn(modalService, 'close');

    component.confirmDelete();

    expect(confirmedSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(component.isVisible).toBe(false);
  });

  it('should close the popup when clicking on the background', () => {
    const closeSpy = jest.spyOn(modalService, 'close');
    const event = new MouseEvent('click', { bubbles: true });
    component.onBackgroundClick(event);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not close the popup when clicking inside the popup', () => {
    const event = new MouseEvent('click', { bubbles: true });
    const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
    component.stopPropagation(event);
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
