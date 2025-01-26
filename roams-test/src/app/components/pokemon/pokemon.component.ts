import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pokemon',
  imports: [MatCardModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  @Input() name!: string;
  @Input() type!: string;
  @Input() height!: number;
  @Input() weight!: number;

  ngOnInit(): void {
    console.log("Componente pokemon cargado");
  }
}

export interface Pokemon {
  stats: any;
  name: string;
  type: string;
  height: number;
  weight: number;
}