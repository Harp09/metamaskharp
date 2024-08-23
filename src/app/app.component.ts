import { Component } from '@angular/core';
import { EthereumService } from './services/ethereum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  statusMessage: string = '';

  constructor(private ethereumService: EthereumService) {}

  async sendDonation() {
    const amountInput = (document.getElementById('amount') as HTMLInputElement).value;
    const reasonInput = (document.getElementById('reason') as HTMLInputElement).value.trim();

    if (!amountInput || isNaN(parseFloat(amountInput)) || parseFloat(amountInput) <= 0) {
      this.statusMessage = 'Por favor, ingresa un monto válido para donar.';
      return;
    }

    if (!reasonInput) {
      this.statusMessage = 'Por favor, escribe el motivo de tu donación.';
      return;
    }

    try {
      this.statusMessage = `Enviando donación para "${reasonInput}"...`;
      await this.ethereumService.sendTransaction(amountInput);
      this.statusMessage = `¡Donación de ${amountInput} ETH para "${reasonInput}" enviada con éxito! Gracias por tu apoyo.`;
    } catch (error) {
      console.error('Error al enviar la donación:', error);
      this.statusMessage = 'Ocurrió un error al enviar la donación. Por favor, intenta de nuevo.';
    }
  }
}
