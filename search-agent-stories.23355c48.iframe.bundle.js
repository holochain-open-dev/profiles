"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[251],{"./stories/search-agent.stories.js":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./ui/dist/elements/search-agent.js"),__webpack_require__("./ui/dist/elements/profiles-context.js"),__webpack_require__("./ui/dist/mocks.js")),_holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./ui/dist/index.js");const mock=new _holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.KE(await(0,_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.IX)(),decodeHashFromBase64("uhCAk8OKb2hznzG023xxh_vR3Q7Y4IEOAo4B0QN7ZhbGYeww")),__WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/search-agent",tags:["autodocs"],component:"search-agent",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.qy` <profiles-context
      .store=${new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.Qj(new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.gd(mock))}
      ><div style="height: 200px"><search-agent></search-agent></div
    ></profiles-context>`},Demo={};Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}};const __namedExportsOrder=["Demo"];__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}),1)},"./ui/dist/elements/agent-avatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_lit_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),lit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lit-html/directives/style-map.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_12__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./ui/dist/context.js"));let AgentAvatar=class AgentAvatar extends lit__WEBPACK_IMPORTED_MODULE_2__.WF{constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1,this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_6__.GG(this,(()=>this.store.profiles.get(this.agentPubKey)),(()=>[this.agentPubKey,this.store]))}renderIdenticon(){return lit__WEBPACK_IMPORTED_MODULE_2__.qy` <div
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
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.wD)("agent-pub-key"))],AgentAvatar.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Number})],AgentAvatar.prototype,"size",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Boolean,attribute:"disable-tooltip"})],AgentAvatar.prototype,"disableTooltip",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)({type:Boolean,attribute:"disable-copy"})],AgentAvatar.prototype,"disableCopy",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,_lit_context__WEBPACK_IMPORTED_MODULE_0__.Fg)({context:_context_js__WEBPACK_IMPORTED_MODULE_12__.d,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.MZ)()],AgentAvatar.prototype,"store",void 0),AgentAvatar=(0,tslib__WEBPACK_IMPORTED_MODULE_13__.Cg)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_5__.cc)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.EM)("agent-avatar")],AgentAvatar)},"./ui/dist/elements/profile-list-item-skeleton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js");let ProfileListItemSkeleton=class ProfileListItemSkeleton extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div class="row" style="align-items: center; width: 150px">
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
      `]}};ProfileListItemSkeleton=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("profile-list-item-skeleton")],ProfileListItemSkeleton)},"./ui/dist/elements/search-agent.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),lit=__webpack_require__("./node_modules/lit/index.js"),context=__webpack_require__("./node_modules/@lit/context/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),dist=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),if_defined=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/menu/menu.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/input/input.js"),__webpack_require__("./ui/dist/elements/agent-avatar.js"),__webpack_require__("./ui/dist/elements/profile-list-item-skeleton.js"),__webpack_require__("./node_modules/lit/directives/if-defined.js")),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),stores_dist=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),dist_context=__webpack_require__("./ui/dist/context.js");let SearchAgentDropdown=class SearchAgentDropdown extends lit.WF{constructor(){super(...arguments),this.includeMyself=!1,this._searchProfiles=new stores_dist.GG(this,(()=>this.searchFilter&&this.searchFilter.length>=3?this.store.searchProfiles(this.searchFilter,!0):(0,stores_dist.so)(void 0)),(()=>[this.searchFilter]))}async onUsernameSelected(agentPubKey){const profile=await(0,stores_dist.hq)(this.store.profiles.get(agentPubKey));this.dispatchEvent(new CustomEvent("agent-selected",{detail:{agentPubKey,profile},bubbles:!0,composed:!0}))}renderAgentList(){if(!this._searchProfiles.value)return lit.qy`<sl-menu-item disabled
        >${(0,lit_localize.ab)("Enter at least 3 chars to search...")}</sl-menu-item
      >`;switch(this._searchProfiles.value.status){case"pending":return Array(3).map((()=>lit.qy`
            <sl-menu-item>
              <sl-skeleton
                effect="sheen"
                slot="prefix"
                style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
              ></sl-skeleton>
              <sl-skeleton
                effect="sheen"
                style="width: 100px; margin: 8px; border-radius: 12px"
              ></sl-skeleton>
            </sl-menu-item>
          `));case"error":return lit.qy`
          <display-error
            style="flex: 1; display:flex"
            tooltip
            .headline=${(0,lit_localize.ab)("Error searching agents")}
            .error=${this._searchProfiles.value.error}
          ></display-error>
        `;case"complete":{if(!this._searchProfiles.value.value)return lit.qy`<sl-menu-item disabled
            >${(0,lit_localize.ab)("Enter at least 3 chars to search...")}</sl-menu-item
          >`;let agents=Array.from(this._searchProfiles.value.value.entries());return this.includeMyself||(agents=agents.filter((([pubkey,_profile])=>pubkey.toString()!==this.store.client.client.myPubKey.toString()))),0===agents.length?lit.qy`<sl-menu-item disabled>
            ${(0,lit_localize.ab)("No agents match the filter")}
          </sl-menu-item>`:lit.qy`
          ${agents.map((([pubkey,profile])=>lit.qy`
              <sl-menu-item .value=${(0,lib.Bs)(pubkey)}>
                <agent-avatar
                  slot="prefix"
                  .agentPubKey=${pubkey}
                  style="margin-right: 16px"
                ></agent-avatar>
                ${profile.entry.nickname}
              </sl-menu-item>
            `))}
        `}}}render(){return lit.qy`
      <sl-dropdown id="dropdown" style="flex: 1" .open=${(0,if_defined.J)(this.open)}>
        <slot slot="trigger"></slot>
        <sl-menu
          @sl-select=${e=>{this.onUsernameSelected((0,lib.io)(e.detail.item.value))}}
        >
          ${this.renderAgentList()}
        </sl-menu>
      </sl-dropdown>
    `}static get styles(){return[dist.gM,lit.AH`
        :host {
          display: flex;
        }
      `]}};(0,tslib_es6.Cg)([(0,decorators.MZ)()],SearchAgentDropdown.prototype,"searchFilter",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)()],SearchAgentDropdown.prototype,"open",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Boolean,attribute:"include-myself"})],SearchAgentDropdown.prototype,"includeMyself",void 0),(0,tslib_es6.Cg)([(0,context.Fg)({context:dist_context.d,subscribe:!0}),(0,decorators.MZ)()],SearchAgentDropdown.prototype,"store",void 0),(0,tslib_es6.Cg)([(0,decorators.P)("#dropdown")],SearchAgentDropdown.prototype,"dropdown",void 0),SearchAgentDropdown=(0,tslib_es6.Cg)([(0,lit_localize.cc)(),(0,decorators.EM)("search-agent-dropdown")],SearchAgentDropdown);let SearchAgent=class SearchAgent extends lit.WF{constructor(){super(...arguments),this.required=!1,this.disabled=!1,this.clearOnSelect=!1,this.includeMyself=!1,this._controller=new dist.ZE(this),this.searchFilter=""}reportValidity(){const invalid=!1!==this.required&&void 0===this.value;return invalid&&(this._textField.setCustomValidity("This field is required"),this._textField.reportValidity()),!invalid}async reset(){if(this.value=this.defaultValue,this.defaultValue){const profile=await this.store.client.getAgentProfile(this.defaultValue,!0);this._textField.value=(null==profile?void 0:profile.entry.nickname)||""}else this._textField.value=""}onUsernameSelected(agentPubKey,profile){this.value=agentPubKey,this.clearOnSelect?this._textField.value="":this._textField.value=profile.entry.nickname,this.searchFilter=""}get _label(){let l=this.fieldLabel?this.fieldLabel:(0,lit_localize.ab)("Search Agent");return!1!==this.required&&(l=`${l} *`),l}render(){return lit.qy`
      <div style="flex: 1; display: flex;">
        <search-agent-dropdown
          id="dropdown"
          .open=${this.searchFilter.length>=3}
          style="flex: 1"
          .includeMyself=${this.includeMyself}
          .searchFilter=${this.searchFilter}
          @agent-selected=${e=>this.onUsernameSelected(e.detail.agentPubKey,e.detail.profile)}
        >
          <sl-input
            id="textfield"
            .label=${this._label}
            .placeholder=${(0,lit_localize.ab)("At least 3 chars...")}
            @input=${e=>{this.searchFilter=e.target.value}}
          ></sl-input>
        </search-agent-dropdown>
      </div>
    `}static get styles(){return[dist.gM,lit.AH`
        :host {
          display: flex;
        }
      `]}};(0,tslib_es6.Cg)([(0,decorators.MZ)()],SearchAgent.prototype,"name",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)((0,dist.wD)("default-value"))],SearchAgent.prototype,"defaultValue",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)()],SearchAgent.prototype,"required",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)()],SearchAgent.prototype,"disabled",void 0),(0,tslib_es6.Cg)([(0,decorators.wk)()],SearchAgent.prototype,"value",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Boolean,attribute:"clear-on-select"})],SearchAgent.prototype,"clearOnSelect",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:Boolean,attribute:"include-myself"})],SearchAgent.prototype,"includeMyself",void 0),(0,tslib_es6.Cg)([(0,decorators.MZ)({type:String,attribute:"field-label"})],SearchAgent.prototype,"fieldLabel",void 0),(0,tslib_es6.Cg)([(0,context.Fg)({context:dist_context.d,subscribe:!0}),(0,decorators.MZ)()],SearchAgent.prototype,"store",void 0),(0,tslib_es6.Cg)([(0,decorators.P)("#textfield")],SearchAgent.prototype,"_textField",void 0),(0,tslib_es6.Cg)([(0,decorators.wk)()],SearchAgent.prototype,"searchFilter",void 0),SearchAgent=(0,tslib_es6.Cg)([(0,lit_localize.cc)(),(0,decorators.EM)("search-agent")],SearchAgent)}}]);
//# sourceMappingURL=search-agent-stories.23355c48.iframe.bundle.js.map