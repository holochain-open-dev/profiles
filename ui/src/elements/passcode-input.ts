import { sharedStyles } from '@holochain-open-dev/elements';
import { SlInput } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('passcode-input')
export class PasscodeInput extends LitElement {
	@property()
	passcodeLength: number = 4;

	firstUpdated() {
		setTimeout(() => {
			this.shadowRoot!.getElementById('input-0')?.focus();
		});
	}
	get passcode(): Array<number> | undefined {
		const inputs = Array.from(this.shadowRoot!.querySelectorAll('sl-input'));
		const passcode = Array.from(Array(this.passcodeLength)).map(
			() => undefined,
		) as Array<number | undefined>;

		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].value === '') return undefined;
			const value = parseInt(inputs[i].value, 10);
			if (value > 9) return undefined;
			passcode[i] = value;
		}

		return passcode as Array<number>;
	}

	clearPasscode() {
		const inputs = Array.from(this.shadowRoot!.querySelectorAll('sl-input'));
		inputs.forEach(i => (i.value = ''));
		setTimeout(() => {
			this.shadowRoot!.getElementById('input-0')?.focus();
		});
	}

	maybeDispatchEvent() {
		const passcode = this.passcode;
		if (!passcode) return;

		this.dispatchEvent(
			new CustomEvent('passcode-change', {
				bubbles: true,
				composed: true,
				detail: {
					passcode,
				},
			}),
		);
	}

	render() {
		return html`
			<div class="row">
				${Array.from(Array(this.passcodeLength)).map(
					(_, i) =>
						html`<sl-input
							id="input-${i}"
							min="0"
							max="9"
							style="width: 4em"
							size="large"
							@keydown=${(e: KeyboardEvent) => {
								if (e.key === 'Backspace') {
									const input = e.target as SlInput;
									if (input.value === '') {
										const previousInput = this.shadowRoot!.getElementById(
											`input-${i - 1}`,
										) as SlInput;
										if (previousInput) previousInput.value = '';

										setTimeout(() => {
											const previousInput = this.shadowRoot!.getElementById(
												`input-${i - 1}`,
											);
											if (previousInput) previousInput.focus();
										});
									}
									this.maybeDispatchEvent();
								}
							}}
							@sl-input=${(e: CustomEvent) => {
								const target = e.target as SlInput;
								if (!target.value.match(/^[0-9]$/g)) {
									target.value = '';
									return;
								}
								const nextInput = this.shadowRoot!.getElementById(
									`input-${i + 1}`,
								);
								if (nextInput) nextInput.focus();
								this.maybeDispatchEvent();
							}}
						></sl-input>`,
				)}
			</div>
		`;
	}

	static styles = [
		sharedStyles,
		css`
			sl-input::part(input) {
				text-align: center;
			}
		`,
	];
}
