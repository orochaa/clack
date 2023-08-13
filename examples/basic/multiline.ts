import * as p from '@clack/prompts';

(async () => {
	await p.text({
		message:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		initialValue:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		validate: (v) => {
			if (v === 'test') {
				return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.';
			}
		},
	});
	await p.password({
		message:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
	});
	await p.select({
		message:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		options: [
			{
				label:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
		],
		initialValue:
			'Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		maxItems: 5,
	});
	await p.multiselect({
		message:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		options: [
			{
				label:
					'1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'3Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'3Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'4Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'4Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'5Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'5Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
			{
				label:
					'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
				value:
					'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
			},
		],
	});
	p.note('6Lore ipsum dolor sit amet, consectetur adipisicing ');
	p.note(
		'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.'
	);
	p.note(
		'6Lore ipsum dolor sit amet, consectetur adipisicing ',
		'6Lore ipsum dolor sit amet, consectetur adipisicing '
	);
	p.note(
		'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.',
		'6Lore ipsum dolor sit amet, consectetur adipisicing '
	);
	p.intro(
		'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.'
	);
	p.cancel(
		'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.'
	);
	p.outro(
		'6Lore ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum.'
	);

	p.intro('spinner start...');

	const spin = p.spinner();
	const total = 10000;
	let progress = 0;
	spin.start();

	new Promise((resolve) => {
		const timer = setInterval(() => {
			progress = Math.min(total, progress + 100);
			if (progress >= total) {
				clearInterval(timer);
				resolve(true);
			}
			spin.message(
				`Loading lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eaque error eum ex, fugiat harum labore laboriosam libero magnam maiores modi natus optio quae quod recusandae repellendus sapiente vero voluptatum. [${progress}/${total}]`
			); // <===
		}, 100);
	}).then(() => {
		spin.stop(`Done`);
		p.outro('spinner stop...');
	});
})();
