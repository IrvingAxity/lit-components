import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface IPokemonResponse {
  count?: number;
  next?: string;
  previous?: string;
  results?: { name: string; url: string }[];
}

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  pokemonResponse: IPokemonResponse = {};

  @property({ type: Boolean })
  showLoginForm: boolean = true;

  @property()
selectedPokemon: any = null;

@property()
error: string = '';

  // DATOS POKEMON (API TOTAL(LA ULTIMA QUE PASÓ URBAN))
  getInfo = () => {
    fetch('https://pokeapi.co/api/v2/pokemon') 
      .then((response) => response.json())
      .then((result: IPokemonResponse) => {
        this.pokemonResponse = { ...result };
      });
  };

  constructor() {
    super();
    this.getInfo();
  }

  handleLoginSuccess() {
    this.showLoginForm = false;
  }

  render() {
  return html`
    <div class="content-wrapper">
      ${this.showLoginForm
        ? html`
            <login-form @login-success="${this.handleLoginSuccess}"></login-form>
          `
        : html`
            <div class="pokemon-cards-container">
              ${this.pokemonResponse.results?.map((pokemon) => {
                return html`
                  <div class="pokemon-card">
                    <span class="pokemon-name">${pokemon.name}</span>
                  </div>
                `;
              })}
            </div>
          `}
    </div>
  `;
}

  static styles = css`
  :host {
    display: block;
    font-family: 'Inter', sans-serif;
    color: #fff;
    background-color: #121212;
    padding: 0;
    margin: 0;
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .pokemon-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
  }

  .pokemon-card {
    background-color: #1f1f1f;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(255, 205, 0, 0.4);
  }

  .pokemon-name {
    font-size: 18px;
    font-weight: bold;
    color: #ffcd00;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
`;
}