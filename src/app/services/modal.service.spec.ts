import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { Subject } from 'rxjs';

describe('ModalService', () => {
  let service: ModalService;
  let modalSubjectSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });

    service = TestBed.inject(ModalService);

    // Crear un espía para el Subject
    modalSubjectSpy = jest.spyOn(service['modalSubject'], 'next');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when open is called', () => {
    service.open();
    expect(modalSubjectSpy).toHaveBeenCalledWith(true);
  });

  it('should emit false when close is called', () => {
    service.close();
    expect(modalSubjectSpy).toHaveBeenCalledWith(false);
  });

  it('should provide an observable for modal state', (done) => {
    service.modalState$.subscribe(state => {
      expect(state).toBe(true);
      done();
    });

    service.open();
  });
});
