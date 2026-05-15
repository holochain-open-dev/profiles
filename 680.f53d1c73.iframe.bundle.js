"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[680],{"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>icon_button_styles_default});var icon_button_styles_default=__webpack_require__("./node_modules/lit/index.js").AH`
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
`},"./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>SlIconButton});var _chunk_6I2T3DLI_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js"),_chunk_YHLNUJ7P_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js"),_chunk_TUVJKY7S_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"),_chunk_4TUIT776_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"),_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js"),lit_directives_class_map_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/lit/directives/class-map.js"),lit_static_html_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/lit/static-html.js"),lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/lit/directives/if-defined.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/lit/decorators.js"),SlIconButton=class extends _chunk_4TUIT776_js__WEBPACK_IMPORTED_MODULE_3__.f{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(event){this.disabled&&(event.preventDefault(),event.stopPropagation())}click(){this.button.click()}focus(options){this.button.focus(options)}blur(){this.button.blur()}render(){const isLink=!!this.href,tag=isLink?lit_static_html_js__WEBPACK_IMPORTED_MODULE_6__.eu`a`:lit_static_html_js__WEBPACK_IMPORTED_MODULE_6__.eu`button`;return lit_static_html_js__WEBPACK_IMPORTED_MODULE_6__.qy`
      <${tag}
        part="base"
        class=${(0,lit_directives_class_map_js__WEBPACK_IMPORTED_MODULE_5__.H)({"icon-button":!0,"icon-button--disabled":!isLink&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?void 0:this.disabled)}
        type=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?void 0:"button")}
        href=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?this.href:void 0)}
        target=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?this.target:void 0)}
        download=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?this.download:void 0)}
        rel=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink&&this.target?"noreferrer noopener":void 0)}
        role=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(isLink?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(this.name)}
          library=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(this.library)}
          src=${(0,lit_directives_if_defined_js__WEBPACK_IMPORTED_MODULE_7__.J)(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `}};SlIconButton.styles=[_chunk_TUVJKY7S_js__WEBPACK_IMPORTED_MODULE_2__.$,_chunk_6I2T3DLI_js__WEBPACK_IMPORTED_MODULE_0__.Y],SlIconButton.dependencies={"sl-icon":_chunk_YHLNUJ7P_js__WEBPACK_IMPORTED_MODULE_1__.B},(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.P)(".icon-button")],SlIconButton.prototype,"button",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.wk)()],SlIconButton.prototype,"hasFocus",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"name",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"library",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"src",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"href",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"target",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"download",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)()],SlIconButton.prototype,"label",2),(0,_chunk_KAW7D32O_js__WEBPACK_IMPORTED_MODULE_4__.Cc)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_8__.MZ)({type:Boolean,reflect:!0})],SlIconButton.prototype,"disabled",2)},"./node_modules/@shoelace-style/shoelace/dist/components/alert/alert.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_7E4JTYWU=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js"),chunk_K7JGTRV7=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js"),chunk_B4BZKR24=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js"),chunk_AJ3ENQ5C=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js"),chunk_NYIIDP5N=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js"),chunk_6CTB5ZDJ=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js"),lit=__webpack_require__("./node_modules/lit/index.js"),alert_styles_default=lit.AH`
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
    overflow: hidden;
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

  .alert--has-countdown {
    border-bottom: none;
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
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,chunk_GMYPQTFK=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js"),chunk_TUVJKY7S=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"),chunk_4TUIT776=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"),chunk_KAW7D32O=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js"),class_map=__webpack_require__("./node_modules/lit/directives/class-map.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),_SlAlert=class _SlAlert extends chunk_4TUIT776.f{constructor(){super(...arguments),this.hasSlotController=new chunk_NYIIDP5N.X(this,"icon","suffix"),this.localize=new chunk_6CTB5ZDJ.c(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval((()=>{this.remainingTime-=100}),100))}pauseAutoHide(){var _a;null==(_a=this.countdownAnimation)||_a.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var _a;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.remainingTime),this.remainingTimeInterval=window.setInterval((()=>{this.remainingTime-=100}),100),null==(_a=this.countdownAnimation)||_a.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement}=this,start="100%",end="0";this.countdownAnimation=countdownElement.animate([{width:start},{width:end}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await(0,chunk_AJ3ENQ5C.Ey)(this.base),this.base.hidden=!1;const{keyframes,options}=(0,chunk_K7JGTRV7.RB)(this,"alert.show",{dir:this.localize.dir()});await(0,chunk_AJ3ENQ5C.jd)(this.base,keyframes,options),this.emit("sl-after-show")}else{(elm=>{var _a;const{activeElement}=document;activeElement&&elm.contains(activeElement)&&(null==(_a=document.activeElement)||_a.blur())})(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await(0,chunk_AJ3ENQ5C.Ey)(this.base);const{keyframes,options}=(0,chunk_K7JGTRV7.RB)(this,"alert.hide",{dir:this.localize.dir()});await(0,chunk_AJ3ENQ5C.jd)(this.base,keyframes,options),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,(0,chunk_B4BZKR24.l)(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,(0,chunk_B4BZKR24.l)(this,"sl-after-hide")}async toast(){return new Promise((resolve=>{this.handleCountdownChange(),null===_SlAlert.toastStack.parentElement&&document.body.append(_SlAlert.toastStack),_SlAlert.toastStack.appendChild(this),requestAnimationFrame((()=>{this.clientWidth,this.show()})),this.addEventListener("sl-after-hide",(()=>{_SlAlert.toastStack.removeChild(this),resolve(),null===_SlAlert.toastStack.querySelector("sl-alert")&&_SlAlert.toastStack.remove()}),{once:!0})}))}render(){return lit.qy`
      <div
        part="base"
        class=${(0,class_map.H)({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?lit.qy`
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

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?lit.qy`
              <div
                class=${(0,class_map.H)({alert__countdown:!0,"alert__countdown--ltr":"ltr"===this.countdown})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};_SlAlert.styles=[chunk_TUVJKY7S.$,alert_styles_default],_SlAlert.dependencies={"sl-icon-button":chunk_7E4JTYWU.h},(0,chunk_KAW7D32O.Cc)([(0,decorators.P)('[part~="base"]')],_SlAlert.prototype,"base",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.P)(".alert__countdown-elapsed")],_SlAlert.prototype,"countdownElement",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)({type:Boolean,reflect:!0})],_SlAlert.prototype,"open",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)({type:Boolean,reflect:!0})],_SlAlert.prototype,"closable",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)({reflect:!0})],_SlAlert.prototype,"variant",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)({type:Number})],_SlAlert.prototype,"duration",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)({type:String,reflect:!0})],_SlAlert.prototype,"countdown",2),(0,chunk_KAW7D32O.Cc)([(0,decorators.wk)()],_SlAlert.prototype,"remainingTime",2),(0,chunk_KAW7D32O.Cc)([(0,chunk_GMYPQTFK.w)("open",{waitUntilFirstUpdate:!0})],_SlAlert.prototype,"handleOpenChange",1),(0,chunk_KAW7D32O.Cc)([(0,chunk_GMYPQTFK.w)("duration")],_SlAlert.prototype,"handleDurationChange",1);var chunk_6UPB6RWT_SlAlert=_SlAlert;(0,chunk_K7JGTRV7.Ee)("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),(0,chunk_K7JGTRV7.Ee)("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});chunk_6UPB6RWT_SlAlert.define("sl-alert");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js")},"./node_modules/@shoelace-style/shoelace/dist/components/card/card.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),card_styles_default=lit.AH`
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
`,chunk_NYIIDP5N=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js"),chunk_TUVJKY7S=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"),chunk_4TUIT776=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"),class_map=__webpack_require__("./node_modules/lit/directives/class-map.js"),chunk_PSUCFVU6_SlCard=class extends chunk_4TUIT776.f{constructor(){super(...arguments),this.hasSlotController=new chunk_NYIIDP5N.X(this,"footer","header","image")}render(){return lit.qy`
      <div
        part="base"
        class=${(0,class_map.H)({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};chunk_PSUCFVU6_SlCard.styles=[chunk_TUVJKY7S.$,card_styles_default];chunk_PSUCFVU6_SlCard.define("sl-card");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js")}}]);
//# sourceMappingURL=680.f53d1c73.iframe.bundle.js.map