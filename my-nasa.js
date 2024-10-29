//my code was compromised of prof's og code, chatgpt, and i also added details of my own
//i tried to get the images to be side by side, but i was not successful
import { LitElement, html, css } from 'lit';
import "./my-images.js";
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
      }
      #container {
      padding: 16px;
    }
    h1, h2 {
      margin: 0 0 16px;
      text-align: center;

      //making sure the images are side by side 
      .results {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
      }

      details {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    input {
      font-size: 20px;
      line-height: 40px;
      width: 100%;
      max-width: 300px;
      text-align: center;
      margin: 8px 0;
    }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = 'Image Search';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search NASA</summary>
      <div>
        <input id="input" placeholder="Search NASA" @input="${this.inputChanged}" />
      </div>
    </details>
    <div class="results">
      ${this.items.map((item, index) => html`
      <nasa-image
        source="${item.links[0].href}"
        alt="${item.data[0].title}"
        title="${item.data[0].title}"
        secondary_creator= "${item.data[0].secondary_creator}"
      ></nasa-image>
      `)}
    </div>
    `;
  }

  inputChanged() {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define('nasa-search', NasaSearch);