import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  //Atributos do tipo signal
  nomeUsuario = signal<string>('');
  perfilUsuario = signal<string>('');

  //Função reservada do Angular que é executada no momento
  //em que a página é aberta (ao carregar a página)
  ngOnInit() {

    //ler os dados salvos na session storage
    const usuario = JSON.parse(sessionStorage.getItem('usuario') as string);

    //capturar o nome e o perfil do usuário
    this.nomeUsuario.set(usuario.nome);
    this.perfilUsuario.set(usuario.perfil);
  }

  logout() {
    if(confirm('Deseja realmente sair da agenda?')) {
      //limpar os dados da sessão do navegador
      sessionStorage.removeItem('usuario');
      //Redirecionar para a página dashboard
      location.href = '/autenticar';
    }
  }

}
