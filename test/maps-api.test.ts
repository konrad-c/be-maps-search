import { describe } from '@jest/globals'
import { queryPlaceAutocompleteApi } from '../src/maps-api'
import axios from 'axios'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('Tomtom Places API', () => {
    describe('queryPlaceAutocompleteApi', () => {

        it('can fetch from the autocomplete api', async () => {
            mockAxios.get.mockResolvedValue({
                data: {
                    results: [
                        {
                            id: 'place-id',
                            address: {
                                streetNumber: '123',
                                streetName: 'Charlotte Street',
                                municipality: 'Bega',
                                country: 'Australia',
                                countryCode: 'AU',
                                freeformAddress: 'Charlotte Street, Bega, New South Wales',
                                postalCode: '2550',
                                countrySubdivision: 'New South Wales',
                            }
                        }
                    ]
                }
            })

            const res = await queryPlaceAutocompleteApi({ tomtomApiKey: 'test-api-key', address: 'Charlotte Street' })
            expect(res).toHaveLength(1)
            expect(res[0]).toStrictEqual({
                placeId: 'place-id', 
                country: 'Australia',
                countryCode: 'AU',
                freeformAddress: 'Charlotte Street, Bega, New South Wales',
                municipality: 'Bega',
                streetName: 'Charlotte Street',
                streetNumber: '123',
                state: 'New South Wales',
                postalCode: '2550',
            })
        })
    })

})
