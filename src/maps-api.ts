import axios from 'axios'
import { Address } from './model'

export interface QueryPlaceAutocompleteApiRequest {
    tomtomApiKey: string
    address: string
    countryCodesIncluded?: string[]
}

/**
 * Query the 'tomtom' fuzzy address search API for autocomplete suggestions for a provided address
 * @param tomtomApiKey API key for the TOMTOM fuzzy search API
 * @param address Partial address with which to search
 * @returns List of addresses 
 */
export async function queryPlaceAutocompleteApi({tomtomApiKey, address, countryCodesIncluded }: QueryPlaceAutocompleteApiRequest): Promise<Address[]> {
    const response = await axios.get<AutocompleteResponse>(`https://api.tomtom.com/search/2/search/${address}.json'`, {
        params: {
            key: tomtomApiKey,
            limit: 100,
            countrySet: (countryCodesIncluded ?? ["AU"]).join(',')
        }
    })

    return response.data.results.map(toAddress)
}

const toAddress = ({ id, address }: AutocompleteAddress): Address => ({
    placeId: id,
    country: address.country,
    countryCode: address.countryCode,
    freeformAddress: address.freeformAddress,
    municipality: address.freeformAddress,
    streetNumber: address.streetNumber,
    streetName: address.streetName,
    state: address.countrySubdivision,
})

interface AutocompleteResponse {
    results: AutocompleteAddress[]
}

interface AutocompleteAddress {
    id: string
    address: AutoCompleteAddressDetail
    
}

interface AutoCompleteAddressDetail {
    streetNumber: string
    streetName: string
    municipality: string
    country: string
    countryCode: string
    freeformAddress: string
    postalCode: string
    countrySubdivision: string
}
