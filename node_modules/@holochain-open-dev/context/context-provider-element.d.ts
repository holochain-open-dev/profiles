import { LitElement } from 'lit';
export declare class ContextProviderElement extends LitElement {
    private localValue?;
    set value(value: any);
    private context?;
    set name(value: string);
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResultGroup;
}
