"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[588],{"./ui/dist/elements/agent-avatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),lit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lit-html/directives/style-map.js"),_holochain_client__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_13__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/tooltip/tooltip.js"),__webpack_require__("./ui/dist/context.js"));let AgentAvatar=class AgentAvatar extends lit__WEBPACK_IMPORTED_MODULE_2__.oi{constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1,this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__.oA(this,(()=>this.store.profiles.get(this.agentPubKey))),this.justCopiedHash=!1}renderIdenticon(){return lit__WEBPACK_IMPORTED_MODULE_2__.dy` <div
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
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.uA)("agent-pub-key"))],AgentAvatar.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Number})],AgentAvatar.prototype,"size",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Boolean,attribute:"disable-tooltip"})],AgentAvatar.prototype,"disableTooltip",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Boolean,attribute:"disable-copy"})],AgentAvatar.prototype,"disableCopy",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_13__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)()],AgentAvatar.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.SB)()],AgentAvatar.prototype,"justCopiedHash",void 0),AgentAvatar=(0,tslib__WEBPACK_IMPORTED_MODULE_14__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Mo)("agent-avatar")],AgentAvatar)},"./ui/dist/elements/profile-list-item-skeleton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js");let ProfileListItemSkeleton=class ProfileListItemSkeleton extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{render(){return lit__WEBPACK_IMPORTED_MODULE_0__.dy`<div class="row" style="align-items: center; width: 150px">
      <sl-skeleton
        effect="sheen"
        style="height: 32px; width: 32px; border-radius: 50%; margin: 8px"
      ></sl-skeleton
      ><sl-skeleton
        effect="sheen"
        style="flex: 1; margin: 8px; border-radius: 12px"
      >
      </sl-skeleton>
    </div>`}static get styles(){return[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__.FG,lit__WEBPACK_IMPORTED_MODULE_0__.iv`
        :host {
          display: flex;
        }
      `]}};ProfileListItemSkeleton=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("profile-list-item-skeleton")],ProfileListItemSkeleton)},"./stories/search-agent.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>search_agent_stories});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),lit=__webpack_require__("./node_modules/lit/index.js"),context=__webpack_require__("./node_modules/@lit-labs/context/index.js"),lit_localize=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),dist=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),elements_dist=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),dist_context=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/menu/menu.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/input/input.js"),__webpack_require__("./ui/dist/elements/agent-avatar.js"),__webpack_require__("./ui/dist/elements/profile-list-item-skeleton.js"),__webpack_require__("./ui/dist/context.js"));let SearchAgent=class SearchAgent extends lit.oi{constructor(){super(...arguments),this.required=!1,this.disabled=!1,this.clearOnSelect=!1,this.includeMyself=!1,this._controller=new elements_dist.xf(this)}reportValidity(){const invalid=!1!==this.required&&void 0===this.value;return invalid&&(this._textField.setCustomValidity("This field is required"),this._textField.reportValidity()),invalid}async reset(){if(this.value=this.defaultValue,this.defaultValue){const profile=await this.store.client.getAgentProfile(this.defaultValue);this._textField.value=(null==profile?void 0:profile.nickname)||""}else this._textField.value=""}onFilterChange(){if(this._textField.value.length<3)return void(this._searchProfiles=void 0);this.dropdown.show();const store=this.store.searchProfiles(this._textField.value);this._searchProfiles=new dist.oA(this,(()=>store))}onUsernameSelected(agentPubKey){var _a;this.dispatchEvent(new CustomEvent("agent-selected",{detail:{agentPubKey}})),this.value=agentPubKey,this.clearOnSelect?(this._textField.value="",this._searchProfiles=void 0):"complete"===(null===(_a=this._searchProfiles)||void 0===_a?void 0:_a.value.status)&&(this._textField.value=this._searchProfiles.value.value.get(agentPubKey).nickname),this.dropdown.hide()}renderAgentList(){if(void 0===this._searchProfiles)return lit.dy``;switch(this._searchProfiles.value.status){case"pending":return Array(3).map((()=>lit.dy`
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
          `));case"error":return lit.dy`
          <display-error
            style="flex: 1; display:flex"
            tooltip
            .headline=${(0,lit_localize.WI)("Error searching agents")}
            .error=${this._searchProfiles.value.error.data.data}
          ></display-error>
        `;case"complete":{const agents=this._searchProfiles.value.value;return 0===agents.size?lit.dy`<sl-menu-item>
            ${(0,lit_localize.WI)("No agents match the filter")}
          </sl-menu-item>`:lit.dy`
          ${Array.from(agents.entries()).map((([pubkey,profile])=>lit.dy`
              <sl-menu-item .value=${(0,lib.E6)(pubkey)}>
                <agent-avatar
                  slot="prefix"
                  .agentPubKey=${pubkey}
                  style="margin-right: 16px"
                ></agent-avatar>
                ${profile.nickname}
              </sl-menu-item>
            `))}
        `}}}get _label(){let l=this.fieldLabel?this.fieldLabel:(0,lit_localize.WI)("Search Agent");return!1!==this.required&&(l=`${l} *`),l}render(){return lit.dy`
      <div style="flex: 1; display: flex;">
        <sl-dropdown id="dropdown">
          <sl-input
            id="textfield"
            slot="trigger"
            .label=${this._label}
            .placeholder=${(0,lit_localize.WI)("At least 3 chars...")}
            @input=${()=>this.onFilterChange()}
          ></sl-input>
          <sl-menu
            @sl-select=${e=>{this.onUsernameSelected((0,lib.jm)(e.detail.item.value))}}
          >
            ${this.renderAgentList()}
          </sl-menu>
        </sl-dropdown>
      </div>
    `}static get styles(){return[elements_dist.FG,lit.iv`
        :host {
          display: flex;
        }
        #list {
          margin-top: 16px;
          margin-left: 16px;
        }
      `]}};(0,tslib_es6.gn)([(0,decorators.Cb)()],SearchAgent.prototype,"name",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)((0,elements_dist.uA)("default-value"))],SearchAgent.prototype,"defaultValue",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)()],SearchAgent.prototype,"required",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)()],SearchAgent.prototype,"disabled",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)({type:Boolean,attribute:"clear-on-select"})],SearchAgent.prototype,"clearOnSelect",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)({type:Boolean,attribute:"include-myself"})],SearchAgent.prototype,"includeMyself",void 0),(0,tslib_es6.gn)([(0,decorators.Cb)({type:String,attribute:"field-label"})],SearchAgent.prototype,"fieldLabel",void 0),(0,tslib_es6.gn)([(0,context.F_)({context:dist_context.M,subscribe:!0}),(0,decorators.Cb)()],SearchAgent.prototype,"store",void 0),(0,tslib_es6.gn)([(0,decorators.SB)()],SearchAgent.prototype,"value",void 0),(0,tslib_es6.gn)([(0,decorators.SB)()],SearchAgent.prototype,"_searchProfiles",void 0),(0,tslib_es6.gn)([(0,decorators.IO)("#textfield")],SearchAgent.prototype,"_textField",void 0),(0,tslib_es6.gn)([(0,decorators.IO)("#dropdown")],SearchAgent.prototype,"dropdown",void 0),SearchAgent=(0,tslib_es6.gn)([(0,lit_localize.kI)(),(0,decorators.Mo)("search-agent")],SearchAgent);__webpack_require__("./ui/dist/elements/profiles-context.js");var mocks=__webpack_require__("./ui/dist/mocks.js"),ui_dist=__webpack_require__("./ui/dist/index.js");const search_agent_stories={title:"Frontend/Elements/search-agent",tags:["autodocs"],component:"search-agent",render:args=>lit_html.dy` <profiles-context
      .store=${new ui_dist._p(new ui_dist.Y3(new mocks.M))}
      ><div style="height: 200px"><search-agent></search-agent></div
    ></profiles-context>`},Demo={},__namedExportsOrder=["Demo"];Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=search-agent-stories.5aeb010e.iframe.bundle.js.map