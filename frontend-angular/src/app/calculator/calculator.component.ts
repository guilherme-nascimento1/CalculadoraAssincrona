import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

// Interface para a resposta da API
interface CalculationResponse {
  status: string;
  result: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  imports: [FormsModule, HttpClientModule, CommonModule]
})

export class CalculatorComponent {
  number1 = 0;
  number2 = 0;
  result: string | number | null = null;
  statusMessage: string | null = null;
  private calculationSubscription: Subscription | null = null;

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  sendNumbers(): void {
    const payload = { number1: this.number1, number2: this.number2 };

    this.http.post<{ _id: string }>(`${this.baseUrl}/calc`, payload)
      .subscribe({
        next: ({ _id }) => {
          console.log('ID recebido e armazenado:', _id); // para debug.

          this.statusMessage = 'Cálculo em andamento...';
          this.result = null;
          this.getResult(_id);
        },
        error: (error) => {
          console.error('Erro ao iniciar o cálculo:', error); // para debug.

          this.statusMessage = 'Erro ao iniciar o cálculo.';
        }
      });
  }


  private getResult(id: string): void {
    this.stopCheckingResult();

    this.calculationSubscription = interval(3000).subscribe(() => {
      this.http.get<CalculationResponse>(`${this.baseUrl}/calc/${id}`)
        .subscribe({
          next: (res) => {
            console.log('Resposta da API completa:', res);

            if (res.status === 'done') {
              console.log('Resultado final armazenado:', res.result);
              this.result = res.result;  // Atualiza o resultado
              this.statusMessage = 'Cálculo concluído!';  // Atualiza o status para concluído
              this.stopCheckingResult();  // Para o intervalo
            } else {
              this.statusMessage = `Status de cálculo: ${res.status}`;  // Atualiza o status para o valor atual
              console.log('Status de cálculo (não é done):', res.status);
            }
          },
          error: (error) => {
            console.error('Erro ao buscar o resultado:', error);
            this.statusMessage = 'Erro ao buscar o resultado.';  // Atualiza o status em caso de erro
          }
        });
    });
  }

  // Método para parar o intervalo de checagem
  private stopCheckingResult(): void {
    if (this.calculationSubscription) {
      this.calculationSubscription.unsubscribe();
      this.calculationSubscription = null;
    }
  }

  // Método para resetar os dados
  reset(): void {
    this.number1 = 0;
    this.number2 = 0;
    this.result = null;
    this.statusMessage = null;  // Reseta a mensagem de status
    this.stopCheckingResult();
  }
}
