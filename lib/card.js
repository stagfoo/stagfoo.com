class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['image', 'title', 'price'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image') || '/api/placeholder/400/300';
    const title = this.getAttribute('title') || 'Example';
    const price = this.getAttribute('price') || '$1';
    const description = this.getAttribute('description') || '...';
    const link = this.getAttribute('link') || '#';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        a {
          text-decoration: none;
          color: #000;
          transition: ease all 0.3s;
        }
        a:hover {
        transform: scale(0.98)
        }
        .card {
          
          display:block;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .image {
          width: 100%;
          display: block;
        }
        .content {
          padding: 1rem;
        }
        .title {
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
        }
        .price {
          color: #4B5563;
        }
      </style>
      
      <a class="card" href="${link}" target="_blank">
        <img src="${image}" alt="${title}" class="image">
        <div class="content">
          <h3 class="title">${title}</h3>
          <small class="description">${description}</small>
          <p class="price">${price}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('product-card', ProductCard);