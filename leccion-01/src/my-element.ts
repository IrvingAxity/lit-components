import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('login-form')
export class LoginForm extends LitElement {
  @state() private error = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 380px;
      padding: 40px 30px;
      background-color: #000;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
      color: white;
      font-family: 'Inter', sans-serif;
    }

    h2 {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 32px;
      color: #ffffff;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      font-size: 14px;
      margin-bottom: 6px;
      color: #bbbbbb;
    }

    input {
      padding: 12px 14px;
      background-color: #1c1c1c;
      border: 1px solid #333;
      border-radius: 6px;
      color: #fff;
      font-size: 15px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #e50914;
      box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.3);
    }

    button {
      padding: 12px;
      background-color: #e50914;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #900c3f;
    }

    .error-message {
      color: #ffa00a;
      font-size: 14px;
      text-align: center;
      margin-top: 12px;
      display: none;
    }

    .error-message.visible {
      display: block;
    }

    .forgot-password {
      text-align: right;
      margin-top: -12px;
      margin-bottom: 8px;
    }

    .forgot-password a {
      font-size: 13px;
      color: #b3b3b3;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .forgot-password a:hover {
      color: #ffffff;
      text-decoration: underline;
    }
  `;

  private handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.querySelector('#username') as HTMLInputElement).value.trim();
    const password = (form.querySelector('#password') as HTMLInputElement).value.trim();

    if (username === 'irving@gmail.com' && password === 'axity') {
      this.error = false;
      this.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
    } else {
      this.error = true;
    }
  }

  render() {
    return html`
      <h2>Iniciar Sesión</h2>
      <form @submit=${this.handleSubmit}>
        <div class="form-group">
          <label for="username">Correo o usuario</label>
          <input type="text" id="username" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" />
        </div>
        <div class="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p class="error-message ${this.error ? 'visible' : ''}">
        Datos inválidos. Intenta de nuevo.
      </p>
    `;
  }
}
