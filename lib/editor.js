class DragBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Initialize variables for dragging and resizing
    this.isDragging = false;
    this.isResizing = false;
    this.currentX = 0;
    this.currentY = 0;
    this.initialX = 0;
    this.initialY = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.currentWidth = 0;
    this.currentHeight = 0;
    this.resizeHandle = null;
    
    // Define available classes
    this.availableClasses = ['default', 'card1', 'card2', 'card3', 'card4'];
    this.zIndexLevels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    
    // Bind methods
    this.dragStart = this.dragStart.bind(this);
    this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleZIndexChange = this.handleZIndexChange.bind(this);
    this.startResize = this.startResize.bind(this);
    this.resize = this.resize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: absolute;
        background-color: white;
        padding: 10px;
        cursor: move;
        min-width: 100px;
        min-height: 24px;
        overflow: visible;
      }
      
      :host(:hover) {
        border: 1px solid rgba(0,0,0,0.2);
      }
      
      
      ::slotted img {
        width: 100%;
        pointer-events: none;
        
      }
      
      :host([editing]) {
        border: 2px dashed #000;
      }
      
      .content-wrapper {
        width: 100%;
        height: 100%;
      }

      ::slotted(*[contenteditable="true"]) {
        cursor: text;
        outline: none;
      }
      
      .controls {
        display: none;
        position: absolute;
        top: -32px;
        left: 0;
        background: #000;
        color: #fff;
        border-radius: 4px 4px 0px 0px;
        padding: 5px;
        gap: 8px;
        z-index: 1000;
      }
      
      :host([editing]) .controls {
        display: flex;
        align-items: center;
      }
      
      .controls select {
        padding: 2px 4px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 12px;
      }
      
      .controls label {
        font-size: 8px;
        color: #fff;
        font-family: monospace;
      }

      .resize-handle {
        position: absolute;
        background: transparent;
        width: 10px;
        height: 10px;
        z-index: 2;
      }

      .resize-handle:hover {
        background: black;
        border-radius: 100%;
        overflow:hidden;
      }

      .resize-handle.nw { top: -5px; left: -5px; cursor: nw-resize; }
      .resize-handle.n  { top: -5px; left: 50%; transform: translateX(-50%); cursor: n-resize; }
      .resize-handle.ne { top: -5px; right: -5px; cursor: ne-resize; }
      .resize-handle.w  { top: 50%; left: -5px; transform: translateY(-50%); cursor: w-resize; }
      .resize-handle.e  { top: 50%; right: -5px; transform: translateY(-50%); cursor: e-resize; }
      .resize-handle.sw { bottom: -5px; left: -5px; cursor: sw-resize; }
      .resize-handle.s  { bottom: -5px; left: 50%; transform: translateX(-50%); cursor: s-resize; }
      .resize-handle.se { bottom: -5px; right: -5px; cursor: se-resize; }
    `;

    // Create wrapper for slot content
    const wrapper = document.createElement('div');
    wrapper.className = 'content-wrapper';
    const slot = document.createElement('slot');
    wrapper.appendChild(slot);

    // Create resize handles
    //FIXME w has a bug
    const positions = [ 'e', 'sw', 's', 'se'];
    positions.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle ${pos}`;
      handle.dataset.handle = pos;
      handle.addEventListener('mousedown', this.startResize);
      wrapper.appendChild(handle);
    });

    // Create controls
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    // Class selector
    const classLabel = document.createElement('label');
    classLabel.textContent = 'Style: ';
    const classSelect = document.createElement('select');
    classSelect.innerHTML = `
      ${this.availableClasses.map(a => {
        return `<option value="${a}">${a}</option>`
      })}
    `;
    classSelect.addEventListener('change', this.handleClassChange);
    
    // Z-index selector
    const zIndexLabel = document.createElement('label');
    zIndexLabel.textContent = 'Layer: ';
    const zIndexSelect = document.createElement('select');
    zIndexSelect.innerHTML = this.zIndexLevels
      .map(z => `<option value="${z}">${z}</option>`)
      .join('');
    zIndexSelect.addEventListener('change', this.handleZIndexChange);
    
    controls.appendChild(classLabel);
    controls.appendChild(classSelect);
    controls.appendChild(zIndexLabel);
    controls.appendChild(zIndexSelect);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(controls);
    this.shadowRoot.appendChild(wrapper);

    // Add event listeners
    this.addEventListener('mousedown', this.dragStart);
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.dragEnd);
    document.addEventListener('mouseup', this.stopResize);
    this.addEventListener('dblclick', this.handleDoubleClick);

    // Set initial position if attributes exist
    if (this.hasAttribute('x')) {
      this.xOffset = parseInt(this.getAttribute('x'));
      this.currentX = this.xOffset;
    }
    if (this.hasAttribute('y')) {
      this.yOffset = parseInt(this.getAttribute('y'));
      this.currentY = this.yOffset;
    }
    
    this.updatePosition();
  }

  startResize(e) {
    if (this.hasAttribute('editing')) return;
    
    e.stopPropagation();
    this.isResizing = true;
    this.resizeHandle = e.target.dataset.handle;
    this.initialX = e.clientX;
    this.initialY = e.clientY;
    this.currentWidth = this.offsetWidth;
    this.currentHeight = this.offsetHeight;
  }

  resize(e) {
    if (!this.isResizing) return;
    
    e.preventDefault();
    
    const dx = e.clientX - this.initialX;
    const dy = e.clientY - this.initialY;
    
    const handle = this.resizeHandle;
    
    if (handle.includes('e')) {
      this.style.width = `${this.currentWidth + dx}px`;
    }
    if (handle.includes('w')) {
      this.style.width = `${this.currentWidth - dx}px`;
      this.xOffset += dx;
      this.updatePosition();
    }
    if (handle.includes('s')) {
      this.style.height = `${this.currentHeight + dy}px`;
    }
    if (handle.includes('n')) {
      this.style.height = `${this.currentHeight - dy}px`;
      this.yOffset += dy;
      this.updatePosition();
    }
  }

  stopResize() {
    this.isResizing = false;
    this.resizeHandle = null;
    this.setAttribute('height', this.style.height);
    this.setAttribute('width', this.style.width);
  }
  

  handleClassChange(e) {
    // Remove existing style classes
    this.availableClasses.forEach(className => {
      this.classList.remove(className);
    });
    
    // Add new class if not default
    if (e.target.value !== 'default') {
      this.classList.add(e.target.value);
    }
  }

  handleZIndexChange(e) {
    this.style.zIndex = e.target.value;
  }

 disconnectedCallback() {
    this.removeEventListener('mousedown', this.dragStart);
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.dragEnd);
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.stopResize);
    this.removeEventListener('dblclick', this.handleDoubleClick);
  }

  handleDoubleClick(e) {
    // Get all child elements
    const children = Array.from(this.children);
    
    if (this.hasAttribute('editing')) {
      // Exit edit mode
      this.removeAttribute('editing');
      children.forEach(child => {
        child.contentEditable = 'false';
        child.style.cursor = 'inherit';
      });
    } else {
      // Enter edit mode
      this.setAttribute('editing', '');
      children.forEach(child => {
        child.contentEditable = 'true';
        child.style.cursor = 'text';
      });
      
      // Focus the first child
      if (children.length > 0) {
        children[0].focus();
      }
    }
  }

  dragStart(e) {
    // Don't start drag if we're editing
    if (this.hasAttribute('editing')) {
      return;
    }

    const rect = this.getBoundingClientRect();
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (e.target === this) {
      this.isDragging = true;
    }
  }

  drag(e) {
    if (this.isDragging) {
      e.preventDefault();
      
      const currentX = e.clientX - this.initialX;
      const currentY = e.clientY - this.initialY;

      this.xOffset = currentX;
      this.yOffset = currentY;
      
      this.updatePosition();
    }
  }

  dragEnd(e) {
    this.initialX = this.currentX;
    this.initialY = this.currentY;
    this.isDragging = false;

    // Update attributes to store position
    this.setAttribute('x', this.xOffset);
    this.setAttribute('y', this.yOffset);
  }

  updatePosition() {
    const safeY = this.yOffset < 0 ? 0 : this.yOffset;
    const safeX = this.xOffset < 0 ? 0 : this.xOffset;
    this.style.transform = `translate3d(${safeX}px, ${safeY}px, 0)`;
  }

  static get observedAttributes() {
    return ['x', 'y', 'editing'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'x') {
        this.xOffset = parseInt(newValue);
        this.currentX = this.xOffset;
      }
      if (name === 'y') {
        this.yOffset = parseInt(newValue);
        this.currentY = this.yOffset;
      }
      this.updatePosition();
    }
  }
}

// Register the web component
customElements.define('drag-box', DragBox);