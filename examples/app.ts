import * as process from 'process';

import { EnvLoader, EnvLoaderImpl } from 'src/lib';

export async function app(): Promise<void> {
    const envLoader: EnvLoader = new EnvLoaderImpl();

    console.log(`Before .env SERVER_NAME property: ${process.env.SERVER_NAME}`); //#standart-app
    console.log(`Before .env SERVER_PORT property: ${process.env.SERVER_PORT}`); //#3030

    await envLoader.overwriteExistsFieldsConfig('.env.app');

    console.log(`After .env.app SERVER_NAME property: ${process.env.SERVER_NAME}`); //#test-app
    console.log(`After .env.app SERVER_PORT property: ${process.env.SERVER_PORT}`); //#8080
    console.log(`Before .env SERVER_HOST property: ${process.env.SERVER_HOST}`); //#127.0.0.1
}

app().then(() => {});
