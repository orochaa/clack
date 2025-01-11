import { stdin, stdout } from 'node:process';
import type { Key } from 'node:readline';
import * as readline from 'node:readline';
import type { Readable } from 'node:stream';
import { cursor } from 'sisteransi';
import { isActionKey } from './settings';

export * from './string';
export * from './settings';

const isWindows = globalThis.process.platform.startsWith('win');

export const CANCEL_SYMBOL = Symbol('clack:cancel');

export function isCancel(value: unknown): value is symbol {
	return value === CANCEL_SYMBOL;
}

export function setRawMode(input: Readable, value: boolean) {
	const i = input as typeof stdin;

	if (i.isTTY) i.setRawMode(value);
}

export function block({
	input = stdin,
	output = stdout,
	overwrite = true,
	hideCursor = true,
} = {}) {
	const rl = readline.createInterface({
		input,
		output,
		prompt: '',
		tabSize: 1,
	});
	readline.emitKeypressEvents(input, rl);
	if (input.isTTY) input.setRawMode(true);

	const clear = (data: Buffer, { name, sequence }: Key) => {
		const str = String(data);
		if (isActionKey([str, name, sequence], 'cancel')) {
			if (hideCursor) output.write(cursor.show);
			process.exit(0);
			return;
		}
		if (!overwrite) return;
		const dx = name === 'return' ? 0 : -1;
		const dy = name === 'return' ? -1 : 0;

		readline.moveCursor(output, dx, dy, () => {
			readline.clearLine(output, 1, () => {
				input.once('keypress', clear);
			});
		});
	};
	if (hideCursor) output.write(cursor.hide);
	input.once('keypress', clear);

	return () => {
		input.off('keypress', clear);
		if (hideCursor) output.write(cursor.show);

		// Prevent Windows specific issues: https://github.com/natemoo-re/clack/issues/176
		if (input.isTTY && !isWindows) input.setRawMode(false);

		// @ts-expect-error fix for https://github.com/nodejs/node/issues/31762#issuecomment-1441223907
		rl.terminal = false;
		rl.close();
	};
}

export function strLength(input: string) {
	let length = 0;
	let i = 0;

	while (i < input.length) {
		if (input[i] === '\u001b') {
			// Check for escape character (ANSI escape code)
			const endIndex = input.indexOf('m', i + 1); // Find the end of ANSI code
			if (endIndex === -1) {
				i++; // Skip the escape character and continue
				continue;
			} else {
				i = endIndex + 1;
				continue;
			}
		}
		// Handle other control codes or regular characters
		const code = input.charCodeAt(i);

		if (code >= 0xd800 && code <= 0xdbff) {
			i += 2;
		} else {
			length++;
			i++;
		}
	}

	return length;
}
