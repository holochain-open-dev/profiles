import { HoloHashB64 } from '@holochain-open-dev/core-types';
import { LitElement, PropertyValues } from 'lit';
export declare class HoloIdenticon extends LitElement {
    /**
     * REQUIRED. The hash that will be converted to an identicon.
     */
    hash: HoloHashB64;
    /**
     * Size of the identicon in pixels.
     */
    size: number;
    /**
     * Shape of the identicon.
     */
    shape: 'square' | 'circle';
    private _canvas;
    updated(changedValues: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    static get styles(): import("lit").CSSResult;
}
