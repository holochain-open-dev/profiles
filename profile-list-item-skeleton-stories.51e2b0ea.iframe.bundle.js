(self.webpackChunk_holochain_open_dev_profiles_dev=self.webpackChunk_holochain_open_dev_profiles_dev||[]).push([[827],{"./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var lit=__webpack_require__("./node_modules/lit/index.js"),skeleton_styles_default=lit.AH`
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
    `}};chunk_F4NP2SRV_SlSkeleton.styles=[chunk_TUVJKY7S.$,skeleton_styles_default],(0,chunk_KAW7D32O.Cc)([(0,decorators.MZ)()],chunk_F4NP2SRV_SlSkeleton.prototype,"effect",2);chunk_F4NP2SRV_SlSkeleton.define("sl-skeleton")},"./stories/profile-list-item-skeleton.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Demo:()=>Demo,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var lit_html__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-html/lit-html.js");__webpack_require__("./ui/dist/elements/profile-list-item-skeleton.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Frontend/Elements/profile-list-item-skeleton",tags:["autodocs"],component:"profile-list-item-skeleton",render:args=>lit_html__WEBPACK_IMPORTED_MODULE_0__.qy`
      <profile-list-item-skeleton />
      <profile-list-item-skeleton />
      <profile-list-item-skeleton />
    `},Demo={};Demo.parameters={...Demo.parameters,docs:{...Demo.parameters?.docs,source:{originalSource:"{}",...Demo.parameters?.docs?.source}}};const __namedExportsOrder=["Demo"]},"./ui/dist/elements/profile-list-item-skeleton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit/decorators.js"),_holochain_open_dev_elements__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@holochain-open-dev/elements/dist/index.js");__webpack_require__("./node_modules/@shoelace-style/shoelace/dist/components/skeleton/skeleton.js");let ProfileListItemSkeleton=class ProfileListItemSkeleton extends lit__WEBPACK_IMPORTED_MODULE_0__.WF{render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div class="row" style="align-items: center; width: 150px">
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
      `]}};ProfileListItemSkeleton=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.EM)("profile-list-item-skeleton")],ProfileListItemSkeleton)},"?d0c6":()=>{}}]);
//# sourceMappingURL=profile-list-item-skeleton-stories.51e2b0ea.iframe.bundle.js.map