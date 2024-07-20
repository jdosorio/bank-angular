import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  isVisible = false;
  @Output() confirmed = new EventEmitter<void>();
  @Input() message:string = "";

  constructor(private modalService: ModalService) {
    this.modalService.modalState$.subscribe(state => {
      this.isVisible = state;
    });
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.modalService.close();
  }

  confirmDelete(): void {
    this.confirmed.emit();
    this.close();
  }

  onBackgroundClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
