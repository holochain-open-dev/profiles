type Options = {
  hash: Uint8Array;
  size?: number; // Default is 32
};

export default function renderIcon(opts: Options, canvas: HTMLCanvasElement): HTMLCanvasElement;
