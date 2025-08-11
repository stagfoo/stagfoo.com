class SvgAnimation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
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
      </style>
      <div class="floating-elements">
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <style>
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
          <defs>
            <path id="circleTrack" fill="none" stroke="lightgray" stroke-width="2"
              d="M 50,200 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
          </defs>

          <image class="wiggle-image" href="https://raw.githubusercontent.com/google/material-design-icons/master/png/social/stroller/materialicons/48dp/1x/baseline_stroller_black_48dp.png" x="325" y="175" width="50" height="50" />
          <image class="wiggle-image" style="animation-delay: -0.5s;" href="https://raw.githubusercontent.com/google/material-design-icons/master/png/social/skateboarding/materialicons/48dp/1x/baseline_skateboarding_black_48dp.png" x="100" y="305" width="50" height="50" />
          <image class="wiggle-image" style="animation-delay: -1s;" href="https://raw.githubusercontent.com/google/material-design-icons/master/png/maps/pedal_bike/materialicons/48dp/1x/baseline_pedal_bike_black_48dp.png" x="100" y="45" width="50" height="50" />

        </svg>
      </div>
    `;
  }
}

customElements.define('svg-animation', SvgAnimation);
