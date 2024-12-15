import { randomUUID } from 'node:crypto';
import color from 'picocolors';
import { formatPlaceholder, limitOptions } from '../../src/utils';

describe('format', () => {
	describe('limitOptions()', () => {
		const options = Array.from(Array(40).keys()).map(String);
		const limit = color.dim('...');

		it('should not limit options', () => {
			const result = limitOptions({
				options,
				maxItems: undefined,
				cursor: 0,
				style(option, active) {
					return option;
				},
			});

			expect(result).toHaveLength(result.length);
		});

		it('should limit bottom options', () => {
			const maxItems = 5;

			const result = limitOptions({
				options,
				maxItems,
				cursor: 0,
				style(option, active) {
					return option;
				},
			});

			expect(result).toHaveLength(maxItems);
			expect(result[0]).toBe(options[0]);
			expect(result[result.length - 1]).toBe(limit);
		});

		it('should limit top options', () => {
			const maxItems = 5;

			const result = limitOptions({
				options,
				maxItems,
				cursor: options.length - 1,
				style(option, active) {
					return option;
				},
			});

			expect(result).toHaveLength(maxItems);
			expect(result[0]).toBe(limit);
			expect(result[result.length - 1]).toBe(options[options.length - 1]);
		});

		it('should limit top and bottom options', () => {
			const maxItems = 5;
			const middleOption = Math.floor(maxItems / 2);
			const cursor = Math.floor(options.length / 2);

			const result = limitOptions({
				options,
				maxItems,
				cursor,
				style(option, active) {
					return option;
				},
			});

			expect(result).toHaveLength(maxItems);
			expect(result[0]).toBe(limit);
			expect(result[middleOption]).toBe(options[cursor]);
			expect(result[result.length - 1]).toBe(limit);
		});

		it('should limit by terminal rows', () => {
			const maxTerminalRows = 20;
			process.stdout.rows = maxTerminalRows;

			const result = limitOptions({
				options,
				maxItems: undefined,
				cursor: 0,
				style(option, active) {
					return option;
				},
			});

			expect(result).toHaveLength(maxTerminalRows - 4);
			expect(result[0]).toBe(options[0]);
			expect(result[result.length - 1]).toBe(limit);
		});
	});

	describe('formatPlaceholder()', () => {
		it('should return cursor', () => {
			const result = formatPlaceholder(undefined);

			expect(result).toBe(color.inverse(color.hidden('_')));
		});

		it('should return placeholder', () => {
			const value = randomUUID();
			const placeholder = color.inverse(value[0]) + color.dim(value.slice(1));

			const result = formatPlaceholder(value);

			expect(result).toBe(placeholder);
		});
	});
});
