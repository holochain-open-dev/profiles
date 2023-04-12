"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[332],{"./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js");let bytes=[0],byteIndex=0;function value(){return(()=>{const result=bytes[byteIndex];return byteIndex=(byteIndex+1)%bytes.length,result})()/256}function createColor(lightness){return{h:Math.floor(360*value()),s:60*value()+40,l:lightness||(100*value()+25*(value()+value()+value()+value()))/2}}function encodeColor({h,s,l}){return`hsl(${h}, ${s}%, ${l}%)`}function drawTriangle(cc,radius,center){const a1=2*value()*Math.PI,dx1=radius*Math.cos(a1),dy1=radius*Math.sin(a1),x1=center.x+dx1,y1=center.x+dy1,a2=a1+2*Math.PI*.3,dx2=radius*Math.cos(a2),dy2=radius*Math.sin(a2),x2=center.x+dx2,y2=center.x+dy2,a3=a2+2*Math.PI*.3,dx3=radius*Math.cos(a3),dy3=radius*Math.sin(a3),x3=center.x+dx3,y3=center.x+dy3;cc.beginPath(),cc.moveTo(x1,y1),cc.lineTo(x2,y2),cc.lineTo(x3,y3),cc.fill()}function buildOpts(opts){const hash=opts.hash||[0];return function setBytes(hash){bytes=132===hash[0]&&32===hash[1]&&36===hash[2]?hash.slice(3):hash||[],byteIndex=0}(hash),{backgroundColor:opts.backgroundColor||encodeColor(createColor()),hash,size:opts.size||32}}var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),directive=__webpack_require__("./node_modules/lit-html/directive.js"),o=(0,directive.XM)(class extends directive.Xe{constructor(t){var i;if(super(t),t.type!==directive.pX.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,_ref){var r,o,[s]=_ref;if(void 0===this.nt){for(var _t in this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t)))),s)s[_t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(_t))&&this.nt.add(_t);return this.render(s)}var e=i.element.classList;for(var _t2 in this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t))})),s){var _i=!!s[_t2];_i===this.nt.has(_t2)||(null===(o=this.st)||void 0===o?void 0:o.has(_t2))||(_i?(e.add(_t2),this.nt.add(_t2)):(e.remove(_t2),this.nt.delete(_t2)))}return lit_html.Jb}}),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),holo_hash_property=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/holo-hash-property.js")),__decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let HoloIdenticon=class HoloIdenticon extends lit.oi{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout((()=>{this._tooltip.hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3))}get strHash(){return(0,lib.E6)(this.hash)}updated(changedValues){super.updated(changedValues),(changedValues.has("hash")&&changedValues.get("hash")?.toString()!==this.hash?.toString()||changedValues.has("size")||changedValues.has("value"))&&function renderIdenticon(opts,canvas){if(opts.hash&&!(opts.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");opts=buildOpts(opts||{});const{size,backgroundColor}=opts;canvas.width=canvas.height=size;const cc=canvas.getContext("2d");if(!cc)return;cc.fillStyle=backgroundColor,cc.fillRect(0,0,canvas.width,canvas.height);const numShapes=value()<.5?3:4,shapes=Array.apply(null,Array(numShapes)).map(((_,i)=>{const lightness=0===i?5+25*value():1===i?70+25*value():null;return{x:value()*size,y:value()*size,radius:5+value()*size*.25,type:Math.floor(3*value()),color:encodeColor(createColor(lightness))}})).sort(((a,b)=>a.radius>b.radius?-1:1));for(let i=0;i<numShapes;i++){const shape=shapes[i],{x,y,radius,type,color}=shape;switch(cc.fillStyle=color,type){case 0:cc.beginPath(),cc.arc(x,y,radius,0,2*Math.PI),cc.fill();break;case 1:cc.fillRect(x,y,2*radius,2*radius);break;case 2:drawTriangle(cc,2*radius,{x,y});break;default:throw new Error("shape is greater than 2, this should never happen")}}return canvas}({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return lit.dy` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${o({square:"square"===this.shape,circle:"circle"===this.shape})}
    ></canvas>`}render(){return lit.dy`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?(0,lit_localize.WI)("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return lit.iv`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};__decorate([(0,decorators.Cb)((0,holo_hash_property.u)("hash"))],HoloIdenticon.prototype,"hash",void 0),__decorate([(0,decorators.Cb)({type:Number})],HoloIdenticon.prototype,"size",void 0),__decorate([(0,decorators.Cb)({type:String})],HoloIdenticon.prototype,"shape",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-tooltip"})],HoloIdenticon.prototype,"disableTooltip",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-copy"})],HoloIdenticon.prototype,"disableCopy",void 0),__decorate([(0,decorators.IO)("#canvas")],HoloIdenticon.prototype,"_canvas",void 0),__decorate([(0,decorators.IO)("#tooltip")],HoloIdenticon.prototype,"_tooltip",void 0),__decorate([(0,decorators.SB)()],HoloIdenticon.prototype,"justCopiedHash",void 0),HoloIdenticon=__decorate([(0,lit_localize.kI)(),(0,decorators.Mo)("holo-identicon")],HoloIdenticon)},"./node_modules/@shoelace-style/shoelace/dist/components/dropdown/dropdown.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),dropdown_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;function isTabbable(el){const tag=el.tagName.toLowerCase();return"-1"!==el.getAttribute("tabindex")&&(!el.hasAttribute("disabled")&&((!el.hasAttribute("aria-disabled")||"false"===el.getAttribute("aria-disabled"))&&(!("input"===tag&&"radio"===el.getAttribute("type")&&!el.hasAttribute("checked"))&&(null!==el.offsetParent&&("hidden"!==window.getComputedStyle(el).visibility&&(!("audio"!==tag&&"video"!==tag||!el.hasAttribute("controls"))||(!!el.hasAttribute("tabindex")||(!(!el.hasAttribute("contenteditable")||"false"===el.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(tag)))))))))}var chunk_OAQT3AUQ=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OAQT3AUQ.js"),chunk_B4BZKR24=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js"),chunk_65AZ2BGN=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.65AZ2BGN.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_Q3I3TA2Y=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),chunk_VQ3XOPCT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlDropdown=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.localize=new chunk_Q3I3TA2Y.V(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const trigger=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==trigger?void 0:trigger.focus)&&trigger.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find((el=>"sl-menu"===el.tagName.toLowerCase()))}handleKeyDown(event){this.open&&"Escape"===event.key&&(event.stopPropagation(),this.hide(),this.focusOnTrigger())}handleDocumentKeyDown(event){var _a;if("Escape"===event.key&&this.open)return event.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===event.key){if(this.open&&"sl-menu-item"===(null==(_a=document.activeElement)?void 0:_a.tagName.toLowerCase()))return event.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var _a2,_b,_c;const activeElement=(null==(_a2=this.containingElement)?void 0:_a2.getRootNode())instanceof ShadowRoot?null==(_c=null==(_b=document.activeElement)?void 0:_b.shadowRoot)?void 0:_c.activeElement:document.activeElement;this.containingElement&&(null==activeElement?void 0:activeElement.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(event){const path=event.composedPath();this.containingElement&&!path.includes(this.containingElement)&&this.hide()}handlePanelSelect(event){const target=event.target;this.stayOpenOnSelect||"sl-menu"!==target.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}handleTriggerKeyDown(event){if([" ","Enter"].includes(event.key))return event.preventDefault(),void this.handleTriggerClick();const menu=this.getMenu();if(menu){const menuItems=menu.getAllItems(),firstMenuItem=menuItems[0],lastMenuItem=menuItems[menuItems.length-1];["ArrowDown","ArrowUp","Home","End"].includes(event.key)&&(event.preventDefault(),this.open||this.show(),menuItems.length>0&&this.updateComplete.then((()=>{"ArrowDown"!==event.key&&"Home"!==event.key||(menu.setCurrentItem(firstMenuItem),firstMenuItem.focus()),"ArrowUp"!==event.key&&"End"!==event.key||(menu.setCurrentItem(lastMenuItem),lastMenuItem.focus())})))}}handleTriggerKeyUp(event){" "===event.key&&event.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const accessibleTrigger=this.trigger.assignedElements({flatten:!0}).find((el=>function getTabbableBoundary(root){var _a,_b;const allElements=[];return function walk(el){el instanceof HTMLElement&&(allElements.push(el),null!==el.shadowRoot&&"open"===el.shadowRoot.mode&&walk(el.shadowRoot)),[...el.children].forEach((e=>walk(e)))}(root),{start:null!=(_a=allElements.find((el=>isTabbable(el))))?_a:null,end:null!=(_b=allElements.reverse().find((el=>isTabbable(el))))?_b:null}}(el).start));let target;if(accessibleTrigger){switch(accessibleTrigger.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":target=accessibleTrigger.button;break;default:target=accessibleTrigger}target.setAttribute("aria-haspopup","true"),target.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,(0,chunk_B4BZKR24.m)(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,(0,chunk_B4BZKR24.m)(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){this.panel.addEventListener("sl-select",this.handlePanelSelect),this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await(0,chunk_65AZ2BGN.U_)(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes,options}=(0,chunk_OAQT3AUQ.O8)(this,"dropdown.show",{dir:this.localize.dir()});await(0,chunk_65AZ2BGN.nv)(this.popup.popup,keyframes,options),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await(0,chunk_65AZ2BGN.U_)(this);const{keyframes,options}=(0,chunk_OAQT3AUQ.O8)(this,"dropdown.hide",{dir:this.localize.dir()});await(0,chunk_65AZ2BGN.nv)(this.popup.popup,keyframes,options),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return chunk_DUT32TWM.y`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${(0,chunk_ORW72H2K.o)({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <slot
          part="panel"
          class="dropdown__panel"
          aria-hidden=${this.open?"false":"true"}
          aria-labelledby="dropdown"
        ></slot>
      </sl-popup>
    `}};SlDropdown.styles=dropdown_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".dropdown")],SlDropdown.prototype,"popup",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".dropdown__trigger")],SlDropdown.prototype,"trigger",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".dropdown__panel")],SlDropdown.prototype,"panel",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlDropdown.prototype,"open",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlDropdown.prototype,"placement",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlDropdown.prototype,"disabled",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],SlDropdown.prototype,"stayOpenOnSelect",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:!1})],SlDropdown.prototype,"containingElement",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Number})],SlDropdown.prototype,"distance",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Number})],SlDropdown.prototype,"skidding",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean})],SlDropdown.prototype,"hoist",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("open",{waitUntilFirstUpdate:!0})],SlDropdown.prototype,"handleOpenChange",1),SlDropdown=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-dropdown")],SlDropdown),(0,chunk_OAQT3AUQ.jx)("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),(0,chunk_OAQT3AUQ.jx)("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QWGZ4US6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Z7MHAEL3.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/menu-item/menu-item.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),menu_item_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,chunk_3IYPB6RR=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_VQ3XOPCT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlMenuItem=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.type="normal",this.checked=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.handleHostClick=this.handleHostClick.bind(this),this.addEventListener("click",this.handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick)}handleDefaultSlotChange(){const textLabel=this.getTextLabel();void 0!==this.cachedTextLabel?textLabel!==this.cachedTextLabel&&(this.cachedTextLabel=textLabel,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=textLabel}handleHostClick(event){this.disabled&&(event.preventDefault(),event.stopImmediatePropagation())}handleCheckedChange(){if(this.checked&&"checkbox"!==this.type)return this.checked=!1,void console.error('The checked attribute can only be used on menu items with type="checkbox"',this);"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return(0,chunk_3IYPB6RR.F)(this.defaultSlot)}render(){return chunk_DUT32TWM.y`
      <div
        part="base"
        class=${(0,chunk_ORW72H2K.o)({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `}};SlMenuItem.styles=menu_item_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)("slot:not([name])")],SlMenuItem.prototype,"defaultSlot",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".menu-item")],SlMenuItem.prototype,"menuItem",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlMenuItem.prototype,"type",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlMenuItem.prototype,"checked",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlMenuItem.prototype,"value",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlMenuItem.prototype,"disabled",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("checked")],SlMenuItem.prototype,"handleCheckedChange",1),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("disabled")],SlMenuItem.prototype,"handleDisabledChange",1),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("type")],SlMenuItem.prototype,"handleTypeChange",1),SlMenuItem=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-menu-item")],SlMenuItem);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GHOMGFX6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P52GZVKG.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RPB53XXV.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/menu/menu.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),menu_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlMenu=class extends chunk_ROLL4627.P{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(event){const item=event.target.closest("sl-menu-item");!item||item.disabled||item.inert||("checkbox"===item.type&&(item.checked=!item.checked),this.emit("sl-select",{detail:{item}}))}handleKeyDown(event){if("Enter"===event.key){const item=this.getCurrentItem();event.preventDefault(),null==item||item.click()}if(" "===event.key&&event.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(event.key)){const items=this.getAllItems(),activeItem=this.getCurrentItem();let index=activeItem?items.indexOf(activeItem):0;items.length>0&&(event.preventDefault(),"ArrowDown"===event.key?index++:"ArrowUp"===event.key?index--:"Home"===event.key?index=0:"End"===event.key&&(index=items.length-1),index<0&&(index=items.length-1),index>items.length-1&&(index=0),this.setCurrentItem(items[index]),items[index].focus())}}handleMouseDown(event){const target=event.target;this.isMenuItem(target)&&this.setCurrentItem(target)}handleSlotChange(){const items=this.getAllItems();items.length>0&&this.setCurrentItem(items[0])}isMenuItem(item){var _a;return"sl-menu-item"===item.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(_a=item.getAttribute("role"))?_a:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((el=>!(el.inert||!this.isMenuItem(el))))}getCurrentItem(){return this.getAllItems().find((i2=>"0"===i2.getAttribute("tabindex")))}setCurrentItem(item){this.getAllItems().forEach((i2=>{i2.setAttribute("tabindex",i2===item?"0":"-1")}))}render(){return chunk_DUT32TWM.y`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};SlMenu.styles=menu_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)("slot")],SlMenu.prototype,"defaultSlot",2),SlMenu=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-menu")],SlMenu)},"./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),skeleton_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlSkeleton=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.effect="none"}render(){return chunk_DUT32TWM.y`
      <div
        part="base"
        class=${(0,chunk_ORW72H2K.o)({skeleton:!0,"skeleton--pulse":"pulse"===this.effect,"skeleton--sheen":"sheen"===this.effect})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};SlSkeleton.styles=skeleton_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlSkeleton.prototype,"effect",2),SlSkeleton=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-skeleton")],SlSkeleton);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/lit-html/directives/style-map.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>i});var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit-html/directive.js"),i=(0,_directive_js__WEBPACK_IMPORTED_MODULE_1__.XM)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Xe{constructor(t){var e;if(super(t),t.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.pX.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{var s=t[r];return null==s?e:e+"".concat(r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase(),":").concat(s,";")}),"")}update(e,_ref){var[r]=_ref,{style:s}=e.element;if(void 0===this.vt){for(var _t in this.vt=new Set,r)this.vt.add(_t);return this.render(r)}for(var _t2 in this.vt.forEach((t=>{null==r[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")})),r){var _e=r[_t2];null!=_e&&(this.vt.add(_t2),_t2.includes("-")?s.setProperty(_t2,_e):s[_t2]=_e)}return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.Jb}})}}]);
//# sourceMappingURL=332.fa09b37c.iframe.bundle.js.map