import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmailFormComponent {
  to: string = '';
  subject: string = '';
  text: string = '';
  attachReport: boolean = false;
  message: string | null = null;
  messageType: string = 'success';

  constructor(private emailService: EmailService) {}

  sendEmail(): void {
    this.emailService.sendEmail(this.to, this.subject, this.text, this.attachReport).subscribe(
      response => {
        console.log('Correo enviado:', response);
        this.showMessage('Correo enviado exitosamente.', 'success');
        this.resetForm();
      },
      error => {
        console.error('Error al enviar el correo', error);
        this.showMessage('Error al enviar el correo.', 'danger');
      }
    );
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 3000);
  }

  private resetForm(): void {
    this.to = '';
    this.subject = '';
    this.text = '';
    this.attachReport = false;
  }
}
