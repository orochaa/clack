import { randomUUID } from 'crypto';
import color from 'picocolors';
import { cursor, erase } from 'sisteransi';
import { spinner } from '../../src';
import { dotsInterval, frameInterval, frames } from '../../src/prompts/spinner';
import { S_STEP_CANCEL, S_STEP_ERROR, S_STEP_SUBMIT } from '../../src/utils';

vi.mock('@clack/core', () => ({
	block: () => () => {},
}));

const outputSpy = vi.spyOn(process.stdout, 'write').mockImplementation((() => {}) as any);

describe('spinner', () => {
	const s = spinner();

	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		s.stop();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it("should render dot's animation", () => {
		const message = randomUUID();

		s.start(message);
		const dotsCounter = 5;
		const dotsFrameCounter = dotsCounter / dotsInterval;
		vi.advanceTimersByTime(frameInterval * dotsFrameCounter);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}.`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}..`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}...`);
		expect(outputSpy).not.toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}....`);
	});

	it("should render spinner's animation", () => {
		const message = randomUUID();

		s.start(message);
		vi.advanceTimersByTime(frameInterval * frames.length);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[1])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[2])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[3])}  ${message}`);
	});

	it('should clear prev message after each render', () => {
		const message = randomUUID();

		s.start(message);
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(cursor.move(-999, 0));
		expect(outputSpy).toHaveBeenCalledWith(erase.down(1));
	});

	it('should remove dots from message', () => {
		const message = randomUUID();

		s.start(message + '...');
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}`);
	});

	it("should update spinner's message", () => {
		const message = randomUUID();
		const newMessage = randomUUID();

		s.start(message);
		vi.advanceTimersByTime(frameInterval);
		s.message(newMessage);
		vi.advanceTimersByTime(frameInterval);
		s.message(message);
		vi.advanceTimersByTime(frameInterval);
		s.message(newMessage);
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[1])}  ${newMessage}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[2])}  ${message}`);
		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[3])}  ${newMessage}`);
	});

	it('should prevent invalid message on update', () => {
		const message = randomUUID();

		s.start(message);
		//@ts-expect-error
		s.message(null);
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  ${message}`);
	});

	it('should clear message on update', () => {
		const message = randomUUID();

		s.start(message);
		s.message();
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(`${color.magenta(frames[0])}  `);
	});

	it('should clear message on stop', () => {
		const message = randomUUID();

		s.start(message);
		s.stop();
		vi.advanceTimersByTime(frameInterval);

		expect(outputSpy).toHaveBeenCalledWith(`${color.green(S_STEP_SUBMIT)}  \n`);
	});

	it('should prevent invalid message on update', () => {
		const message = randomUUID();

		s.start(message);
		vi.advanceTimersByTime(frameInterval);
		//@ts-expect-error
		s.stop(null);

		expect(outputSpy).toHaveBeenCalledWith(`${color.green(S_STEP_SUBMIT)}  ${message}\n`);
	});

	it('should update message on stop', () => {
		const message = randomUUID();
		const newMessage = randomUUID();

		s.start(message);
		vi.advanceTimersByTime(frameInterval);
		s.stop(newMessage);

		expect(outputSpy).toHaveBeenCalledWith(`${color.green(S_STEP_SUBMIT)}  ${newMessage}\n`);
	});

	it('should stop spinner on `exit`', () => {
		s.start();
		process.emit('exit', 1);

		expect(outputSpy).toHaveBeenCalledWith(`${color.red(S_STEP_CANCEL)}  Canceled\n`);
	});

	it('should stop spinner on `SIGINT`', () => {
		s.start();
		process.emit('SIGINT');

		expect(outputSpy).toHaveBeenCalledWith(`${color.red(S_STEP_CANCEL)}  Canceled\n`);
	});

	it('should stop spinner on `SIGTERM`', () => {
		s.start();
		process.emit('SIGTERM');

		expect(outputSpy).toHaveBeenCalledWith(`${color.red(S_STEP_CANCEL)}  Canceled\n`);
	});

	it.skip('should stop spinner on `unhandledRejection`', () => {
		s.start();
		process.emit('unhandledRejection', '', new Promise(() => {}));

		expect(outputSpy).toHaveBeenCalledWith(`${color.red(S_STEP_ERROR)}  Something went wrong\n`);
	});

	it('should stop spinner on `uncaughtExceptionMonitor`', () => {
		s.start();
		process.emit('uncaughtExceptionMonitor', new Error());

		expect(outputSpy).toHaveBeenCalledWith(`${color.red(S_STEP_ERROR)}  Something went wrong\n`);
	});
});
