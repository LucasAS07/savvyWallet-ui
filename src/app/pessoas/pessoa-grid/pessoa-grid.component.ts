import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pessoa-grid',
  standalone: true,
  imports: [InputTextModule,StyleClassModule,ButtonModule,
    TableModule, NgStyle,BadgeModule, TooltipModule
  ],
  templateUrl: './pessoa-grid.component.html',
  styleUrl: './pessoa-grid.component.css'
})
export class PessoaGridComponent {
  @Input() pessoas: any = []
}
