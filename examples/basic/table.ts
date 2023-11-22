import * as p from '@clack/prompts';
import color from 'picocolors';

(async () => {
	p.table([
		['Package', 'Current', 'Latest'].map(color.blue),
		[`axios`, '1.6.1', '1.6.' + color.green('2')],
		[`Prettier ${color.dim('(dev)')}`, '3.0.2', '3.' + color.yellow('1.0')],
		[`@types/node ${color.dim('(dev)')}`, '18.16.0', color.red('20.9.1')],
	]);
	p.table([
		['Package', 'Current', 'Latest','1'].map(color.blue), 
		['Full Line'],
		['4','5','6']
	]);
})();
