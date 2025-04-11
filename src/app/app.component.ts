import { Component } from '@angular/core';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentosPesquisaComponent } from "./lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component";
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pessoa-pesquisa.component";
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LancamentosModule, NavbarComponent, PessoasModule, ToastModule, ConfirmDialogModule
    , LancamentoCadastroComponent, LancamentosPesquisaComponent, PessoaPesquisaComponent,ButtonModule],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService){}


    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }

}
