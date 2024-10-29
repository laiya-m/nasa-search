//my code was compromised of prof's og code, chatgpt, and i also added details of my own
//i tried to get the images to be side by side, but i was not successful
import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alt: { type: String},
        secondary_creator: { type: String},
    };
  }

  static get styles() {
    return [css`
    .card {
    width: 240px;
    height: auto;
    overflow: hidden;
    border: 1px solid #e3c1f3;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;  
    }
    //changes card color when hover action occurs 
    .card:hover {
        background-color: #9cc6e7;
    }

    .image {
    width:100%;
    display: inline-block;
    }
    .details {
        padding: 8px;
      }
    .details h3 {
    font-size: 16px;
    margin: 0;
      }
    .details p {
    font-size: 12px;
    color: gray;
      }

    `];
  }

  render() {
    return html`
      <div
        class="card"
        tabindex="0"
        @click="${this.openImage}"
        @keydown="${this.keyOpenImage}"
      >
        <img class="image" src="${this.source}" alt="${this.alt}" />
        <div class="details">
          <h3>${this.title}</h3>
          <p>Creator: ${this.secondary_creator || 'Unknown'}</p>
        </div>
      </div>
    `;
  }
  openImage() {
    window.open(this.source, '_blank');
  }

  keyOpenImage(event) {
    if (event.key === 'Enter') {
      this.openImage();
    }
  }
}
customElements.define('nasa-image', NasaImage);