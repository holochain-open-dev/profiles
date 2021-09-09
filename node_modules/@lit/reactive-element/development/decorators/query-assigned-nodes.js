/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { decorateProperty } from './base.js';
/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given named `slot`. Note, the type of
 * this property should be annotated as `NodeListOf<HTMLElement>`.
 *
 * @param slotName A string name of the slot.
 * @param flatten A boolean which when true flattens the assigned nodes,
 *     meaning any assigned nodes that are slot elements are replaced with their
 *     assigned nodes.
 * @param selector A string which filters the results to elements that match
 *     the given css selector.
 *
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes('list', true, '.item')
 *   listItems;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
export function queryAssignedNodes(slotName = '', flatten = false, selector = '') {
    return decorateProperty({
        descriptor: (_name) => ({
            get() {
                var _a, _b, _c;
                const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
                const slot = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(slotSelector);
                let nodes = (_c = (_b = slot) === null || _b === void 0 ? void 0 : _b.assignedNodes({ flatten })) !== null && _c !== void 0 ? _c : [];
                if (selector) {
                    nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE &&
                        node.matches(selector));
                }
                return nodes;
            },
            enumerable: true,
            configurable: true,
        }),
    });
}
//# sourceMappingURL=query-assigned-nodes.js.map