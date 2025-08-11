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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }
        .icon {
          cursor: pointer;
          font-size: 18px;
        }
        .popover {
          display: none;
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 10;
          width: 200px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .popover::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #ccc transparent transparent transparent;
        }
        :host(:hover) .popover {
          display: block;
        }
      </style>
      <span class="icon">${icon}</span>
      <div class="popover">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('icon-popover', IconPopover);