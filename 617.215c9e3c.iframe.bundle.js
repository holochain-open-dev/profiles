/*! For license information please see 617.215c9e3c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[617],{"./node_modules/@holochain-open-dev/elements/dist/elements/select-avatar.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),mdi=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/button/button.js"),__webpack_require__("./node_modules/@mdi/js/mdi.js"));class FormFieldController{constructor(host){this.host=host,this.host.addController(this),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this)}hostConnected(){this.form=this.host.closest("form"),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),this.form=void 0)}handleFormData(event){const disabled=this.host.disabled,name=this.host.name,value=this.host.value;!disabled&&name&&void 0!==value&&(Array.isArray(value)?value.map((val=>event.formData.append(name,val))):event.formData.append(name,value))}handleFormSubmit(event){const form=this.form,disabled=this.host.disabled,reportValidity=this.host.reportValidity;!form||form.noValidate||disabled||!reportValidity||this.host.reportValidity()||(event.preventDefault(),event.stopImmediatePropagation())}handleFormReset(_event){this.host.reset()}}var icon=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/icon.js"),shared_styles=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/shared-styles.js"),__decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let SelectAvatar=class SelectAvatar extends lit.oi{constructor(){super(...arguments),this.name="avatar",this.required=!1,this.shape="circle",this.disabled=!1,this._controller=new FormFieldController(this)}reportValidity(){const invalid=!1!==this.required&&!this.value;return invalid&&(this._errorInput.setCustomValidity("Avatar is required"),this._errorInput.reportValidity()),!invalid}reset(){this.value=void 0}onAvatarUploaded(){if(this._avatarFilePicker.files&&this._avatarFilePicker.files[0]){const reader=new FileReader;reader.onload=e=>{const img=new Image;img.crossOrigin="anonymous",img.onload=()=>{this.value=function resizeAndExport(img){let width=img.width,height=img.height;width>height?width>300&&(height*=300/width,width=300):height>300&&(width*=300/height,height=300);const canvas=document.createElement("canvas");return canvas.width=width,canvas.height=height,canvas.getContext("2d").drawImage(img,0,0,width,height),canvas.toDataURL()}(img),this._avatarFilePicker.value=""},img.src=e.target?.result,this.dispatchEvent(new CustomEvent("avatar-selected",{composed:!0,bubbles:!0,detail:{avatar:img.src}}))},reader.readAsDataURL(this._avatarFilePicker.files[0])}}renderAvatar(){return this.value?lit.dy`
        <div
          class="column"
          style="align-items: center; height: 50px"
          @click=${()=>{this.value=void 0}}
        >
          <sl-tooltip .content=${(0,lit_localize.WI)("Clear")}>
            <sl-avatar
              image="${this.value}"
              alt="Avatar"
              .shape=${this.shape}
              initials=""
            ></sl-avatar
          ></sl-tooltip>
        </div>
      `:lit.dy` <div class="column" style="align-items: center;">
        <sl-button
          .disabled=${this.disabled}
          variant="default"
          size="large"
          circle
          @click=${()=>this._avatarFilePicker.click()}
        >
          <sl-icon
            src="${(0,icon.E)(mdi.qX5)}"
            .label=${(0,lit_localize.WI)("Add avatar image")}
          ></sl-icon>
        </sl-button>
      </div>`}render(){return lit.dy`<input
        type="file"
        id="avatar-file-picker"
        style="display: none"
        @change=${this.onAvatarUploaded}
      />
      <div class="column" style="position: relative; align-items: center">
        <input
          id="error-input"
          style="position: absolute; z-index: -1; left: 50%; top: 30px; height: 0; width: 0"
        />
        <span
          style="font-size: var(--sl-input-label-font-size-medium); margin-bottom: 4px"
          >${(0,lit_localize.WI)("Avatar")}${!1!==this.required?" *":""}</span
        >
        ${this.renderAvatar()}
      </div>`}};SelectAvatar.styles=shared_styles.F,__decorate([(0,decorators.Cb)({attribute:"name"})],SelectAvatar.prototype,"name",void 0),__decorate([(0,decorators.Cb)()],SelectAvatar.prototype,"required",void 0),__decorate([(0,decorators.Cb)()],SelectAvatar.prototype,"shape",void 0),__decorate([(0,decorators.Cb)()],SelectAvatar.prototype,"value",void 0),__decorate([(0,decorators.Cb)()],SelectAvatar.prototype,"disabled",void 0),__decorate([(0,decorators.IO)("#avatar-file-picker")],SelectAvatar.prototype,"_avatarFilePicker",void 0),__decorate([(0,decorators.IO)("#error-input")],SelectAvatar.prototype,"_errorInput",void 0),SelectAvatar=__decorate([(0,decorators.Mo)("select-avatar")],SelectAvatar)},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>getTextContent,r:()=>HasSlotController});var HasSlotController=class{constructor(host,...slotNames){this.slotNames=[],(this.host=host).addController(this),this.slotNames=slotNames,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some((node=>{if(node.nodeType===node.TEXT_NODE&&""!==node.textContent.trim())return!0;if(node.nodeType===node.ELEMENT_NODE){const el=node;if("sl-visually-hidden"===el.tagName.toLowerCase())return!1;if(!el.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(name){return null!==this.host.querySelector(`:scope > [slot="${name}"]`)}test(slotName){return"[default]"===slotName?this.hasDefaultSlot():this.hasNamedSlot(slotName)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(event){const slot=event.target;(this.slotNames.includes("[default]")&&!slot.name||slot.name&&this.slotNames.includes(slot.name))&&this.host.requestUpdate()}};function getTextContent(slot){if(!slot)return"";const nodes=slot.assignedNodes({flatten:!0});let text="";return[...nodes].forEach((node=>{node.nodeType===Node.TEXT_NODE&&(text+=node.textContent)})),text}},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DBJ5ZVU.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_TA75SLJE_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js"),_chunk_Q3I3TA2Y_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),_chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlSpinner=class extends _chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_2__.P{constructor(){super(...arguments),this.localize=new _chunk_Q3I3TA2Y_js__WEBPACK_IMPORTED_MODULE_1__.V(this)}render(){return _chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_3__.y`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};SlSpinner.styles=_chunk_TA75SLJE_js__WEBPACK_IMPORTED_MODULE_0__.D,SlSpinner=(0,_chunk_LKA3TPUC_js__WEBPACK_IMPORTED_MODULE_4__.u2)([(0,_chunk_ROLL4627_js__WEBPACK_IMPORTED_MODULE_2__.e)("sl-spinner")],SlSpinner)},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>i,n:()=>n});var _chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},i=(t,...r)=>({_$litStatic$:r.reduce(((r2,e2,l2)=>r2+(t2=>{if(void 0!==t2._$litStatic$)return t2._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(e2)+t[l2+1]),t[0]),r:e}),s=new Map,a=t=>(r,...e2)=>{const o=e2.length;let i2,a2;const n2=[],u2=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a2=e2[$],i2=l(a2));)c+=i2+r[++$],f=!0;u2.push(a2),n2.push(c),$++}if($===o&&n2.push(r[o]),f){const t2=n2.join("$$lit$$");void 0===(r=s.get(t2))&&(n2.raw=n2,s.set(t2,r=n2)),e2=u2}return t(r,...e2)},n=a(_chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_0__.y);a(_chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_0__.w)},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>spinner_styles_default});var _chunk_BCEYT3RT_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),spinner_styles_default=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js").i`
  ${_chunk_BCEYT3RT_js__WEBPACK_IMPORTED_MODULE_0__.N}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>l});var _chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),l=l2=>null!=l2?l2:_chunk_DUT32TWM_js__WEBPACK_IMPORTED_MODULE_0__.b},"./node_modules/@shoelace-style/shoelace/dist/components/button/button.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_AOOF3QW5=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AOOF3QW5.js"),chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),button_styles_default=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js").i`
  ${chunk_BCEYT3RT.N}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,chunk_IJY6XTKC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.IJY6XTKC.js"),chunk_V47DPYLL=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js"),chunk_3IYPB6RR=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_Q3I3TA2Y=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),chunk_VQ3XOPCT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlButton=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.formControlController=new chunk_AOOF3QW5.pY(this,{form:input=>{if(input.hasAttribute("form")){const doc=input.getRootNode(),formId=input.getAttribute("form");return doc.getElementById(formId)}return input.closest("form")},assumeInteractionOn:["click"]}),this.hasSlotController=new chunk_3IYPB6RR.r(this,"[default]","prefix","suffix"),this.localize=new chunk_Q3I3TA2Y.V(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:chunk_AOOF3QW5.o9}get validationMessage(){return this.isButton()?this.button.validationMessage:""}connectedCallback(){super.connectedCallback(),this.handleHostClick=this.handleHostClick.bind(this),this.addEventListener("click",this.handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick)}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleHostClick(event){(this.disabled||this.loading)&&(event.preventDefault(),event.stopImmediatePropagation())}handleInvalid(event){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(event)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(options){this.button.focus(options)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(message){this.isButton()&&(this.button.setCustomValidity(message),this.formControlController.updateValidity())}render(){const isLink=this.isLink(),tag=isLink?chunk_IJY6XTKC.i`a`:chunk_IJY6XTKC.i`button`;return chunk_IJY6XTKC.n`
      <${tag}
        part="base"
        class=${(0,chunk_ORW72H2K.o)({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${(0,chunk_V47DPYLL.l)(isLink?void 0:this.disabled)}
        type=${(0,chunk_V47DPYLL.l)(isLink?void 0:this.type)}
        title=${this.title}
        name=${(0,chunk_V47DPYLL.l)(isLink?void 0:this.name)}
        value=${(0,chunk_V47DPYLL.l)(isLink?void 0:this.value)}
        href=${(0,chunk_V47DPYLL.l)(isLink?this.href:void 0)}
        target=${(0,chunk_V47DPYLL.l)(isLink?this.target:void 0)}
        download=${(0,chunk_V47DPYLL.l)(isLink?this.download:void 0)}
        rel=${(0,chunk_V47DPYLL.l)(isLink?this.rel:void 0)}
        role=${(0,chunk_V47DPYLL.l)(isLink?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?chunk_IJY6XTKC.n` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?chunk_IJY6XTKC.n`<sl-spinner></sl-spinner>`:""}
      </${tag}>
    `}};SlButton.styles=button_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".button")],SlButton.prototype,"button",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.t)()],SlButton.prototype,"hasFocus",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.t)()],SlButton.prototype,"invalid",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"title",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlButton.prototype,"variant",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlButton.prototype,"size",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"caret",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"disabled",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"loading",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"outline",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"pill",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlButton.prototype,"circle",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"type",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"name",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"value",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"href",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"target",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"rel",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"download",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlButton.prototype,"form",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"formaction"})],SlButton.prototype,"formAction",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"formenctype"})],SlButton.prototype,"formEnctype",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"formmethod"})],SlButton.prototype,"formMethod",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"formnovalidate",type:Boolean})],SlButton.prototype,"formNoValidate",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"formtarget"})],SlButton.prototype,"formTarget",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("disabled",{waitUntilFirstUpdate:!0})],SlButton.prototype,"handleDisabledChange",1),SlButton=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-button")],SlButton);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DBJ5ZVU.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GHOMGFX6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P52GZVKG.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RPB53XXV.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/input/input.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),form_control_styles_default=chunk_DUT32TWM.i`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),input_styles_default=chunk_DUT32TWM.i`
  ${chunk_BCEYT3RT.N}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,chunk_UP75L23G=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js"),{I:l}=chunk_DUT32TWM.L,f={},l2=(0,chunk_UP75L23G.e)(class extends chunk_UP75L23G.i{constructor(r){if(super(r),r.type!==chunk_UP75L23G.t.PROPERTY&&r.type!==chunk_UP75L23G.t.ATTRIBUTE&&r.type!==chunk_UP75L23G.t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==r.strings)throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i2,[t2]){if(t2===chunk_DUT32TWM.x||t2===chunk_DUT32TWM.b)return t2;const o=i2.element,l3=i2.name;if(i2.type===chunk_UP75L23G.t.PROPERTY){if(t2===o[l3])return chunk_DUT32TWM.x}else if(i2.type===chunk_UP75L23G.t.BOOLEAN_ATTRIBUTE){if(!!t2===o.hasAttribute(l3))return chunk_DUT32TWM.x}else if(i2.type===chunk_UP75L23G.t.ATTRIBUTE&&o.getAttribute(l3)===t2+"")return chunk_DUT32TWM.x;return((o,l3=f)=>{o._$AH=l3})(i2),t2}}),chunk_AOOF3QW5=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AOOF3QW5.js"),chunk_V47DPYLL=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V47DPYLL.js"),chunk_3IYPB6RR=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3IYPB6RR.js"),chunk_ORW72H2K=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ORW72H2K.js"),chunk_Q3I3TA2Y=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),chunk_VQ3XOPCT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VQ3XOPCT.js"),chunk_ROLL4627=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),chunk_LKA3TPUC=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js"),SlInput=class extends chunk_ROLL4627.P{constructor(){super(...arguments),this.formControlController=new chunk_AOOF3QW5.pY(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new chunk_3IYPB6RR.r(this,"help-text","label"),this.localize=new chunk_Q3I3TA2Y.V(this),this.hasFocus=!1,this.title="",this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var _a,_b;return null!=(_b=null==(_a=this.input)?void 0:_a.valueAsDate)?_b:null}set valueAsDate(newValue){const input=document.createElement("input");input.type="date",input.valueAsDate=newValue,this.value=input.value}get valueAsNumber(){var _a,_b;return null!=(_b=null==(_a=this.input)?void 0:_a.valueAsNumber)?_b:parseFloat(this.value)}set valueAsNumber(newValue){const input=document.createElement("input");input.type="number",input.valueAsNumber=newValue,this.value=input.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(event){this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change"),this.input.focus(),event.stopPropagation()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(event){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(event)}handleKeyDown(event){const hasModifier=event.metaKey||event.ctrlKey||event.shiftKey||event.altKey;"Enter"!==event.key||hasModifier||setTimeout((()=>{event.defaultPrevented||event.isComposing||this.formControlController.submit()}))}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(options){this.input.focus(options)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(selectionStart,selectionEnd,selectionDirection="none"){this.input.setSelectionRange(selectionStart,selectionEnd,selectionDirection)}setRangeText(replacement,start,end,selectMode){this.input.setRangeText(replacement,start,end,selectMode),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(message){this.input.setCustomValidity(message),this.formControlController.updateValidity()}render(){const hasLabelSlot=this.hasSlotController.test("label"),hasHelpTextSlot=this.hasSlotController.test("help-text"),hasLabel=!!this.label||!!hasLabelSlot,hasHelpText=!!this.helpText||!!hasHelpTextSlot,hasClearIcon=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return chunk_DUT32TWM.y`
      <div
        part="form-control"
        class=${(0,chunk_ORW72H2K.o)({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":hasLabel,"form-control--has-help-text":hasHelpText})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${(0,chunk_ORW72H2K.o)({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${(0,chunk_V47DPYLL.l)(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${(0,chunk_V47DPYLL.l)(this.placeholder)}
              minlength=${(0,chunk_V47DPYLL.l)(this.minlength)}
              maxlength=${(0,chunk_V47DPYLL.l)(this.maxlength)}
              min=${(0,chunk_V47DPYLL.l)(this.min)}
              max=${(0,chunk_V47DPYLL.l)(this.max)}
              step=${(0,chunk_V47DPYLL.l)(this.step)}
              .value=${l2(this.value)}
              autocapitalize=${(0,chunk_V47DPYLL.l)(this.autocapitalize)}
              autocomplete=${(0,chunk_V47DPYLL.l)(this.autocomplete)}
              autocorrect=${(0,chunk_V47DPYLL.l)(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${(0,chunk_V47DPYLL.l)(this.pattern)}
              enterkeyhint=${(0,chunk_V47DPYLL.l)(this.enterkeyhint)}
              inputmode=${(0,chunk_V47DPYLL.l)(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${hasClearIcon?chunk_DUT32TWM.y`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}
            ${this.passwordToggle&&!this.disabled?chunk_DUT32TWM.y`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible?chunk_DUT32TWM.y`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          `:chunk_DUT32TWM.y`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  `:""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText?"false":"true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `}};SlInput.styles=input_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.i)(".input__control")],SlInput.prototype,"input",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.t)()],SlInput.prototype,"hasFocus",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"title",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlInput.prototype,"type",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"name",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"value",2),(0,chunk_LKA3TPUC.u2)([((propertyName="value")=>(proto,key)=>{const ctor=proto.constructor,attributeChangedCallback=ctor.prototype.attributeChangedCallback;ctor.prototype.attributeChangedCallback=function(name,old,value){var _a;const options=ctor.getPropertyOptions(propertyName);if(name===("string"==typeof options.attribute?options.attribute:propertyName)){const converter=options.converter||chunk_DUT32TWM.n,newValue=("function"==typeof converter?converter:null!=(_a=null==converter?void 0:converter.fromAttribute)?_a:chunk_DUT32TWM.n.fromAttribute)(value,options.type);this[propertyName]!==newValue&&(this[key]=newValue)}attributeChangedCallback.call(this,name,old,value)}})()],SlInput.prototype,"defaultValue",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlInput.prototype,"size",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlInput.prototype,"filled",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlInput.prototype,"pill",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"label",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"help-text"})],SlInput.prototype,"helpText",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean})],SlInput.prototype,"clearable",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlInput.prototype,"disabled",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"placeholder",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlInput.prototype,"readonly",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"password-toggle",type:Boolean})],SlInput.prototype,"passwordToggle",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"password-visible",type:Boolean})],SlInput.prototype,"passwordVisible",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({attribute:"no-spin-buttons",type:Boolean})],SlInput.prototype,"noSpinButtons",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({reflect:!0})],SlInput.prototype,"form",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,reflect:!0})],SlInput.prototype,"required",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"pattern",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Number})],SlInput.prototype,"minlength",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Number})],SlInput.prototype,"maxlength",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"min",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"max",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"step",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"autocapitalize",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"autocorrect",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"autocomplete",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean})],SlInput.prototype,"autofocus",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"enterkeyhint",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)({type:Boolean,converter:{fromAttribute:value=>!(!value||"false"===value),toAttribute:value=>value?"true":"false"}})],SlInput.prototype,"spellcheck",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlInput.prototype,"inputmode",2),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("disabled",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleDisabledChange",1),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("step",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleStepChange",1),(0,chunk_LKA3TPUC.u2)([(0,chunk_VQ3XOPCT.Y)("value",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleValueChange",1),SlInput=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-input")],SlInput);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GHOMGFX6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VG6XY36X.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.I33L3NO6.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P52GZVKG.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RPB53XXV.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DAGT3MMF.js")}}]);
//# sourceMappingURL=617.215c9e3c.iframe.bundle.js.map