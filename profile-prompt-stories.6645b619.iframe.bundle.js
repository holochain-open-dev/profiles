"use strict";(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[240],{"./node_modules/@shoelace-style/shoelace/dist/components/card/card.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var chunk_BCEYT3RT=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),chunk_DUT32TWM=__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),card_styles_default=chunk_DUT32TWM.i`
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
    `}};SlCard.styles=card_styles_default,SlCard=(0,chunk_LKA3TPUC.u2)([(0,chunk_ROLL4627.e)("sl-card")],SlCard);__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.UP75L23G.js")},"./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DBJ5ZVU.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TA75SLJE.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3I3TA2Y.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.L2X53Y67.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ROLL4627.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BCEYT3RT.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.DUT32TWM.js"),__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/chunks/chunk.LKA3TPUC.js")},"./ui/dist/elements/create-profile.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/card/card.js"),__webpack_require__("./ui/dist/elements/edit-profile.js"),__webpack_require__("./ui/dist/context.js"));let CreateProfile=class CreateProfile extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{async createProfile(profile){await this.store.client.createProfile(profile),this.dispatchEvent(new CustomEvent("profile-created",{detail:{profile},bubbles:!0,composed:!0}))}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.dy`
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
    `}};EditProfile.styles=[_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_4__.FG],(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Object})],EditProfile.prototype,"profile",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:String,attribute:"save-profile-label"})],EditProfile.prototype,"saveProfileLabel",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_10__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],EditProfile.prototype,"store",void 0),(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)({type:Boolean,attribute:"allow-cancel"})],EditProfile.prototype,"allowCancel",void 0),EditProfile=(0,tslib__WEBPACK_IMPORTED_MODULE_11__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("edit-profile")],EditProfile)},"./ui/dist/elements/profile-prompt.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var tslib__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/tslib/tslib.es6.js"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_lit_localize__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@lit/localize/lit-localize.js"),_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@lit-labs/context/index.js"),_holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@holochain-open-dev/stores/dist/index.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js"),_context_js__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/spinner/spinner.js"),__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/elements/display-error.js"),__webpack_require__("./ui/dist/elements/create-profile.js"),__webpack_require__("./ui/dist/context.js"));let ProfilePrompt=class ProfilePrompt extends lit__WEBPACK_IMPORTED_MODULE_0__.oi{constructor(){super(...arguments),this._myProfile=new _holochain_open_dev_stores__WEBPACK_IMPORTED_MODULE_4__.oA(this,(()=>this.store.myProfile))}renderPrompt(myProfile){return myProfile?lit__WEBPACK_IMPORTED_MODULE_0__.dy`<slot></slot>`:lit__WEBPACK_IMPORTED_MODULE_0__.dy`
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
      `]}};(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_labs_context__WEBPACK_IMPORTED_MODULE_3__.F_)({context:_context_js__WEBPACK_IMPORTED_MODULE_9__.M,subscribe:!0}),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Cb)()],ProfilePrompt.prototype,"store",void 0),ProfilePrompt=(0,tslib__WEBPACK_IMPORTED_MODULE_10__.gn)([(0,_lit_localize__WEBPACK_IMPORTED_MODULE_2__.kI)(),(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.Mo)("profile-prompt")],ProfilePrompt)},"./stories/profile-prompt.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js"),_holochain_open_dev_profiles_mocks__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./ui/dist/elements/profile-prompt.js"),__webpack_require__("./ui/dist/elements/profiles-context.js"),__webpack_require__("./ui/dist/mocks.js")),_holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./ui/dist/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/profile-prompt",tags:["autodocs"],component:"profile-prompt",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.dy` <profiles-context
      .store=${new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__._p(new _holochain_open_dev_profiles__WEBPACK_IMPORTED_MODULE_4__.Y3(new _holochain_open_dev_profiles_mocks__WEBPACK_IMPORTED_MODULE_3__.M,"lobby"))}
    >
      <profile-prompt
        >You have successfully created your profile! Now the application
        elements should appear here. Click "Show code" to see how you can
        include your elements.</profile-prompt
      ></profiles-context
    >`,argTypes:{}},Demo={},__namedExportsOrder=["Demo"];Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=profile-prompt-stories.6645b619.iframe.bundle.js.map