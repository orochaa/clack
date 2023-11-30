import type { Readable, Writable } from 'node:stream';
import Prompt from './prompt';

export interface ProgressBarOptions {
	type: string;
	initialValue?: number;
	total: number;
	precision?: number;
	barSize?: number;
	filledBarSymbol?: string;
	emptyBarSymbol?: string;

	input?: Readable;
	output?: Writable;
	render(this: Omit<ProgressBar, 'prompt'>): string | void;
}

export default class ProgressBar extends Prompt {
	private _precision: number;
	private _filledBarSymbol: string;
	private _emptyBarSymbol: string;
	private _barSize: number;
	private _startTime: number;

	public type: string;
	public name: string;
	public total: number;
	public message: string;

	start(initialValue?: number, total?: number): void {
		this._startTime = Date.now();
		this.value = initialValue ?? this.value;
		this.total = total ?? this.total;
		this.prompt();
	}

	close(error?: string): void {
		this.state = error ? 'error' : 'submit';
		this.error = error ?? '';
		this.render();
		super.close();
	}

	submit(message?: string): void {
		this.message = message ?? '';
		this.close();
	}

	increment(): void {
		this.value++;
		this.render();
	}

	update(value: number, name?: string): void {
		this.value = value;
		this.name = name ?? this.name;
		this.render();
	}

	get percentage(): string {
		return ((this.value / this.total) * 100).toFixed(this._precision) + '%';
	}

	get remaining(): number {
		return this.total - this.value;
	}

	get bar(): string {
		const filled = Math.round((this.value * this._barSize) / this.total);
		const empty = this._barSize - filled;
		return this._filledBarSymbol.repeat(filled) + this._emptyBarSymbol.repeat(empty);
	}

	get time(): string {
		const time = Date.now() - this._startTime;
		if (time > 1000) {
			return (time / 1000).toFixed(2) + 's';
		}
		return time + 'ms';
	}

	constructor(opts: ProgressBarOptions) {
		super(opts, false);

		this.type = opts.type;
		this.name = '';
		this.message = '';
		this.value = opts.initialValue ?? 0;
		this.total = opts.total;
		this._precision = opts.precision ?? 0;

		this._barSize = opts.barSize ?? Math.min(this.total, 40);
		this._filledBarSymbol = opts.filledBarSymbol ?? '\u2588';
		this._emptyBarSymbol = opts.emptyBarSymbol ?? '\u2591';

		this._startTime = Date.now();

		this.on('finalize', () => {
			this.state = 'active';
		});
	}
}
