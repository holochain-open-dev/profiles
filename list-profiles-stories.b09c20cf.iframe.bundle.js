/*! For license information please see list-profiles-stories.b09c20cf.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[402],{"./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js");let bytes=[0],byteIndex=0;function value(){return(()=>{const result=bytes[byteIndex];return byteIndex=(byteIndex+1)%bytes.length,result})()/256}function createColor(lightness){return{h:Math.floor(360*value()),s:60*value()+40,l:lightness||(100*value()+25*(value()+value()+value()+value()))/2}}function encodeColor({h,s,l}){return`hsl(${h}, ${s}%, ${l}%)`}function drawTriangle(cc,radius,center){const a1=2*value()*Math.PI,dx1=radius*Math.cos(a1),dy1=radius*Math.sin(a1),x1=center.x+dx1,y1=center.x+dy1,a2=a1+2*Math.PI*.3,dx2=radius*Math.cos(a2),dy2=radius*Math.sin(a2),x2=center.x+dx2,y2=center.x+dy2,a3=a2+2*Math.PI*.3,dx3=radius*Math.cos(a3),dy3=radius*Math.sin(a3),x3=center.x+dx3,y3=center.x+dy3;cc.beginPath(),cc.moveTo(x1,y1),cc.lineTo(x2,y2),cc.lineTo(x3,y3),cc.fill()}function buildOpts(opts){const hash=opts.hash||[0];return function setBytes(hash){bytes=132===hash[0]&&32===hash[1]&&36===hash[2]?hash.slice(3):hash||[],byteIndex=0}(hash),{backgroundColor:opts.backgroundColor||encodeColor(createColor()),hash,size:opts.size||32}}var class_map=__webpack_require__("./node_modules/lit/directives/class-map.js"),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),holo_hash_property=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/holo-hash-property.js"));let HoloIdenticon=class HoloIdenticon extends lit.WF{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout((()=>{this._tooltip.hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3))}get strHash(){return(0,lib.Bs)(this.hash)}updated(changedValues){super.updated(changedValues),(changedValues.has("hash")&&changedValues.get("hash")?.toString()!==this.hash?.toString()||changedValues.has("size")||changedValues.has("value"))&&function renderIdenticon(opts,canvas){if(opts.hash&&!(opts.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");opts=buildOpts(opts||{});const{size,backgroundColor}=opts;canvas.width=canvas.height=size;const cc=canvas.getContext("2d");if(!cc)return;cc.fillStyle=backgroundColor,cc.fillRect(0,0,canvas.width,canvas.height);const numShapes=value()<.5?3:4,shapes=Array.apply(null,Array(numShapes)).map(((_,i)=>{const lightness=0===i?5+25*value():1===i?70+25*value():null;return{x:value()*size,y:value()*size,radius:5+value()*size*.25,type:Math.floor(3*value()),color:encodeColor(createColor(lightness))}})).sort(((a,b)=>a.radius>b.radius?-1:1));for(let i=0;i<numShapes;i++){const shape=shapes[i],{x,y,radius,type,color}=shape;switch(cc.fillStyle=color,type){case 0:cc.beginPath(),cc.arc(x,y,radius,0,2*Math.PI),cc.fill();break;case 1:cc.fillRect(x,y,2*radius,2*radius);break;case 2:drawTriangle(cc,2*radius,{x,y});break;default:throw new Error("shape is greater than 2, this should never happen")}}return canvas}({hash:this.hash,size:this.size},this._canvas)}renderCanvas(){return lit.qy` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${(0,class_map.H)({square:"square"===this.shape,circle:"circle"===this.shape})}
    ></canvas>`}render(){return lit.qy`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?(0,lit_localize.ab)("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return lit.AH`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};(0,tslib_es6.Cg)([(0,decorators.MZ)((0,holo_hash_property.w)("hash"))],HoloIdenticon.prototype,"hash",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Number})],HoloIdenticon.prototype,"size",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:String})],HoloIdenticon.prototype,"shape",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Boolean,attribute:"disable-tooltip"})],HoloIdenticon.prototype,"disableTooltip",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Boolean,attribute:"disable-copy"})],HoloIdenticon.prototype,"disableCopy",void 0),(0,tslib_es6.Cg)([(0,decorators.P)("#canvas")],HoloIdenticon.prototype,"_canvas",void 0),(0,tslib_es6.Cg)([(0,decorators.P)("#tooltip")],HoloIdenticon.prototype,"_tooltip",void 0),(0,tslib_es6.Cg)([(0,decorators.wk)()],HoloIdenticon.prototype,"justCopiedHash",void 0),HoloIdenticon=(0,tslib_es6.Cg)([(0,lit_localize.cc)(),(0,decorators.EM)("holo-identicon")],HoloIdenticon)},"./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),skeleton_styles_default=lit.AH`
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
`,chunk_TUVJKY7S=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"),chunk_4TUIT776=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"),chunk_KAW7D32O=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js"),class_map=__webpack_require__("./node_modules/lit/directives/class-map.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),chunk_F4NP2SRV_SlSkeleton=class extends chunk_4TUIT776.f{constructor(){super(...arguments),this.effect="none"}render(){return lit.qy`
      <div
        part="base"
        class=${(0,class_map.H)({skeleton:!0,"skeleton--pulse":"pulse"===this.effect,"skeleton--sheen":"sheen"===this.effect})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};chunk_F4NP2SRV_SlSkeleton.styles=[chunk_TUVJKY7S.$,skeleton_styles_default],(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)()],chunk_F4NP2SRV_SlSkeleton.prototype,"effect",2);chunk_F4NP2SRV_SlSkeleton.define("sl-skeleton")},"./stories/list-profiles.stories.js":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./ui/dist/elements/list-profiles.js"),__webpack_require__("./ui/dist/elements/profiles-context.js"),__webpack_require__("./ui/dist/mocks.js")),_holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./ui/dist/index.js");const mock=new _holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.KE(await(0,_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.IX)()),__WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/list-profiles",tags:["autodocs"],component:"list-profiles",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.qy` <profiles-context
      .store=${new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.Qj(new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.gd(mock))}
    >
      <list-profiles />
    </profiles-context>`},Demo={};Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}};const __namedExportsOrder=["Demo"];__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}),1)},"./ui/dist/elements/agent-avatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_lit_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),lit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lit-html/directives/style-map.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_12__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./ui/dist/context.js"));let AgentAvatar=class AgentAvatar extends lit__WEBPACK_IMPORTED_MODULE_2__.WF{constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1,this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_6__.GG(this,(()=>this.store.profiles.get(this.agentPubKey)),(()=>[this.agentPubKey,this.store]))}renderIdenticon(){return lit__WEBPACK_IMPORTED_MODULE_2__.qy` <div
      style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.W)({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
    >
      <holo-identicon
        .disableCopy=${this.disableCopy}
        .disableTooltip=${this.disableTooltip}
        .hash=${this.agentPubKey}
        .size=${this.size}
      >
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`}renderProfile(profile){if(!profile||!profile.entry.fields.avatar)return this.renderIdenticon();const contents=lit__WEBPACK_IMPORTED_MODULE_2__.qy`
      <div
        style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.W)({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
      >
        <sl-avatar
          .image=${profile.entry.fields.avatar}
          style="--size: ${this.size}px;"
          @click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
        >
        </sl-avatar>
        <div class="badge"><slot name="badge"></slot></div>
      </div>
    `;return lit__WEBPACK_IMPORTED_MODULE_2__.qy`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .trigger=${this.disableTooltip?"manual":"hover focus"}
        hoist
        .content=${profile.entry.nickname}
      >
        ${contents}
      </sl-tooltip>
    `}render(){var _a;if("identicon"===(null===(_a=this.store)||void 0===_a?void 0:_a.config.avatarMode))return this.renderIdenticon();if(!this._agentProfile.value)return lit__WEBPACK_IMPORTED_MODULE_2__.qy`<sl-skeleton
        effect="pulse"
        style="height: ${this.size}px; width: ${this.size}px"
      ></sl-skeleton>`;switch(this._agentProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_2__.qy`<sl-skeleton
          effect="pulse"
          style="height: ${this.size}px; width: ${this.size}px"
        ></sl-skeleton>`;case"complete":return this.renderProfile(this._agentProfile.value.value);case"error":return lit__WEBPACK_IMPORTED_MODULE_2__.qy`
          <display-error
            tooltip
            .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.ab)("Error fetching the agent's avatar")}
            .error=${this._agentProfile.value.error}
          ></display-error>
        `}}};AgentAvatar.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.gM,lit__WEBPACK_IMPORTED_MODULE_2__.AH`
      .badge {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.wD)("agent-pub-key"))],AgentAvatar.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Number})],AgentAvatar.prototype,"size",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Boolean,attribute:"disable-tooltip"})],AgentAvatar.prototype,"disableTooltip",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Boolean,attribute:"disable-copy"})],AgentAvatar.prototype,"disableCopy",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,_lit_context__WEBPACK_IMPORTED_MODULE_0__.Fg)({context:_context_js__WEBPACK_IMPORTED_MODULE_12__.d,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)()],AgentAvatar.prototype,"store",void 0),AgentAvatar=(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.cc)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.EM)("agent-avatar")],AgentAvatar)},"./ui/dist/elements/list-profiles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_context__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./ui/dist/elements/agent-avatar.js"),__webpack_require__("./ui/dist/elements/profile-list-item-skeleton.js"),__webpack_require__("./ui/dist/context.js"));let ListProfiles=class ListProfiles extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{constructor(){super(...arguments),this._allProfiles=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__.GG(this,(()=>this.store.allProfiles),(()=>[this.store]))}initials(nickname){return nickname.split(" ").map((name=>name[0])).join("")}fireAgentSelected(agentPubKey){agentPubKey&&this.dispatchEvent(new CustomEvent("agent-selected",{bubbles:!0,composed:!0,detail:{agentPubKey}}))}renderList(profiles){return 0===profiles.size?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<span>${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.ab)("There are no created profiles yet")} ></span>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <div style="min-width: 80px; flex: 1;" }>
        ${Array.from(profiles.entries()).map((([agent_pub_key,profile])=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            <div class="row" style="align-items: center; margin-bottom: 16px;">
              <agent-avatar
                style="margin-right: 8px;"
                .agentPubKey=${agent_pub_key}
                @click=${()=>this.fireAgentSelected(agent_pub_key)}
              >
              </agent-avatar
              ><span> ${profile.entry.nickname}</span>
            </div>
          `))}
      </div>
    `}render(){if(!this._allProfiles.value)return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div class="column center-content">
        <profile-list-item-skeleton> </profile-list-item-skeleton>
        <profile-list-item-skeleton> </profile-list-item-skeleton>
        <profile-list-item-skeleton> </profile-list-item-skeleton>
      </div>`;switch(this._allProfiles.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div class="column center-content">
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
          <profile-list-item-skeleton> </profile-list-item-skeleton>
        </div>`;case"error":return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<display-error
          .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.ab)("Error fetching the profiles for all agents")}
          .error=${this._allProfiles.value.error}
        ></display-error>`;case"complete":return this.renderList(this._allProfiles.value.value)}}};ListProfiles.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_3__.gM,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
      :host {
        display: flex;
      }
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_10__.Cg)([(0,_lit_context__WEBPACK_IMPORTED_MODULE_2__.Fg)({context:_context__WEBPACK_IMPORTED_MODULE_9__.d,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)()],ListProfiles.prototype,"store",void 0),ListProfiles=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.Cg)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.cc)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("list-profiles")],ListProfiles)},"./ui/dist/elements/profile-list-item-skeleton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js");let ProfileListItemSkeleton=class ProfileListItemSkeleton extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div class="row" style="align-items: center; width: 150px">
      <sl-skeleton
        effect="sheen"
        style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
      ></sl-skeleton
      ><sl-skeleton
        effect="sheen"
        style="flex: 1; margin: 8px; border-radius: 12px"
      >
      </sl-skeleton>
    </div>`}static get styles(){return[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__.gM,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
        :host {
          display: flex;
        }
      `]}};ProfileListItemSkeleton=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("profile-list-item-skeleton")],ProfileListItemSkeleton)},"./node_modules/lit-html/directives/style-map.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>o});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),directive_t_ATTRIBUTE=1;class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}var t,o=(t=class extends i{constructor(t){var e;if(super(t),t.type!==directive_t_ATTRIBUTE||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{var s=t[r];return null==s?e:e+"".concat(r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase(),":").concat(s,";")}),"")}update(e,_ref){var[r]=_ref,{style:s}=e.element;if(void 0===this.ht){for(var _t in this.ht=new Set,r)this.ht.add(_t);return this.render(r)}for(var _t2 in this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="")})),r){var _e=r[_t2];if(null!=_e){this.ht.add(_t2);var _r="string"==typeof _e&&_e.endsWith(" !important");_t2.includes("-")||_r?s.setProperty(_t2,_r?_e.slice(0,-11):_e,_r?"important":""):s[_t2]=_e}}return lit_html.c0}},function(){for(var _len=arguments.length,e=new Array(_len),_key=0;_key<_len;_key++)e[_key]=arguments[_key];return{_$litDirective$:t,values:e}})}}]);
//# sourceMappingURL=list-profiles-stories.b09c20cf.iframe.bundle.js.map