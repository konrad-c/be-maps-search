export interface Address {
    /** Unique string identifier for this address */
    placeId: string
    streetNumber: string
    streetName: string
    countryCode: string
    country: string
    freeformAddress: string
    municipality: string
    state: string
    postalCode?: string
}
