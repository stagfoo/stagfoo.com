class IconPopover extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['icon'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const icon = this.getAttribute('icon') || '❓';
    const isUrl = icon.includes('/') || icon.endsWith('.png') || icon.endsWith('.jpg') || icon.endsWith('.webp') || icon.endsWith('.svg');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }
        .icon {
          cursor: pointer;
          font-size: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon img {
          width: 42px;
          height: 42px;
        }
        .popover {
          display: none;
          position: absolute;
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 10;
          width: 200px;
          margin-right: 10px;
          font-size: 14px;
        }
        .popover::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent #ccc;
        }
        :host(:hover) .popover {
          display: block;
        }
      </style>
      <span class="icon">
        ${isUrl ? `<img src="${icon}" alt="icon">` : icon}
      </span>
      <div class="popover">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('icon-popover', IconPopover);
