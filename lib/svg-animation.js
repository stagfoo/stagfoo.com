class SvgAnimation extends HTMLElement {
  static get observedAttributes() {
    return ['image1-src', 'image2-src', 'image3-src'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Set placehold.it as the new default image sources
    const image1Src = this.getAttribute('image1-src') || "https://placehold.it/50x50/ff0000/ffffff?text=1";
    const image2Src = this.getAttribute('image2-src') || "https://placehold.it/50x50/00ff00/ffffff?text=2";
    const image3Src = this.getAttribute('image3-src') || "https://placehold.it/50x50/0000ff/ffffff?text=3";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        .wiggle-image {
          animation: wiggle 2s ease-in-out infinite;
          transform-origin: center;
        }
      </style>
      <div class="floating-elements">
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="circleTrack" fill="none" stroke="lightgray" stroke-width="2" d="M 50,200 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
          </defs>
          <image class="wiggle-image" href="${image1Src}" x="325" y="175" width="50" height="50" />
          <image class="wiggle-image" style="animation-delay: -0.5s;" href="${image2Src}" x="100" y="305" width="50" height="50" />
          <image class="wiggle-image" style="animation-delay: -1s;" href="${image3Src}" x="100" y="45" width="50" height="50" />
        </svg>
      </div>
    `;
  }
}

customElements.define('svg-animation', SvgAnimation);
