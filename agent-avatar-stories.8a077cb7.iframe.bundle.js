"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[784],{"./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js");let bytes=[0],byteIndex=0;function value(){return(()=>{const result=bytes[byteIndex];return byteIndex=(byteIndex+1)%bytes.length,result})()/256}function createColor(lightness){return{h:Math.floor(360*value()),s:60*value()+40,l:lightness||(100*value()+25*(value()+value()+value()+value()))/2}}function encodeColor({h,s,l}){return`hsl(${h}, ${s}%, ${l}%)`}function drawTriangle(cc,radius,center){const a1=2*value()*Math.PI,dx1=radius*Math.cos(a1),dy1=radius*Math.sin(a1),x1=center.x+dx1,y1=center.x+dy1,a2=a1+2*Math.PI*.3,dx2=radius*Math.cos(a2),dy2=radius*Math.sin(a2),x2=center.x+dx2,y2=center.x+dy2,a3=a2+2*Math.PI*.3,dx3=radius*Math.cos(a3),dy3=radius*Math.sin(a3),x3=center.x+dx3,y3=center.x+dy3;cc.beginPath(),cc.moveTo(x1,y1),cc.lineTo(x2,y2),cc.lineTo(x3,y3),cc.fill()}function buildOpts(opts){const hash=opts.hash||[0];return function setBytes(hash){bytes=132===hash[0]&&32===hash[1]&&36===hash[2]?hash.slice(3):hash||[],byteIndex=0}(hash),{backgroundColor:opts.backgroundColor||encodeColor(createColor()),hash,size:opts.size||32}}var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),directive=__webpack_require__("./node_modules/lit-html/directive.js"),o=(0,directive.XM)(class extends directive.Xe{constructor(t){var i;if(super(t),t.type!==directive.pX.ATTRIBUTE||"class"!==t.name||(null===(i=t.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,_ref){var r,o,[s]=_ref;if(void 0===this.nt){for(var _t in this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t)))),s)s[_t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(_t))&&this.nt.add(_t);return this.render(s)}var e=i.element.classList;for(var _t2 in this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t))})),s){var _i=!!s[_t2];_i===this.nt.has(_t2)||(null===(o=this.st)||void 0===o?void 0:o.has(_t2))||(_i?(e.add(_t2),this.nt.add(_t2)):(e.remove(_t2),this.nt.delete(_t2)))}return lit_html.Jb}}),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),holo_hash_property=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/holo-hash-property.js")),__decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let HoloIdenticon=class HoloIdenticon extends lit.oi{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout((()=>{this._tooltip.hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3))}get strHash(){return(0,lib.E6)(this.hash)}updated(changedValues){super.updated(changedValues),(changedValues.has("hash")&&changedValues.get("hash")?.toString()!==this.hash?.toString()||changedValues.has("size")||changedValues.has("value"))&&function renderIdenticon(opts,canvas){if(opts.hash&&!(opts.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");opts=buildOpts(opts||{});const{size,backgroundColor}=opts;canvas.width=canvas.height=size;const cc=canvas.getContext("2d");if(!cc)return;cc.fillStyle=backgroundColor,cc.fillRect(0,0,canvas.width,canvas.height);const numShapes=value()<.5?3:4,shapes=Array.apply(null,Array(numShapes)).map(((_,i)=>{const lightness=0===i?5+25*value():1===i?70+25*value():null;return{x:value()*size,y:value()*size,radius:5+value()*size*.25,type:Math.floor(3*value()),color:encodeColor(createColor(lightness))}})).sort(((a,b)=>a.radius>b.radius?-1:1));for(let i=0;i<numShapes;i++){const shape=shapes[i],{x,y,radius,type,color}=shape;switch(cc.fillStyle=color,type){case 0:cc.beginPath(),cc.arc(x,y,radius,0,2*Math.PI),cc.fill();break;case 1:cc.fillRect(x,y,2*radius,2*radius);break;case 2:drawTriangle(cc,2*radius,{x,y});break;default:throw new Error("shape is greater than 2, this should never happen")}}return canvas}({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return lit.dy` <canvas
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
    `}};__decorate([(0,decorators.Cb)((0,holo_hash_property.u)("hash"))],HoloIdenticon.prototype,"hash",void 0),__decorate([(0,decorators.Cb)({type:Number})],HoloIdenticon.prototype,"size",void 0),__decorate([(0,decorators.Cb)({type:String})],HoloIdenticon.prototype,"shape",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-tooltip"})],HoloIdenticon.prototype,"disableTooltip",void 0),__decorate([(0,decorators.Cb)({type:Boolean,attribute:"disable-copy"})],HoloIdenticon.prototype,"disableCopy",void 0),__decorate([(0,decorators.IO)("#canvas")],HoloIdenticon.prototype,"_canvas",void 0),__decorate([(0,decorators.IO)("#tooltip")],HoloIdenticon.prototype,"_tooltip",void 0),__decorate([(0,decorators.SB)()],HoloIdenticon.prototype,"justCopiedHash",void 0),HoloIdenticon=__decorate([(0,lit_localize.kI)(),(0,decorators.Mo)("holo-identicon")],HoloIdenticon)},"./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),skeleton_styles_default=chunk_DUT32TWM.i`
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
    `}};SlSkeleton.styles=skeleton_styles_default,(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e2)()],SlSkeleton.prototype,"effect",2),SlSkeleton=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-skeleton")],SlSkeleton);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./ui/dist/elements/agent-avatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),lit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lit-html/directives/style-map.js"),_holochain_client__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_13__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./ui/dist/context.js"));let AgentAvatar=class AgentAvatar extends lit__WEBPACK_IMPORTED_MODULE_2__.oi{constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1,this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__.oA(this,(()=>this.store.profiles.get(this.agentPubKey))),this.justCopiedHash=!1}renderIdenticon(){return lit__WEBPACK_IMPORTED_MODULE_2__.dy` <div
      style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.V)({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
    >
      <holo-identicon
        .disableCopy=${this.disableCopy}
        .disableTooltip=${this.disableTooltip}
        .hash=${this.agentPubKey}
        .size=${this.size}
      >
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`}async copyHash(){await navigator.clipboard.writeText((0,_holochain_client__WEBPACK_IMPORTED_MODULE_5__.E6)(this.agentPubKey)),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this.shadowRoot.getElementById("tooltip").show(),this.timeout=setTimeout((()=>{this.shadowRoot.getElementById("tooltip").hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3)}renderProfile(profile){if(!profile||!profile.fields.avatar)return this.renderIdenticon();const contents=lit__WEBPACK_IMPORTED_MODULE_2__.dy`
      <div
        @click=${()=>{this.disableCopy||this.copyHash()}}
        style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.V)({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
      >
        <sl-avatar
          .image=${profile.fields.avatar}
          style="--size: ${this.size}px;"
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;return lit__WEBPACK_IMPORTED_MODULE_2__.dy`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash||this.disableTooltip?(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.WI)("Copied!"):`${(0,_holochain_client__WEBPACK_IMPORTED_MODULE_5__.E6)(this.agentPubKey).substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${contents}
      </sl-tooltip>
    `}render(){if("identicon"===this.store.config.avatarMode)return this.renderIdenticon();switch(this._agentProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_2__.dy`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;case"complete":return this.renderProfile(this._agentProfile.value.value);case"error":return lit__WEBPACK_IMPORTED_MODULE_2__.dy`
          <display-error
            tooltip
            .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.WI)("Error fetching the agent's avatar")}
            .error=${this._agentProfile.value.error.data.data}
          ></display-error>
        `}}};AgentAvatar.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.FG,lit__WEBPACK_IMPORTED_MODULE_2__.iv`
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.uA)("agent-pub-key"))],AgentAvatar.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Number})],AgentAvatar.prototype,"size",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Boolean,attribute:"disable-tooltip"})],AgentAvatar.prototype,"disableTooltip",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Boolean,attribute:"disable-copy"})],AgentAvatar.prototype,"disableCopy",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_13__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)()],AgentAvatar.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.SB)()],AgentAvatar.prototype,"justCopiedHash",void 0),AgentAvatar=(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Mo)("agent-avatar")],AgentAvatar)},"./node_modules/lit-html/directives/style-map.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>i});var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_directive_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit-html/directive.js"),i=(0,_directive_js__WEBPACK_IMPORTED_MODULE_1__.XM)(class extends _directive_js__WEBPACK_IMPORTED_MODULE_1__.Xe{constructor(t){var e;if(super(t),t.type!==_directive_js__WEBPACK_IMPORTED_MODULE_1__.pX.ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{var s=t[r];return null==s?e:e+"".concat(r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase(),":").concat(s,";")}),"")}update(e,_ref){var[r]=_ref,{style:s}=e.element;if(void 0===this.vt){for(var _t in this.vt=new Set,r)this.vt.add(_t);return this.render(r)}for(var _t2 in this.vt.forEach((t=>{null==r[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")})),r){var _e=r[_t2];null!=_e&&(this.vt.add(_t2),_t2.includes("-")?s.setProperty(_t2,_e):s[_t2]=_e)}return _lit_html_js__WEBPACK_IMPORTED_MODULE_0__.Jb}})},"./stories/agent-avatar.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./ui/dist/elements/agent-avatar.js"),__webpack_require__("./ui/dist/elements/profiles-context.js"),__webpack_require__("./ui/dist/mocks.js")),_holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./ui/dist/index.js");const mock=new _holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.M,__WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/agent-avatar",tags:["autodocs"],component:"agent-avatar",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.dy` <profiles-context
      .store=${new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__._p(new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.Y3(mock))}
    >
      <agent-avatar .agentPubKey=${Array.from(mock.agentsProfiles.keys())[0]} />
    </profiles-context>`},Demo={},__namedExportsOrder=["Demo"];Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=agent-avatar-stories.8a077cb7.iframe.bundle.js.map