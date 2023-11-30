import { intro, progress } from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';

(async () => {
	const packages = [
		'@changesets/cli',
		'@types/node',
		'organize-imports-cli',
		'prettier',
		'typescript',
		'unbuild',
	];

	const bar = progress({
		type: 'pkg',
		total: packages.length,
		barSize: 40,
	});

	intro('🥦 Taze');

	bar.start();
	await sleep(1000);
	for (let i = 0; i < packages.length; i++) {
		bar.update(i + 1, packages[i]);
		// bar.increment()
		await sleep(825);
	}

	bar.submit('TETE SUC SUC');
	bar.close();
})();
