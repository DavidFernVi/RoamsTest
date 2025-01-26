import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP
import { inject, Injectable } from '@angular/core'; // Importa decoradores para inyección de dependencias y servicios
import { map, Observable } from 'rxjs'; // Importa operadores y tipos de RxJS

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la aplicación
})
export class ApiService {
  
  // Inyección de HttpClient para realizar llamadas HTTP
  private readonly _http = inject(HttpClient);

  /**
   * Obtiene la lista de todos los Pokémon disponibles.
   * @returns Un observable que emite la respuesta de la API.
   */
  getAllPokemons(): Observable<any> {
    // Llama al endpoint para obtener la lista de Pokémon
    return this._http.get('https://pokeapi.co/api/v2/pokemon');
  }

  /**
   * Obtiene los detalles de un Pokémon específico dado su URL.
   * @param url La URL con los detalles del Pokémon.
   * @returns Un observable que emite los detalles del Pokémon.
   */
  getPokemonDetails(url: string): Observable<any> {
    // Realiza una solicitud GET a la URL proporcionada
    return this._http.get(url);
  }

  /**
   * Filtra los Pokémon por nombre, basado en el texto ingresado.
   * @param searchText El texto que se usará para filtrar los Pokémon.
   * @param limit Número máximo de Pokémon a devolver (opcional, por defecto 100).
   * @param offset Desplazamiento para paginación (opcional, por defecto 0).
   * @returns Un observable que emite una lista de Pokémon filtrados.
   */
  getFilteredPokemons(searchText: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this.getAllPokemons().pipe(
      map(response => response.results), // Extrae la lista de Pokémon de la respuesta
      map(results =>
        results.filter((pokemon: any) => 
          // Filtra los Pokémon cuyos nombres comiencen con el texto ingresado
          pokemon.name.toLowerCase().startsWith(searchText.toLowerCase())
        )
      )
    );
  }
}