import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message!: string;
  @Input() type: string = 'info';
  @Input() duration: number = 3000;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    const element = document.getElementById('toast');
    element?.classList.remove('show');
  }
}
