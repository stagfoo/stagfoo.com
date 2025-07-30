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
    const tags = this.getAttribute('tags') || '';

    let storeType = '';
    if (link.includes('stripe.com')) {
      storeType = 'Stripe';
    } else if (link.includes('ko-fi.com')) {
      storeType = 'Kofi';
    } else if (link.includes('etsy.com')) {
      storeType = 'Etsy';
    }

    const tagsHTML = tags.split(',').map(tag => tag.trim()).filter(tag => tag).map(tag => `<span class="tag">${tag}</span>`).join('');

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
        .tags {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
          overflow-x: auto;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          position: relative;
        }
        .tags::-webkit-scrollbar {
          display: none;
        }
        .tags::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2rem;
          background: linear-gradient(to left, white, transparent);
        }
        .tag {
          background-color: #E5E7EB;
          color: #4B5563;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }
      </style>
      
      <a class="card" href="${link}" target="_blank">
        <img src="${image}" alt="${title}" class="image">
        <div class="content">
          <h3 class="title">${title}</h3>
          <small class="description">${description}</small>
          <p class="price">${price}</p>
          <div class="tags">${tagsHTML}</div>
        </div>
      </a>
    `;
  }
}

customElements.define('product-card', ProductCard);