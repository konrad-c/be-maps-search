import { configuration } from './config'
import { queryPlaceAutocompleteApi } from './maps-api'
import { Address } from './model'

export interface GetAutocompleteDetailsRequest {
    address: string
}

export interface GetAutocompleteDetailsResponse {
    addresses: Address[]
}

export async function getAutoCompleteDetails({ address }: GetAutocompleteDetailsRequest): Promise<GetAutocompleteDetailsResponse> {
    const { TOMTOM_API_KEY } = configuration()
    if (!isValidAddress(address)) return { addresses: [] }
    // Query address API with provided partial address
    return await queryPlaceAutocompleteApi({ tomtomApiKey: TOMTOM_API_KEY, address })
}

const isValidAddress = (address: string) => address.length > 0
