export interface Configuration {
    TOMTOM_API_KEY: string
}

export const configuration = (): Configuration => ({
    TOMTOM_API_KEY: requireDefined('TOMTOM_API_KEY')
})

function requireDefined(environmentVariableName: string): string {
    const value = process.env[environmentVariableName];
    if (value) {
        return value
    }
    throw new Error(`Environment variable ${environmentVariableName} is not set`)
}
