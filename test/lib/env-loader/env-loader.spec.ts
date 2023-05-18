import { EnvLoader, EnvLoaderImpl } from 'src/lib';

describe('EnvLoader', () => {
    let envLoader: EnvLoader;

    beforeEach(() => {
        envLoader = new EnvLoaderImpl();
    });

    describe('when instance is EnvLoader load default env config to process.env', () => {
        test('should have a process.env property named SERVER_NAME', () => {
            expect(process.env.SERVER_NAME).toEqual('standart-app');
        });
        test('should have a process.env property named SERVER_PORT', () => {
            expect(process.env.SERVER_PORT).toEqual('3030');
        });
        test('should have a process.env property named SERVER_HOST', () => {
            expect(process.env.SERVER_HOST).toEqual('127.0.0.1');
        });
    });

    describe('when instance is EnvLoader load env config from .env.test to process.env', () => {
        beforeEach(async () => {
            await envLoader.overwriteExistsFieldsConfig('.env.test');
        });

        test('should have a process.env property named SERVER_NAME', () => {
            expect(process.env.SERVER_NAME).toEqual('test-app');
        });
        test('should have a process.env property named SERVER_PORT', () => {
            expect(process.env.SERVER_PORT).toEqual('5555');
        });
        test('should have a process.env property named SERVER_HOST', () => {
            expect(process.env.SERVER_HOST).toEqual('127.0.0.1');
        });
    });

    describe('when instance is EnvLoader load env config from .env.test2 to process.env', () => {
        test('should not found file', async () => {
            await envLoader.overwriteExistsFieldsConfig('.env.999.test');
        });
    });
});
