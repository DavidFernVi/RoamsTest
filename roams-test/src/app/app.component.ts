import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonsArrayComponent } from './components/pokemons-array/pokemons-array.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonsArrayComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

}
