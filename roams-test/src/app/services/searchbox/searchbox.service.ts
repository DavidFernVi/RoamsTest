import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // Importa BehaviorSubject y Observable de RxJS
import { Pokemon } from '../../models/pokemon.model'; // Modelo de datos para los Pokémon
import { ApiService } from '../service/api.service'; // Servicio para manejar las llamadas a la API

@Injectable({
  providedIn: 'root' // Proporciona este servicio a toda la aplicación
})
export class SearchboxService {

  // BehaviorSubject que mantiene el texto actual del buscador
  private textSubject = new BehaviorSubject<string>(''); // Inicializa con una cadena vacía
  textObservable = this.textSubject.asObservable(); // Convierte el BehaviorSubject en un Observable para que otros componentes puedan suscribirse

  // Lista que contiene todos los Pokémon cargados
  private allPokemons: Pokemon[] = []; // Actualmente no se usa directamente, pero puede ser útil para almacenar todos los Pokémon

  constructor(private apiservice: ApiService) {
    // Inyecta el ApiService para interactuar con la API de Pokémon
  }

  /**
   * Obtiene una lista de Pokémon filtrados según el texto ingresado.
   * @param searchText Texto que se usará para filtrar los Pokémon.
   * @returns Observable que emite una lista de Pokémon filtrados.
   */
  getFilteredPokemons(searchText: string): Observable<any[]> {
    // Llama al método getFilteredPokemons del ApiService para obtener los Pokémon filtrados
    return this.apiservice.getFilteredPokemons(searchText, 200);
  }

  /**
   * Emite un nuevo texto al BehaviorSubject.
   * @param chars Texto que se emitirá.
   */
  emitText(chars: string): void {
    console.log('Texto emitido al servicio:', chars); // Registra el texto emitido en la consola
    this.textSubject.next(chars); // Actualiza el texto del BehaviorSubject
  }
}