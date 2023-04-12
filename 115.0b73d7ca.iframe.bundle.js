"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[115],{"./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js");let bytes=[0],byteIndex=0;function value(){return(()=>{const result=bytes[byteIndex];return byteIndex=(byteIndex+1)%bytes.length,result})()/256}function createColor(lightness){return{h:Math.floor(360*value()),s:60*value()+40,l:lightness||(100*value()+25*(value()+value()+value()+value()))/2}}function encodeColor({h,s,l}){return`hsl(${h}, ${s}%, ${l}%)`}function drawTriangle(cc,radius,center){const a1=2*value()*Math.PI,dx1=radius*Math.cos(a1),dy1=radius*Math.sin(a1),x1=center.x+dx1,y1=center.x+dy1,a2=a1+2*Math.PI*.3,dx2=radius*Math.cos(a2),dy2=radius*Math.sin(a2),x2=center.x+dx2,y2=center.x+dy2,a3=a2+2*Math.PI*.3,dx3=radius*Math.cos(a3),dy3=radius*Math.sin(a3),x3=center.x+dx3,y3=center.x+dy3;cc.beginPath(),cc.moveTo(x1,y1),cc.lineTo(x2,y2),cc.lineTo(x3,y3),cc.fill()}function buildOpts(opts){const hash=opts.hash||[0];return function setBytes(hash){bytes=132===hash[0]&&32===hash[1]&&36===hash[2]?hash.slice(3):hash||[],byteIndex=0}(hash),{backgroundColor:opts.backgroundColor||encodeColor(createColor()),hash,size:opts.size||32}}var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),directive=__webpack_require__("./node_modules/lit-html/directive.js"),o=(0,directive.XM)(class extends directive.Xe{constructor(t){var i;if(super(t),t.type!==directive.pX.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,_ref){var r,o,[s]=_ref;if(void 0===this.nt){for(var _t in this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t)))),s)s[_t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(_t))&&this.nt.add(_t);return this.render(s)}var e=i.element.classList;for(var _t2 in this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t))})),s){var _i=!!s[_t2];_i===this.nt.has(_t2)||(null===(o=this.st)||void 0===o?void 0:o.has(_t2))||(_i?(e.add(_t2),this.nt.add(_t2)):(e.remove(_t2),this.nt.delete(_t2)))}return lit_html.Jb}}),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),holo_hash_property=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/holo-hash-property.js")),__decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let HoloIdenticon=class HoloIdenticon extends lit.oi{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout((()=>{this._tooltip.hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3))}get strHash(){return(0,lib.E6)(this.hash)}updated(changedValues){super.updated(changedValues),(changedValues.has("hash")&&changedValues.get("hash")?.toString()!==this.hash?.toString()||changedValues.has("size")||changedValues.has("value"))&&function renderIdenticon(opts,canvas){if(opts.hash&&!(opts.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");opts=buildOpts(opts||{});const{size,backgroundColor}=opts;canvas.width=canvas.height=size;const cc=canvas.getContext("2d");if(!cc)return;cc.fillStyle=backgroundColor,cc.fillRect(0,0,canvas.width,canvas.height);const numShapes=value()<.5?3:4,shapes=Array.apply(null,Array(numShapes)).map(((_,i)=>{const lightness=0===i?5+25*value():1===i?70+25*value():null;return{x:value()*size,y:value()*size,radius:5+value()*size*.25,type:Math.floor(3*value()),color:encodeColor(createColor(lightness))}})).sort(((a,b)=>a.radius>b.radius?-1:1));for(let i=0;i<numShapes;i++){const shape=shapes[i],{x,y,radius,type,color}=shape;switch(cc.fillStyle=color,type){case 0:cc.beginPath(),cc.arc(x,y,radius,0,2*Math.PI),cc.fill();break;case 1:cc.fillRect(x,y,2*radius,2*radius);break;case 2:drawTriangle(cc,2*radius,{x,y});break;default:throw new Error("shape is greater than 2, this should never happen")}}return canvas}({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return lit.dy` <canvas
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
    `}};__decorate([(0,decorators.Cb)((0,holo_hash_property.u)("hash"))],HoloIdenticon.prototype,"hash",void 0),__decorate([(0,decorators.Cb)({type:Number})],HoloIdenticon.prototype,"size",void 0),__decorate([(0,decorators.Cb)({type:String})],HoloIdenticon.prototype,"shape",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-tooltip"})],HoloIdenticon.prototype,"disableTooltip",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-copy"})],HoloIdenticon.prototype,"disableCopy",void 0),__decorate([(0,decorators.IO)("#canvas")],HoloIdenticon.prototype,"_canvas",void 0),__decorate([(0,decorators.IO)("#tooltip")],HoloIdenticon.prototype,"_tooltip",void 0),__decorate([(0,decorators.SB)()],HoloIdenticon.prototype,"justCopiedHash",void 0),HoloIdenticon=__decorate([(0,lit_localize.kI)(),(0,decorators.Mo)("holo-identicon")],HoloIdenticon)},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KRP3ULQL.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_UL4X2GHI_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UL4X2GHI.js"),_chunk_IJY6XTKC_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js"),_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js"),_chunk_ORW72H2K_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlIconButton=class extends _chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.P{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(event){this.disabled&&(event.preventDefault(),event.stopPropagation())}click(){this.button.click()}focus(options){this.button.focus(options)}blur(){this.button.blur()}render(){const isLink=!!this.href,tag=isLink?_chunk_IJY6XTKC_js__WEBPACK_IMPORTED_MODULE_1__.i`a`:_chunk_IJY6XTKC_js__WEBPACK_IMPORTED_MODULE_1__.i`button`;return _chunk_IJY6XTKC_js__WEBPACK_IMPORTED_MODULE_1__.n`
      <${tag}
        part="base"
        class=${(0,_chunk_ORW72H2K_js__WEBPACK_IMPORTED_MODULE_3__.o)({"icon-button":!0,"icon-button--disabled":!isLink&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?void 0:this.disabled)}
        type=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?void 0:"button")}
        href=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?this.href:void 0)}
        target=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?this.target:void 0)}
        download=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?this.download:void 0)}
        rel=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink&&this.target?"noreferrer noopener":void 0)}
        role=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(isLink?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(this.name)}
          library=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(this.library)}
          src=${(0,_chunk_V47DPYLL_js__WEBPACK_IMPORTED_MODULE_2__.l)(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `}};SlIconButton.styles=_chunk_UL4X2GHI_js__WEBPACK_IMPORTED_MODULE_0__.Z,(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.i)(".icon-button")],SlIconButton.prototype,"button",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.t)()],SlIconButton.prototype,"hasFocus",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"name",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"library",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"src",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"href",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"target",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"download",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)()],SlIconButton.prototype,"label",2),(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e2)({type:Boolean,reflect:!0})],SlIconButton.prototype,"disabled",2),SlIconButton=(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_5__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_4__.e)("sl-icon-button")],SlIconButton)},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UL4X2GHI.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>icon_button_styles_default});var _chunk_BCEYT3RT_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),icon_button_styles_default=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js").i`
  ${_chunk_BCEYT3RT_js__WEBPACK_IMPORTED_MODULE_0__.N}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`},"./node_modules/@shoelace-style/shoelace/dist/components/alert/alert.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_OAQT3AUQ=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.OAQT3AUQ.js"),chunk_B4BZKR24=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js"),chunk_65AZ2BGN=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.65AZ2BGN.js"),chunk_3IYPB6RR=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_Q3I3TA2Y=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),alert_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`,chunk_VQ3XOPCT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),toastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),SlAlert=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.hasSlotController=new chunk_3IYPB6RR.r(this,"icon","suffix"),this.localize=new chunk_Q3I3TA2Y.V(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await(0,chunk_65AZ2BGN.U_)(this.base),this.base.hidden=!1;const{keyframes,options}=(0,chunk_OAQT3AUQ.O8)(this,"alert.show",{dir:this.localize.dir()});await(0,chunk_65AZ2BGN.nv)(this.base,keyframes,options),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await(0,chunk_65AZ2BGN.U_)(this.base);const{keyframes,options}=(0,chunk_OAQT3AUQ.O8)(this,"alert.hide",{dir:this.localize.dir()});await(0,chunk_65AZ2BGN.nv)(this.base,keyframes,options),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,(0,chunk_B4BZKR24.m)(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,(0,chunk_B4BZKR24.m)(this,"sl-after-hide")}async toast(){return new Promise((resolve=>{null===toastStack.parentElement&&document.body.append(toastStack),toastStack.appendChild(this),requestAnimationFrame((()=>{this.clientWidth,this.show()})),this.addEventListener("sl-after-hide",(()=>{toastStack.removeChild(this),resolve(),null===toastStack.querySelector("sl-alert")&&toastStack.remove()}),{once:!0})}))}render(){return chunk_DUT32TWM.y`
      <div
        part="base"
        class=${(0,chunk_ORW72H2K.o)({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <slot name="icon" part="icon" class="alert__icon"></slot>

        <slot part="message" class="alert__message" aria-live="polite"></slot>

        ${this.closable?chunk_DUT32TWM.y`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};SlAlert.styles=alert_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)('[part~="base"]')],SlAlert.prototype,"base",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlAlert.prototype,"open",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlAlert.prototype,"closable",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlAlert.prototype,"variant",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Number})],SlAlert.prototype,"duration",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("open",{waitUntilFirstUpdate:!0})],SlAlert.prototype,"handleOpenChange",1),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("duration")],SlAlert.prototype,"handleDurationChange",1),SlAlert=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-alert")],SlAlert),(0,chunk_OAQT3AUQ.jx)("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),(0,chunk_OAQT3AUQ.jx)("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KRP3ULQL.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UL4X2GHI.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GHOMGFX6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P52GZVKG.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RPB53XXV.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/card/card.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),card_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,chunk_3IYPB6RR=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlCard=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.hasSlotController=new chunk_3IYPB6RR.r(this,"footer","header","image")}render(){return chunk_DUT32TWM.y`
      <div
        part="base"
        class=${(0,chunk_ORW72H2K.o)({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};SlCard.styles=card_styles_default,SlCard=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-card")],SlCard);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/icon-button/icon-button.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KRP3ULQL.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UL4X2GHI.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GHOMGFX6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P52GZVKG.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RPB53XXV.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js")},"./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),skeleton_styles_default=chunk_DUT32TWM.i`
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
    `}};SlSkeleton.styles=skeleton_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlSkeleton.prototype,"effect",2),SlSkeleton=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-skeleton")],SlSkeleton);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DBJ5ZVU.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js")},"./node_modules/lit-html/directives/style-map.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>i});var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit-html/directive.js"),i=(0,_directive_js__WEBPACK_IMPORTED_MODULE_1__.XM)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Xe{constructor(t){var e;if(super(t),t.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.pX.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{var s=t[r];return null==s?e:e+"".concat(r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase(),":").concat(s,";")}),"")}update(e,_ref){var[r]=_ref,{style:s}=e.element;if(void 0===this.vt){for(var _t in this.vt=new Set,r)this.vt.add(_t);return this.render(r)}for(var _t2 in this.vt.forEach((t=>{null==r[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")})),r){var _e=r[_t2];null!=_e&&(this.vt.add(_t2),_t2.includes("-")?s.setProperty(_t2,_e):s[_t2]=_e)}return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.Jb}})}}]);
//# sourceMappingURL=115.0b73d7ca.iframe.bundle.js.map