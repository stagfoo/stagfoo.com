class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['image', 'title', 'price', 'description', 'stripe-link', 'etsy-link', 'kofi-link', 'tags', 'hide-tags', 'icon-type'];
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
    const rawPrice = this.getAttribute('price') || '1';
    const price = `AUD $${String(rawPrice).replace(/[^0-9.]/g, '')}`;
    const description = this.getAttribute('description') || '';
    const stripeLink = this.getAttribute('stripe-link');
    const etsyLink = this.getAttribute('etsy-link');
    const kofiLink = this.getAttribute('kofi-link');
    const tags = this.getAttribute('tags') || '';
    const hideTags = this.getAttribute('hide-tags') === 'true';
    const iconTypes = (this.getAttribute('icon-type') || '').split(',').map(s => s.trim()).filter(Boolean);

    const iconHTML = iconTypes.map(iconType => {
      if (iconType === 'emote') {
        return `<icon-popover icon="assets/icons/emote.png"><div>Emote packs come with 8 emoji!</div></icon-popover>`;
      } else if (iconType === 'pngtuber') {
        return `<icon-popover icon="assets/icons/png-tuber.png"><div>PNGTubers come with 4 PNGs by default.</div></icon-popover>`;
      } else if (iconType === 'sticker') {
        return `<icon-popover icon="assets/icons/digital-sticker.png"><div>Digital sticker packs have multiple stickers.</div></icon-popover>`;
      } else if (iconType === 'png-extras') {
        return `<icon-popover icon="assets/icons/png-tuber-extra.png"><div>PNGTuber extras include more expressions or accessories!</div></icon-popover>`;
      }
      return '';
    }).join('');

    const tagsHTML = hideTags ? '' : tags.split(',').map(tag => tag.trim()).filter(tag => tag).map(tag => `<span class="tag">${tag}</span>`).join('');

    let linksHTML = '';
    if (stripeLink) {
      linksHTML += `<a href="${stripeLink}" class="button stripe-button" target="_blank">Buy Now</a>`;
    }

    const otherLinks = [];
    if (etsyLink) {
      otherLinks.push(`<a href="${etsyLink}" class="text-link" target="_blank">Etsy</a>`);
    }
    if (kofiLink) {
      otherLinks.push(`<a href="${kofiLink}" class="text-link" target="_blank">Ko-fi</a>`);
    }

    if (otherLinks.length > 0) {
      linksHTML += `
        <div class="other-links">
          <small>Also available on: ${otherLinks.join(', ')}</small>
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          display:block;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          text-decoration: none;
          color: #000;
          background: #FFFFFF;
        }
        .card:hover {
            transform: scale(0.98)
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
        .price-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .card-icons {
          display: flex;
          gap: 0.5rem;
        }
        .price {
          color: #4B5563;
        }
        .tags-container {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: nowrap;
          gap: 0.5rem;
          overflow-x: auto;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          position: relative;
        }
        .tags-container::-webkit-scrollbar {
          display: none;
        }
        .tags-container::after {
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
          white-space: nowrap;
        }
        .button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: bold;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 0.5rem;
        }
        .stripe-button {
          background-color: #635BFF;
          color: white;
        }
        .other-links {
          text-align: center;
          margin-top: 0.5rem;
        }
        .text-link {
          color: #635BFF;
          text-decoration: underline;
        }
        .tags {
            display: none;
        }
      </style>
      
      <div class="card">
        <a href="${stripeLink || etsyLink || kofiLink || '#'}" target="_blank">
            <img src="${image}" alt="${title}" class="image">
        </a>
        <div class="content">
          <h3 class="title">${title}</h3>
          <small class="description">${description}</small>
          <div class="price-info">
            <p class="price">${price}</p>
            <div class="card-icons">${iconHTML}</div>
          </div>
          <div class="links">
            ${linksHTML}
          </div>
          <div class="tags-container">${tagsHTML}</div>
          <div class="tags">${tags}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);
