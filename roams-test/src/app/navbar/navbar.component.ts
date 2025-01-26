import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs'; // Operadores de RxJS para manejar eventos de entrada
import { SearchboxService } from '../services/searchbox/searchbox.service'; // Servicio para manejar la búsqueda
import { Pokemon } from '../models/pokemon.model'; // Modelo de datos para los Pokémon
import { CommonModule } from '@angular/common'; // Módulo común de Angular

@Component({
  selector: 'app-navbar', // Selector del componente para usarlo en HTML
  imports: [CommonModule], // Módulos importados para este componente
  templateUrl: './navbar.component.html', // Ruta al archivo de plantilla HTML
  styleUrl: './navbar.component.css' // Ruta al archivo de estilos CSS
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('SearchInput') inputSearch?: ElementRef; // Referencia al elemento de entrada de búsqueda en el DOM
  filteredPokemons: Pokemon[] = []; // Lista de Pokémon filtrados (no utilizada directamente aquí, pero está disponible)

  constructor(private service: SearchboxService) {
    // Inyecta el servicio SearchboxService para manejar la comunicación de búsqueda
  }

  ngAfterViewInit() {
    // Este método se ejecuta después de que la vista se ha inicializado
    if (this.inputSearch) {
      // Si la referencia al input de búsqueda existe
      fromEvent<any>(this.inputSearch.nativeElement, 'keyup') // Escucha el evento 'keyup' en el input
        .pipe(
          map(event => event.target.value.trim()), // Obtén el texto del input y elimina espacios en blanco
          debounceTime(400), // Espera 400ms después de que el usuario deje de escribir
          distinctUntilChanged() // Solo actúa si el texto ha cambiado
        )
        .subscribe(text => {
          // Suscripción al observable de eventos
          console.log('Texto ingresado:', text); // Muestra el texto ingresado en la consola
          this.service.emitText(text); // Emite el texto al servicio para que otros componentes lo reciban
        });
    }
  }

  ngOnInit() {
    // Este método se ejecuta al inicializar el componente
    this.service.textObservable.subscribe(searchText => {
      // Suscríbete al observable del servicio para recibir el texto de búsqueda
      console.log('Texto de búsqueda recibido:', searchText); // Muestra el texto recibido en la consola
      this.service.getFilteredPokemons(searchText).subscribe(filteredPokemons => {
        // Llama al servicio para obtener los Pokémon filtrados según el texto
        this.filteredPokemons = filteredPokemons; // Actualiza la lista de Pokémon filtrados
        console.log('Pokémon filtrados en el componente: ', this.filteredPokemons); // Muestra los Pokémon filtrados en la consola
      });
    });
  }
}