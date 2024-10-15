import { Signal } from '@holochain-open-dev/signals';
import { HoloHash } from '@holochain/client';

export function areHashesArraysEqual(
	hashes1: HoloHash[],
	hashes2: HoloHash[],
): boolean {
	if (hashes1.length !== hashes2.length) return false;

	for (let i = 0; i < hashes1.length; i++) {
		if (hashes1[i].toString() !== hashes2[i].toString()) {
			return false;
		}
	}
	return true;
}

// NOTE: This scheduling logic is too basic to be useful. Do not copy/paste.
// This function would usually live in a library/framework, not application code
let pending = false;

const w = new Signal.subtle.Watcher(() => {
	if (!pending) {
		pending = true;
		queueMicrotask(() => {
			pending = false;
			for (const s of w.getPending()) s.get();
			w.watch();
		});
	}
});

// TODO: why do we need to use this complicated effect method?
// An effect effect Signal which evaluates to cb, which schedules a read of
// itself on the microtask queue whenever one of its dependencies might change
export function effect(cb: any) {
	let destructor: any;
	const c = new Signal.Computed(() => {
		if (typeof destructor === 'function') {
			destructor();
		}
		destructor = cb();
	});
	w.watch(c);
	c.get();
	return () => {
		if (typeof destructor === 'function') {
			destructor();
		}
		w.unwatch(c);
	};
}
