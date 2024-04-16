import { describe } from '@jest/globals'
import { configuration } from '../src/config'

// These are end-to-end tests and need an api key
describe('Configuration', () => {

    it('fails if TOMTOM_API_KEY is not set', () => {
        expect(configuration).toThrow()
    })

    it('returns configuration', () => {
        process.env.TOMTOM_API_KEY = "test-api-key"
        const config = configuration()
        expect(config.TOMTOM_API_KEY).toBeTruthy()
    })
})
