"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[31],{"./ui/dist/elements/agent-avatar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),lit__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/lit-html/directives/style-map.js"),_holochain_client__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_12__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/holo-identicon.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./ui/dist/context.js"));let AgentAvatar=class AgentAvatar extends lit__WEBPACK_IMPORTED_MODULE_2__.oi{constructor(){super(...arguments),this.size=32,this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_7__.oA(this,(()=>this.store.profiles.get(this.agentPubKey))),this.justCopiedHash=!1}renderIdenticon(){return lit__WEBPACK_IMPORTED_MODULE_2__.dy` <div
      style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.V)({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
    >
      <holo-identicon .hash=${this.agentPubKey} .size=${this.size}>
      </holo-identicon>
      <div class="badge"><slot name="badge"></slot></div>
    </div>`}async copyHash(){await navigator.clipboard.writeText((0,_holochain_client__WEBPACK_IMPORTED_MODULE_5__.E6)(this.agentPubKey)),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this.shadowRoot.getElementById("tooltip").show(),this.timeout=setTimeout((()=>{this.shadowRoot.getElementById("tooltip").hide(),setTimeout((()=>{this.justCopiedHash=!1}),100)}),2e3)}renderProfile(profile){return profile&&profile.fields.avatar?lit__WEBPACK_IMPORTED_MODULE_2__.dy`
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.WI)("Copied!"):`${(0,_holochain_client__WEBPACK_IMPORTED_MODULE_5__.E6)(this.agentPubKey).substring(0,6)}...`}
        .trigger=${this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        <div
          @click=${()=>this.copyHash()}
          style=${(0,lit_html_directives_style_map_js__WEBPACK_IMPORTED_MODULE_4__.V)({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
        >
          <sl-avatar
            .image=${profile.fields.avatar}
            style="--size: ${this.size}px;"
          >
          </sl-avatar>
          <div class="badge"><slot name="badge"></slot></div></div
      ></sl-tooltip>
    `:this.renderIdenticon()}render(){if("identicon"===this.store.config.avatarMode)return this.renderIdenticon();switch(this._agentProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_2__.dy`<sl-skeleton
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
    `],(0,tslib__WEBPACK_IMPORTED_MODULE_13__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_1__.uA)("agent-pub-key"))],AgentAvatar.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)({type:Number})],AgentAvatar.prototype,"size",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_12__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)()],AgentAvatar.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_13__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.SB)()],AgentAvatar.prototype,"justCopiedHash",void 0),AgentAvatar=(0,tslib__WEBPACK_IMPORTED_MODULE_13__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_6__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Mo)("agent-avatar")],AgentAvatar)},"./ui/dist/elements/create-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/card/card.js"),__webpack_require__("./ui/dist/elements/edit-profile.js"),__webpack_require__("./ui/dist/context.js"));let CreateProfile=class CreateProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{async createProfile(profile){await this.store.client.createProfile(profile),this.dispatchEvent(new CustomEvent("profile-created",{detail:{profile},bubbles:!0,composed:!0}))}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.dy`
      <sl-card>
        <div class="column">
          <span
            class="title"
            style="margin-bottom: 16px; align-self: flex-start"
            >${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.WI)("Create Profile")}</span
          >
          <edit-profile
            .saveProfileLabel=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.WI)("Create Profile")}
            .store=${this.store}
            @save-profile=${e=>this.createProfile(e.detail.profile)}
          ></edit-profile></div
      ></sl-card>
    `}};CreateProfile.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.FG],(0,tslib__WEBPACK_IMPORTED_MODULE_8__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_2__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_7__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],CreateProfile.prototype,"store",void 0),CreateProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_8__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("create-profile")],CreateProfile)},"./ui/dist/elements/edit-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_10__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/button/button.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/input/input.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/icon/icon.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/select-avatar.js"),__webpack_require__("./ui/dist/context.js"));let EditProfile=class EditProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{constructor(){super(...arguments),this.allowCancel=!1}avatarMode(){return"avatar-required"===this.store.config.avatarMode||"avatar-optional"===this.store.config.avatarMode}fireSaveProfile(fields){const nickname=fields.nickname;delete fields.nickname;const profile={fields,nickname};this.dispatchEvent(new CustomEvent("save-profile",{detail:{profile},bubbles:!0,composed:!0}))}fireCancel(){this.dispatchEvent(new CustomEvent("cancel-edit-profile",{bubbles:!0,composed:!0}))}renderField(fieldConfig){var _a;return lit__WEBPACK_IMPORTED_MODULE_0__.dy`
      <sl-input
        name="${fieldConfig.name}"
        .required=${fieldConfig.required}
        .label=${fieldConfig.label}
        .value=${(null===(_a=this.profile)||void 0===_a?void 0:_a.fields[fieldConfig.name])||""}
        style="margin-bottom: 16px;"
      ></sl-input>
    `}render(){var _a,_b,_c;return lit__WEBPACK_IMPORTED_MODULE_0__.dy`
      <form
        id="profile-form"
        class="column"
        ${(0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.MI)((fields=>this.fireSaveProfile(fields)))}
      >
        <div
          class="row"
          style="justify-content: center; align-self: start; margin-bottom: 16px"
        >
          ${this.avatarMode()?lit__WEBPACK_IMPORTED_MODULE_0__.dy` <select-avatar
                name="avatar"
                .value=${(null===(_a=this.profile)||void 0===_a?void 0:_a.fields.avatar)||void 0}
                .required=${"avatar-required"===this.store.config.avatarMode}
              ></select-avatar>`:lit__WEBPACK_IMPORTED_MODULE_0__.dy``}

          <sl-input
            name="nickname"
            .label=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.WI)("Nickname")}
            required
            minLength="${this.store.config.minNicknameLength}"
            .value=${(null===(_b=this.profile)||void 0===_b?void 0:_b.nickname)||""}
            .helpText=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.WI)(_lit_localize__WEBPACK_IMPORTED_MODULE_2__.Bd`Min. ${this.store.config.minNicknameLength} characters`)}
            style="margin-left: 16px;"
          ></sl-input>
        </div>

        ${this.store.config.additionalFields.map((field=>this.renderField(field)))}

        <div class="row" style="margin-top: 8px;">
          ${this.allowCancel?lit__WEBPACK_IMPORTED_MODULE_0__.dy`
                <sl-button
                  style="flex: 1; margin-right: 6px;"
                  @click=${()=>this.fireCancel()}
                >
                  ${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.WI)("Cancel")}
                </sl-button>
              `:lit__WEBPACK_IMPORTED_MODULE_0__.dy``}

          <sl-button style="flex: 1;" variant="primary" type="submit"
            >${null!==(_c=this.saveProfileLabel)&&void 0!==_c?_c:(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.WI)("Save Profile")}
          </sl-button>
        </div>
      </form>
    `}};EditProfile.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.FG],(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Object})],EditProfile.prototype,"profile",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:String,attribute:"save-profile-label"})],EditProfile.prototype,"saveProfileLabel",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_10__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],EditProfile.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Boolean,attribute:"allow-cancel"})],EditProfile.prototype,"allowCancel",void 0),EditProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("edit-profile")],EditProfile)},"./ui/dist/elements/profile-detail.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),lit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/index.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js"),__webpack_require__("./ui/dist/elements/agent-avatar.js"),__webpack_require__("./ui/dist/context.js"));let ProfileDetail=class ProfileDetail extends lit__WEBPACK_IMPORTED_MODULE_1__.oi{constructor(){super(...arguments),this._agentProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_2__.oA(this,(()=>this.store.profiles.get(this.agentPubKey)))}getAdditionalFields(profile){const fields={};for(const[key,value]of Object.entries(profile.fields))"avatar"!==key&&(fields[key]=value);return fields}renderAdditionalField(fieldId,fieldValue){return lit__WEBPACK_IMPORTED_MODULE_1__.dy`
      <div class="column" style="margin-top: 16px">
        <span style="margin-bottom: 8px; ">
          <strong
            >${fieldId.substring(0,1).toUpperCase()}${fieldId.substring(1)}</strong
          ></span
        >
        <span>${fieldValue}</span>
      </div>
    `}renderProfile(profile){return profile?lit__WEBPACK_IMPORTED_MODULE_1__.dy`
      <div class="column">
        <div class="row" style="align-items: center">
          <agent-avatar .agentPubKey=${this.agentPubKey}></agent-avatar>
          <span style="font-size: 16px; margin-left: 8px;"
            >${profile.nickname}</span
          >

          <span style="flex: 1"></span>

          <slot name="action"></slot>
        </div>

        ${Object.entries(this.getAdditionalFields(profile)).filter((([,value])=>""!==value)).map((([key,value])=>this.renderAdditionalField(key,value)))}
      </div>
    `:lit__WEBPACK_IMPORTED_MODULE_1__.dy`<div
        class="column"
        style="align-items: center; justify-content: center; flex: 1;"
      >
        <span class="placeholder"
          >${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_4__.WI)("This agent hasn't created a profile yet")}</span
        >
      </div>`}render(){switch(this._agentProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_1__.dy`
          <div class="column">
            <div class="row" style="align-items: center">
              <sl-skeleton
                effect="pulse"
                style="height: 32px; width: 32px; border-radius: 50%;"
              ></sl-skeleton>
              <div>
                <sl-skeleton
                  effect="pulse"
                  style="width: 122px; margin-left: 8px;"
                ></sl-skeleton>
              </div>
            </div>

            ${this.store.config.additionalFields.map((()=>lit__WEBPACK_IMPORTED_MODULE_1__.dy`
                <sl-skeleton
                  effect="pulse"
                  style="width: 200px; margin-top: 16px;"
                ></sl-skeleton>
              `))}
          </div>
        `;case"complete":return this.renderProfile(this._agentProfile.value.value);case"error":return lit__WEBPACK_IMPORTED_MODULE_1__.dy`<display-error
          .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_4__.WI)("Error fetching the profile")}
          .error=${this._agentProfile.value.error.data.data}
        ></display-error>`}}};ProfileDetail.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__.FG],(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)((0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__.uA)("agent-pub-key"))],ProfileDetail.prototype,"agentPubKey",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_0__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_9__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Cb)()],ProfileDetail.prototype,"store",void 0),ProfileDetail=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_4__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_3__.Mo)("profile-detail")],ProfileDetail)},"./ui/dist/elements/profile-prompt.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./ui/dist/elements/create-profile.js"),__webpack_require__("./ui/dist/context.js"));let ProfilePrompt=class ProfilePrompt extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{constructor(){super(...arguments),this._myProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__.oA(this,(()=>this.store.myProfile))}renderPrompt(myProfile){return myProfile?lit__WEBPACK_IMPORTED_MODULE_0__.dy`<slot></slot>`:lit__WEBPACK_IMPORTED_MODULE_0__.dy`
      <div
        class="column"
        style="align-items: center; justify-content: center; flex: 1; padding-bottom: 10px;"
      >
        <div class="column" style="align-items: center;">
          <slot name="hero"></slot>
          <create-profile></create-profile>
        </div>
      </div>
    `}render(){switch(this._myProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_0__.dy` <div
          class="column"
          style="align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>`;case"complete":return this.renderPrompt(this._myProfile.value.value);case"error":return lit__WEBPACK_IMPORTED_MODULE_0__.dy`<display-error
          .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.WI)("Error fetching your profile")}
          .error=${this._myProfile.value.error}
        ></display-error> `}}static get styles(){return[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__.FG,lit__WEBPACK_IMPORTED_MODULE_0__.iv`
        :host {
          display: flex;
          flex: 1;
        }
      `]}};(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_9__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],ProfilePrompt.prototype,"store",void 0),ProfilePrompt=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("profile-prompt")],ProfilePrompt)},"./ui/dist/elements/update-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js"),__webpack_require__("./ui/dist/elements/edit-profile.js"),__webpack_require__("./ui/dist/context.js"));let UpdateProfile=class UpdateProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{constructor(){super(...arguments),this._myProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__.oA(this,(()=>this.store.myProfile))}async updateProfile(profile){await this.store.client.updateProfile(profile),this.dispatchEvent(new CustomEvent("profile-updated",{detail:{profile},bubbles:!0,composed:!0}))}render(){switch(this._myProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_0__.dy`<div
          class="column"
          style="align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner></sl-spinner>
        </div>`;case"complete":return lit__WEBPACK_IMPORTED_MODULE_0__.dy` <edit-profile
          .allowCancel=${!0}
          style="margin-top: 16px; flex: 1"
          .profile=${this._myProfile.value.value}
          .saveProfileLabel=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.WI)("Update Profile")}
          @save-profile=${e=>this.updateProfile(e.detail.profile)}
        ></edit-profile>`;case"error":return lit__WEBPACK_IMPORTED_MODULE_0__.dy`<display-error
          .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.WI)("Error fetching your profile")}
          .error=${this._myProfile.value.error.data.data}
        ></display-error>`}}static get styles(){return[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__.FG,lit__WEBPACK_IMPORTED_MODULE_0__.iv`
        :host {
          display: flex;
        }
      `]}};(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_2__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_9__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],UpdateProfile.prototype,"store",void 0),UpdateProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("update-profile")],UpdateProfile)},"./stories/my-profile.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>my_profile_stories});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.js"),context=__webpack_require__("./node_modules/@lit-labs/context/index.js"),lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),dist=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),mdi=__webpack_require__("./node_modules/@mdi/js/mdi.js"),dist_context=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/icon-button/icon-button.js"),__webpack_require__("./ui/dist/context.js"));__webpack_require__("./ui/dist/elements/update-profile.js"),__webpack_require__("./ui/dist/elements/profile-detail.js");let MyProfile=class MyProfile extends lit.oi{constructor(){super(...arguments),this._editing=!1}render(){return this._editing?lit.dy`<update-profile
        @profile-updated=${()=>this._editing=!1}
        @cancel-edit-profile=${()=>this._editing=!1}
      ></update-profile>`:lit.dy`
      <profile-detail .agentPubKey=${this.store.client.client.myPubKey}>
        <sl-icon-button
          src="${(0,dist.E7)(mdi.r9)}"
          slot="action"
          @click=${()=>this._editing=!0}
        ></sl-icon-button>
      </profile-detail>
    `}};MyProfile.styles=[dist.FG],(0,tslib_es6.gn)([(0,context.F_)({context:dist_context.M,subscribe:!0}),(0,decorators.Cb)()],MyProfile.prototype,"store",void 0),(0,tslib_es6.gn)([(0,decorators.SB)()],MyProfile.prototype,"_editing",void 0),MyProfile=(0,tslib_es6.gn)([(0,decorators.Mo)("my-profile")],MyProfile);__webpack_require__("./ui/dist/elements/profile-prompt.js"),__webpack_require__("./ui/dist/elements/profiles-context.js");var lib=__webpack_require__("./node_modules/@holochain/client/lib/index.js"),mocks=__webpack_require__("./ui/dist/mocks.js"),ui_dist=__webpack_require__("./ui/dist/index.js");const mock=new mocks.M((0,mocks.O)(),(0,lib.jm)("uhCAk8OKb2hznzG023xxh_vR3Q7Y4IEOAo4B0QN7ZhbGYeww")),my_profile_stories={title:"Frontend/Elements/my-profile",tags:["autodocs"],component:"my-profile",render:args=>lit_html.dy` <profiles-context
      .store=${new ui_dist._p(new ui_dist.Y3(mock))}
    >
      <my-profile></my-profile>
    </profiles-context>`},Demo={},__namedExportsOrder=["Demo"];Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=my-profile-stories.d2096010.iframe.bundle.js.map