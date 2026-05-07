import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-conta',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css',
})
export class CriarConta {

  http = inject(HttpClient);

  //atributos para armazenar msg de sucess e erro
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

    FormCriarConta = new FormGroup({
      nome : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      senha : new FormControl('', [Validators.required]),
      senhaConfirmacao : new FormControl('', [Validators.required]),
    });

    criarConta() {

      this.mensagemSucesso.set('');
      this.mensagemErro.set('');

    this.http.post('http://localhost:8082/api/usuario/criar', this.FormCriarConta.value)
     .subscribe({
      next: (data: any) => {
        this.mensagemSucesso.set('Parabéns, ' + data.nome + "! Sua conta de usuário foi criada com sucesso.")
        this.FormCriarConta.reset();
      },
      error: (e) => {
        this.mensagemErro.set(e.error);
      }
     })
    }
}
