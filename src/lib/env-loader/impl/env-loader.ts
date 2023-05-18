import * as fs from 'node:fs';
import * as process from 'node:process';
import * as dotenv from 'dotenv';

import * as Interfaces from '../../env-loader/env-loader';

export class EnvLoaderImpl implements Interfaces.EnvLoader {
    private envMap: Map<string, string> = new Map<string, string>();

    constructor() {
        this.loadDefaultEnvConfig();
    }

    public async overwriteExistsFieldsConfig(fileName: string): Promise<void> {
        const isFileExists = await this.isEnvFileExists(fileName);
        if (isFileExists) {
            const newEnvFileData = await this.parseEnvFile(fileName);
            const defaultEnvConfig = process.env;

            for (const key in defaultEnvConfig) {
                if (Object.prototype.hasOwnProperty.call(defaultEnvConfig, key)) {
                    const element = defaultEnvConfig[key];
                    this.envMap.set(key, element);
                }
            }

            for (const key in newEnvFileData) {
                if (Object.prototype.hasOwnProperty.call(newEnvFileData, key)) {
                    const element = newEnvFileData[key];
                    this.envMap.set(key, element);
                }
            }

            for (const [key, value] of this.envMap) {
                process.env[key] = value;
            }
        }
    }

    private async isEnvFileExists(fileName: string): Promise<boolean> {
        return new Promise((resolve) => {
            fs.access(fileName, fs.constants.F_OK, (err) => {
                if (err) resolve(false);
                else resolve(true);
            });
        });
    }

    private async parseEnvFile(filePath: string): Promise<Record<string, string>> {
        const envFileData = await this.readFile(filePath);
        return dotenv.parse(envFileData);
    }

    private async readFile(filePath: string): Promise<Buffer> {
        return new Promise((resolve) => {
            fs.readFile(filePath, (err, data) => {
                resolve(data);
            });
        });
    }

    private loadDefaultEnvConfig(): void {
        dotenv.config();
    }
}
