import axios from 'axios'
import { Address } from './model'

export interface QueryPlaceAutocompleteApiRequest {
    /** API key for the TOMTOM Places API */
    tomtomApiKey: string
    /** Partial address with which to search */
    address: string
    /** Optional: list of country codes to include in autocomplete search */
    countryCodesIncluded?: string[]
    /** Optional: maximum number of addresses to return.
     *  this will default to 100 if not set or provided value exceeds 100 */
    limit?: number
}

export interface QueryPlaceAutocompleteApiResponse {
    addresses: Address[]
}

/**
 * Query the 'tomtom' fuzzy address search API for autocomplete suggestions for a provided address
 * @param request QueryPlaceAutocompleteApiRequest object 
 * @returns List of addresses 
 */
export async function queryPlaceAutocompleteApi({ tomtomApiKey, address, countryCodesIncluded, limit: requestedLimit }: QueryPlaceAutocompleteApiRequest): Promise<QueryPlaceAutocompleteApiResponse> {
    const limit = Math.min(requestedLimit ?? 100, 100)
    const countrySet = (countryCodesIncluded ?? ["AU"])
    return {
        addresses: await callAutocompleteApi(tomtomApiKey, address, countrySet, limit)
    }
}

async function callAutocompleteApi(tomtomApiKey: string, address: string, countrySet: string[], limit: number): Promise<Address[]> {
    const response = await axios.get<AutocompleteResponse>(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key: tomtomApiKey,
            limit,
            countrySet: countrySet.join(','),
        }
    })

    return response.data.results.map(toAddress)
}

const toAddress = ({ id, address }: AutocompleteAddress): Address => ({
    placeId: id,
    country: address.country,
    countryCode: address.countryCode,
    freeformAddress: address.freeformAddress,
    municipality: address.municipality,
    streetNumber: address.streetNumber,
    streetName: address.streetName,
    state: address.countrySubdivision,
    postalCode: address.postalCode,
})

interface AutocompleteResponse {
    results: AutocompleteAddress[]
}

interface AutocompleteAddress {
    id: string
    address: {
        streetNumber: string
        streetName: string
        municipality: string
        country: string
        countryCode: string
        freeformAddress: string
        countrySubdivision: string
        postalCode?: string
    }
}
