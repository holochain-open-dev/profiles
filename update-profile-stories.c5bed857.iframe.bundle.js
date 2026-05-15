"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[940],{"./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.36O46B5H.js").p.define("sl-spinner");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js")},"./stories/update-profile.stories.js":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./ui/dist/elements/update-profile.js"),__webpack_require__("./ui/dist/elements/profiles-context.js"),__webpack_require__("./ui/dist/mocks.js")),_holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./ui/dist/index.js");const mock=new _holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.KE(await(0,_holochain_open_dev_profiles_dist_mocks_js__WEBPACK_IMPORTED_MODULE_3__.IX)()),__WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/update-profile",tags:["autodocs"],component:"update-profile",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.qy` <profiles-context
      .store=${new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.Qj(new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.gd(mock))}
    >
      <update-profile />
    </profiles-context>`},Demo={};Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}};const __namedExportsOrder=["Demo"];__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}),1)},"./ui/dist/elements/edit-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_lit_context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit/context/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_10__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/avatar/avatar.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/button/button.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/input/input.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/icon/icon.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/select-avatar.js"),__webpack_require__("./ui/dist/context.js"));let EditProfile=class EditProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{constructor(){super(...arguments),this.allowCancel=!1}avatarMode(){return"avatar-required"===this.store.config.avatarMode||"avatar-optional"===this.store.config.avatarMode}fireSaveProfile(fields){const nickname=fields.nickname;delete fields.nickname;const profile={fields,nickname};this.dispatchEvent(new CustomEvent("save-profile",{detail:{profile},bubbles:!0,composed:!0}))}fireCancel(){this.dispatchEvent(new CustomEvent("cancel-edit-profile",{bubbles:!0,composed:!0}))}renderField(fieldConfig){var _a;return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <sl-input
        name="${fieldConfig.name}"
        .required=${fieldConfig.required}
        .label=${fieldConfig.label}
        .value=${(null===(_a=this.profile)||void 0===_a?void 0:_a.entry.fields[fieldConfig.name])||""}
        style="margin-bottom: 16px;"
      ></sl-input>
    `}render(){var _a,_b,_c;return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <form
        id="profile-form"
        class="column"
        ${(0,_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.Kg)((fields=>this.fireSaveProfile(fields)))}
      >
        <div
          class="row"
          style="justify-content: center; align-self: start; margin-bottom: 16px"
        >
          ${this.avatarMode()?lit__WEBPACK_IMPORTED_MODULE_0__.qy` <select-avatar
                name="avatar"
                .value=${(null===(_a=this.profile)||void 0===_a?void 0:_a.entry.fields.avatar)||void 0}
                .required=${"avatar-required"===this.store.config.avatarMode}
              ></select-avatar>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy``}

          <sl-input
            name="nickname"
            .label=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.ab)("Nickname")}
            required
            minLength="${this.store.config.minNicknameLength}"
            .value=${(null===(_b=this.profile)||void 0===_b?void 0:_b.entry.nickname)||""}
            .helpText=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.ab)(_lit_localize__WEBPACK_IMPORTED_MODULE_2__.gx`Min. ${this.store.config.minNicknameLength} characters`)}
            style="margin-left: 16px;"
          ></sl-input>
        </div>

        ${this.store.config.additionalFields.map((field=>this.renderField(field)))}

        <div class="row" style="margin-top: 8px;">
          ${this.allowCancel?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                <sl-button
                  style="flex: 1; margin-right: 6px;"
                  @click=${()=>this.fireCancel()}
                >
                  ${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.ab)("Cancel")}
                </sl-button>
              `:lit__WEBPACK_IMPORTED_MODULE_0__.qy``}

          <sl-button style="flex: 1;" variant="primary" type="submit"
            >${null!==(_c=this.saveProfileLabel)&&void 0!==_c?_c:(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.ab)("Save Profile")}
          </sl-button>
        </div>
      </form>
    `}};EditProfile.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.gM],(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)({type:Object})],EditProfile.prototype,"profile",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)({type:String,attribute:"save-profile-label"})],EditProfile.prototype,"saveProfileLabel",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,_lit_context__WEBPACK_IMPORTED_MODULE_3__.Fg)({context:_context_js__WEBPACK_IMPORTED_MODULE_10__.d,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)()],EditProfile.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)({type:Boolean,attribute:"allow-cancel"})],EditProfile.prototype,"allowCancel",void 0),EditProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_11__.Cg)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.cc)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("edit-profile")],EditProfile)},"./ui/dist/elements/update-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/context/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js"),__webpack_require__("./ui/dist/elements/edit-profile.js"),__webpack_require__("./ui/dist/context.js"));let UpdateProfile=class UpdateProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{constructor(){super(...arguments),this._myProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__.GG(this,(()=>this.store.myProfile),(()=>[this.store]))}async updateProfile(profile){await this.store.client.updateProfile(profile),this.dispatchEvent(new CustomEvent("profile-updated",{detail:{profile},bubbles:!0,composed:!0}))}render(){switch(this._myProfile.value.status){case"pending":return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div
          class="column"
          style="align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner></sl-spinner>
        </div>`;case"complete":return lit__WEBPACK_IMPORTED_MODULE_0__.qy` <edit-profile
          .allowCancel=${!0}
          style="margin-top: 16px; flex: 1"
          .profile=${this._myProfile.value.value}
          .saveProfileLabel=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.ab)("Update Profile")}
          @save-profile=${e=>this.updateProfile(e.detail.profile)}
        ></edit-profile>`;case"error":return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<display-error
          .headline=${(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.ab)("Error fetching your profile")}
          .error=${this._myProfile.value.error}
        ></display-error>`}}static get styles(){return[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__.gM,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
        :host {
          display: flex;
        }
      `]}};(0,tslib__WEBPACK_IMPORTED_MODULE_10__.Cg)([(0,_lit_context__WEBPACK_IMPORTED_MODULE_2__.Fg)({context:_context_js__WEBPACK_IMPORTED_MODULE_9__.d,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.MZ)()],UpdateProfile.prototype,"store",void 0),UpdateProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.Cg)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_3__.cc)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("update-profile")],UpdateProfile)}}]);
//# sourceMappingURL=update-profile-stories.c5bed857.iframe.bundle.js.map