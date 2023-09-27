```ts
describe('Prompt', () => {
  const mock = mockPrompt<Prompt>();

  afterEach(() => {
    mock.close();
  });

  it('should set initialValue as value', () => {
    const value = randomUUID();

    new Prompt({
      initialValue: value,
      render() {},
    }).prompt();

    expect(mock.value).toBe(value);
  });
});
```
