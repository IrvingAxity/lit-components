// src/pokemon.ts

import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

interface IPokemonResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

@customElement('pokemon-list')
export class PokemonList extends LitElement {
  @state() private pokemonResponse: IPokemonResponse = { count: 0, next: '', previous: null, results: [] };

  constructor() {
    super();
    const username = localStorage.getItem('username');
    
    if (!username) {
      // Si no está logueado, redirigir a la página de login
      console.log("Usuario no logueado, redirigiendo a login...");
      window.location.href = "/index.html"; // Redirige al login si no hay usuario
    } else {
      console.log("Usuario logueado, cargando Pokémon...");
      this.getPokemons();  // Si está logueado, cargar los Pokémon
    }
  }

  private getPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result: IPokemonResponse) => {
        this.pokemonResponse = { ...result };
      });
  }

  render() {
    return html`
      <div class="pokemon-container">
        <h2>Lista de Pokémon</h2>
        <ul>
          ${this.pokemonResponse.results.map((pokemon) => {
            return html`
              <li>${pokemon.name}</li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  static styles = css`
    .pokemon-container {
      text-align: center;
      padding: 20px;
      color: white;
    }

    h2 {
      font-size: 28px;
      margin-bottom: 20px;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      font-size: 18px;
      margin: 10px 0;
    }
  `;
}
