/**
 * `Jest` does not fully support ESM. Because of it do NOT remove these mocks!
 *
 * Related Jest Issue:
 * 	title: Native support for ES Modules #9430
 * 	url: https://github.com/jestjs/vi/issues/9430
 **/

vi.mock('wrap-ansi', () => (str: string) => str);

vi.mock('is-unicode-supported', () => () => true);
