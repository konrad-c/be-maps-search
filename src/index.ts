import { configuration } from './config'
import { queryPlaceAutocompleteApi } from './maps-api'
import { Address } from './model'

export async function getAutoCompleteDetails(address: string): Promise<Address[]> {
    const { TOMTOM_API_KEY } = configuration()
    if (!isValidAddress(address)) return []
    // Query address API with provided partial address
    const response = await queryPlaceAutocompleteApi({ tomtomApiKey: TOMTOM_API_KEY, address })
    return response.addresses
}

const isValidAddress = (address: string) => address.length > 0
