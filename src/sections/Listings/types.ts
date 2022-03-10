export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfGuests: number;
  numOfBaths: number;
  rating: number;
}

export interface ListingData {
  listings: Listing[];
}

export interface deleteListingData {
  deleteListing: Listing;
}

export interface deleteListingVariables {
  deleteListingId: string;
}
