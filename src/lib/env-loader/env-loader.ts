export interface EnvLoader {
    /**
     * Override existing properties in standard .env file with properties from custom .env file
     *
     * @param fileName {string}
     */
    overwriteExistsFieldsConfig(fileName: string): Promise<void>;
}
