import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/service/api.service';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { SearchboxService } from '../../services/searchbox/searchbox.service';

@Component({
  selector: 'app-pokemons-array', // Selector para usar este componente en HTML
  imports: [CommonModule], // Importa otros componentes y módulos necesarios
  templateUrl: './pokemons-array.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./pokemons-array.component.css'] // Ruta al archivo de estilos CSS
})
export class PokemonsArrayComponent implements OnInit {
  // Inyección del servicio ApiService para interactuar con la API
  private readonly pokemonsSvc = inject(ApiService);

  // Observable que contiene los Pokémon filtrados o todos los Pokémon
  filteredPokemons$: Observable<any[]> = new Observable();

  constructor(private searchBoxService: SearchboxService) {
    // Inyección del servicio SearchboxService para obtener el texto del buscador
  }

  ngOnInit(): void {
    // Configura el observable para manejar los cambios en el texto del buscador
    this.filteredPokemons$ = this.searchBoxService.textObservable.pipe(
      switchMap(searchText => 
        // Llama al servicio para obtener los Pokémon filtrados según el texto ingresado
        this.pokemonsSvc.getFilteredPokemons(searchText, 200).pipe(
          switchMap(filteredPokemons => {
            if (filteredPokemons.length === 0) {
              // Si no hay resultados, devuelve un observable con un arreglo vacío
              return of<Pokemon[]>([]);
            }
            // Si hay resultados, obtiene los detalles de cada Pokémon
            return forkJoin(
              filteredPokemons.map(pokemon => this.pokemonsSvc.getPokemonDetails(pokemon.url))
            );
          }),
          // Si ocurre un error en el proceso, devuelve un observable con un arreglo vacío
          catchError(() => of<Pokemon[]>([]))
        )
      )
    );
  }

  // Método para obtener un valor específico de las estadísticas de un Pokémon
  getStats(pokemon: Pokemon, statName: string): number | undefined {
    // Busca en el arreglo de estadísticas del Pokémon una estadística con el nombre indicado
    const stat = pokemon.stats?.find((stat: { stat: { name: string; }; }) => stat.stat.name === statName);
    // Si se encuentra la estadística, devuelve su valor base; de lo contrario, devuelve undefined
    return stat ? stat.base_stat : undefined;
  }
}