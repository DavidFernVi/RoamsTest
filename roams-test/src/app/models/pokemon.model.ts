// Clase que representa un Pokémon básico con su nombre y URL
export class Pokemon {
  name: string; // Nombre del Pokémon
  url: string;  // URL para obtener los detalles del Pokémon

  // Constructor para inicializar un Pokémon con su nombre y URL
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

// Interfaz que representa las estadísticas de un Pokémon
export interface Stat {
  stat: {
    name: string; // Nombre de la estadística (por ejemplo, "hp", "attack", "speed")
  };
  base_stat: number; // Valor base de la estadística
}