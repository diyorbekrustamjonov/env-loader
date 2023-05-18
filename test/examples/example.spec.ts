import * as examples from 'examples/app';

describe('EnvLoaderApp', () => {
    test('should be run example app', async () => {
        await expect(examples.app()).resolves.toBeUndefined();
    });
});
