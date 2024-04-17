import { configuration } from './config'
import { queryPlaceAutocompleteApi } from './maps-api'
import { Address } from './model'

export interface GetAutocompleteDetailsRequest {
    /** Partial freeform address to use for autocomplete suggestions  */
    address: string
}

export interface GetAutocompleteDetailsResponse {
    /** List of autocomplete suggestions for provided partial address */
    addresses: Address[]
}

/**
 * Get autocomplete suggestions for a provided partial address. 
 * This calls the TomTom Places API for fuzzy search suggestions.
 * @param request GetAutocompleteDetailsRequest object
 * @returns response object containing a list of autocomplete address details
 */
export async function getAutoCompleteDetails({ address }: GetAutocompleteDetailsRequest): Promise<GetAutocompleteDetailsResponse> {
    const { TOMTOM_API_KEY } = configuration()
    if (!isValidAddress(address)) return { addresses: [] }
    // Query address API with provided partial address
    return await queryPlaceAutocompleteApi({ tomtomApiKey: TOMTOM_API_KEY, address })
}

const isValidAddress = (address: string) => address.length > 0
