import { HoloHashB64 } from '@holochain-open-dev/core-types';
import { LitElement, PropertyValues } from 'lit';
export declare class HoloIdenticon extends LitElement {
    hash: HoloHashB64;
    size: number | undefined;
    shape: 'square' | 'circle';
    _canvas: HTMLCanvasElement;
    updated(changedValues: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    static get styles(): import("lit").CSSResultGroup;
}
