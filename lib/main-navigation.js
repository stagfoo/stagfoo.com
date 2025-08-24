class MainNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const homeUrl = this.getAttribute('home-url') || '/index.html';
    const shopUrl = this.getAttribute('shop-url') || '/shop.html';
    const kofiUrl = this.getAttribute('kofi-url') || '#';
    const bookmarkUrl = this.getAttribute('bookmarks-url') || '/bookmarks.html';
    const etsyUrl = this.getAttribute('etsy-url') || '#';
    const itchUrl = this.getAttribute('itch-url') || '#';
    const logoUrl = this.getAttribute('logo-url') || './assets/logo.png';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap');

        nav {
          position: relative;
          display: flex;
          justify-content: flex-end; /* Align links to the right */
          align-items: center;
          padding: 1rem 2rem;
          background: transparent;
          margin-top: 50px; /* Make space for the overhanging logo */
          z-index: 100;
        }
        .nav-links {
          display: none; /* Hide by default on mobile */
          gap: 1.5rem;
        }
        .nav-links.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            right: 2rem;
            background-color: white;
            padding: 1rem;
            border-radius: 10px;
            border: 2px solid #f0f0f0;
            z-index: 110;
        }

        a {
          text-decoration: none;
          color: #555;
          font-weight: bold;
          font-size: 1.1rem;
          transition: color 0.3s ease;
          font-family: "Cherry Bomb One", system-ui; /* Apply Cherry Bomb here */
        }
        a:hover {
          color: #F891AD; /* Pink from logo */
        }
        .logo {
            position: absolute;
            top: -55px; /* Adjust to control the overhang */

            left: 2rem; /* Align with the nav padding */
            z-index: 10;
        }
        .logo img {
          height: 180px;
        }

        .hamburger {
            display: block;
            cursor: pointer;
            width: 50px; /* Adjust as needed */
            height: 50px; /* Adjust as needed */
        }

        .hamburger img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .hamburger.open .closed { display: none }
        .hamburger.open .open { display: block }
        .hamburger .open { display: none }


        @media (min-width: 768px) {
            .logo {
              top: -68px;
            }
            .hamburger {
                display: none;
            }
            .nav-links {
                display: flex;
            }
            .nav-links.open {
                position: static;
                flex-direction: row;
                background-color: transparent;
                border: none;
                padding: 0;
            }
        }

      </style>
      <nav class="cherry-bomb-one-regular">
        <a href="${homeUrl}" class="logo">
          <img src="${logoUrl}" alt="foofoo">
        </a>
        <div class="hamburger">
          <img src="/assets/icons/menu.png" class="closed" alt="Menu Icon">
          <img src="/assets/icons/menu-open.png" class="open" alt="Menu Icon">
        </div>
        <div class="nav-links">
          <a href="${shopUrl}">Shop</a>
          <a href="${bookmarkUrl}">Things I love</a>
          <a href="${kofiUrl}" target="_blank" rel="noopener noreferrer">Kofi</a>
          <a href="${etsyUrl}" target="_blank" rel="noopener noreferrer">Etsy</a>
          <a href="${itchUrl}" target="_blank" rel="noopener noreferrer">Itch</a>
        </div>
      </nav>
    `;

    this.shadowRoot.querySelector('.hamburger').addEventListener('click', () => {
        this.shadowRoot.querySelector('.hamburger').classList.toggle('open');
        this.shadowRoot.querySelector('.nav-links').classList.toggle('open');
    });
  }
}

customElements.define('main-navigation', MainNavigation);
