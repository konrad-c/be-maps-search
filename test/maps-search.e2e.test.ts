import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { queryPlaceAutocompleteApi } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'

config()

const tomtomApiKey: string = process.env.TOMTOM_API_KEY ?? ''

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails({ address: 'Charlotte Street'})
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails({ address: 'Charlotte Street'})
            const firstRes = res.addresses[0];
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('streetName')
            expect(firstRes).toHaveProperty('state')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes).toHaveProperty('postalCode')
        })
    })

    describe('queryPlaceAutocompleteApi', () => {

        it('handles no results', async () => {
            const res = await queryPlaceAutocompleteApi({ tomtomApiKey, address: 'asfasffasfasafsafs' })
            expect(res.addresses).toStrictEqual([])
        })

        
        it('handles error', async () => {
            expect(queryPlaceAutocompleteApi({ tomtomApiKey, address: '' })).rejects.toThrow()
        })

        describe("specifying included countries", () => {
            it('handles specifying included countries', async () => {
                const res = await queryPlaceAutocompleteApi({ tomtomApiKey, address: 'Boulder', countryCodesIncluded: ["CA"] })
                const countryCodes = new Set(res.addresses.map(a => a.countryCode))
                expect(countryCodes.size).toEqual(1)
                expect(countryCodes).toContain("CA")
            })

            it('defaults to AU if unspecified', async () => {
                const res = await queryPlaceAutocompleteApi({ tomtomApiKey, address: 'Boulder' })
                const countryCodes = new Set(res.addresses.map(a => a.countryCode))
                expect(countryCodes.size).toEqual(1)
                expect(countryCodes).toContain("AU")
            })
        })

        describe("specifying limit", () => {
            it('defaults to 100 if no limit provided', async () => {
                const res = await queryPlaceAutocompleteApi({ tomtomApiKey, address: 'Charlotte Street' })
                expect(res.addresses).toHaveLength(100)
            })

            it('handles specified limit', async () => {
                const res = await queryPlaceAutocompleteApi({ tomtomApiKey, address: 'Charlotte Street', limit: 15 })
                expect(res.addresses).toHaveLength(15)
            })
        })
    })

})
