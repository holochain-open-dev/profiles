import { HoloHash } from "@holochain/client";


export function areHashesArraysEqual(hashes1: HoloHash[], hashes2: HoloHash[]): boolean {
	if (hashes1.length !== hashes2.length) return false;

	for (let i = 0; i < hashes1.length; i++) {
		if (hashes1[i].toString() !== hashes2[i].toString()) {
			return false;
		}
	}
	return true;
}
