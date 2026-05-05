import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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

    //Declarando o formulário
    formAutenticar = new FormGroup({    
      email : new FormControl('', [Validators.required]),
      senha : new FormControl('', [Validators.required])
    });

    //Função executada no submit do formulário
    autenticar() {
        //Fazendo uma requisição POST para a API de autenticação de usuário
        this.http.post('http://localhost:8082/api/usuario/autenticar', this.formAutenticar.value)
          .subscribe({
            next: (data) => { //capturando resposta de sucesso
              console.log(data); //exibindo resposta no console para verificar o que a API retornou
              this.formAutenticar.reset(); //limpando o formulário após autenticação
            },
            error: (e) => { //capturando resposta de erro
              console.log(e.error);
            }
          });
    }
}
