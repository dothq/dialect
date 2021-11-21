export const getEnvStr = (provider: string, key: string) => {
    const isDev = process.env.NODE_ENV == "development";

    return isDev
    ? process.env[`${provider.toUpperCase()}_DEV_APP_${key.toUpperCase()}`]
    : process.env[`${provider.toUpperCase()}_PROD_APP_${key.toUpperCase()}`];
}