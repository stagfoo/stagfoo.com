class MainNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const homeUrl = this.getAttribute('home-url') || './index.html';
    const shopUrl = this.getAttribute('shop-url') || './shop.html';
    const kofiUrl = this.getAttribute('kofi-url') || '#';
    const etsyUrl = this.getAttribute('etsy-url') || '#';
    const itchUrl = this.getAttribute('itch-url') || '#';
    const logoUrl = this.getAttribute('logo-url') || './assets/logo.png';

    this.shadowRoot.innerHTML = `
      <style>
        nav {
          position: relative;
          display: flex;
          justify-content: flex-end; /* Align links to the right */
          align-items: center;
          padding: 1rem 2rem;
          background: transparent;
          border-bottom: 2px solid #f0f0f0;
          margin-top: 50px; /* Make space for the overhanging logo */
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        a {
          text-decoration: none;
          color: #555;
          font-weight: bold;
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }
        a:hover {
          color: #ff7f50; /* Coral color */
        }
        .logo {
            position: absolute;
            top: -60px; /* Adjust to control the overhang */
            left: 2rem; /* Align with the nav padding */
            z-index: 10;
        }
        .logo img {
          height: 150px;
        }
      </style>
      <nav>
        <a href="${homeUrl}" class="logo">
          <img src="${logoUrl}" alt="foofoo">
        </a>
        <div class="nav-links">
          <a href="${shopUrl}">Shop</a>
          <a href="${kofiUrl}" target="_blank" rel="noopener noreferrer">Kofi</a>
          <a href="${etsyUrl}" target="_blank" rel="noopener noreferrer">Etsy</a>
          <a href="${itchUrl}" target="_blank" rel="noopener noreferrer">Itch</a>
        </div>
      </nav>
    `;
  }
}

customElements.define('main-navigation', MainNavigation);
