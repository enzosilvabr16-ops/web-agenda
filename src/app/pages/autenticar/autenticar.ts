import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar.html',
  styleUrl: './autenticar.css',
})
export class Autenticar {

    //Atributo para usar a biblioteca HttpClient
    http = inject(HttpClient);

    mensagemErro = signal<string>('');

    //Declarando o formulário
    formAutenticar = new FormGroup({    
      email : new FormControl('', [Validators.required]),
      senha : new FormControl('', [Validators.required])
    });

    //Função executada no submit do formulário
    autenticar() {

      this.mensagemErro.set('');

        //Fazendo uma requisição POST para a API de autenticação de usuário
        this.http.post('http://localhost:8082/api/usuario/autenticar', this.formAutenticar.value)
          .subscribe({
            next: (data) => { //capturando resposta de sucesso

              this.formAutenticar.reset(); //limpando o formulário após autenticação
              
              //salvar as informações recebidas da API em uma sessao do navegador
              sessionStorage.setItem('usuario', JSON.stringify(data));
              //Redirecionar para a pag dashboard
              location.href = '/dashboard';
            },
            error: (e) => { //capturando resposta de erro
              this.mensagemErro.set(e.error);
            }
          });
    }
}
