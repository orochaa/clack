import { randomUUID } from 'crypto';
import { Task, tasks } from '../../src';

const mocks = vi.hoisted(() => ({
	startSpy: vi.fn(),
	messageSpy: vi.fn(),
	stopSpy: vi.fn(),
}));

vi.mock('../../src/prompts/spinner', () => ({
	default: () => ({
		start: mocks.startSpy,
		message: mocks.messageSpy,
		stop: mocks.stopSpy,
	}),
}));

describe('tasks', () => {
	it('should start tasks in sequence', async () => {
		const length = 3;
		let data: Task[] = Array.from(Array(length).keys()).map((i) => ({
			title: String(i),
			async task(message) {},
		}));

		await tasks(data);

		expect.assertions(length);
		for (let i = 0; i < length; i++) {
			expect(mocks.startSpy).toHaveBeenNthCalledWith(i + 1, String(i));
		}
	});

	it('should skip disabled task', async () => {
		const length = 3;
		let data: Task[] = Array.from(Array(length).keys()).map((i) => ({
			title: String(i),
			enabled: !(i === 1),
			async task(message) {},
		}));

		await tasks(data);

		expect(mocks.startSpy).toHaveBeenNthCalledWith(1, String(0));
		expect(mocks.startSpy).toHaveBeenNthCalledWith(2, String(2));
	});

	it('should stop tasks in sequence', async () => {
		const length = 3;
		let data: Task[] = Array.from(Array(length).keys()).map((i) => ({
			title: String(i),
			async task(message) {},
		}));

		await tasks(data);

		expect.assertions(length);
		for (let i = 0; i < length; i++) {
			expect(mocks.stopSpy).toHaveBeenNthCalledWith(i + 1, String(i));
		}
	});

	it('should update task message', async () => {
		const msg = randomUUID();

		await tasks([
			{
				title: '',
				task(message) {
					message(msg);
				},
			},
		]);

		expect(mocks.messageSpy).toHaveBeenCalledWith(msg);
	});

	it('should stop task with returned message', async () => {
		const msg = randomUUID();

		await tasks([
			{
				title: '',
				task() {
					return msg;
				},
			},
		]);

		expect(mocks.stopSpy).toHaveBeenCalledWith(msg);
	});
});
