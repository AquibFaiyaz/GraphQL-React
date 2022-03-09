import React, { FunctionComponent, useState } from "react";
import { server } from "../../lib/api";
import {
  ListingData,
  deleteListingData,
  deleteListingId,
  Listing,
} from "./types";

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    rating
    price
    numOfBaths
    numOfBeds
    numOfGuests
  }
}
`;

const DELETE_LISTING = `
mutation DeleteListing($deleteListingId: ID!) {
  deleteListing(id: $deleteListingId) {
    title
    image
    id
    rating
    numOfBaths
  }
}
`;

interface Props {
  title: string;
}

export const Listings: FunctionComponent<Props> = ({ title }) => {
  const [listing, setListing] = useState<Listing[] | null>(null);
  const fetchListing = async () => {
    await server.fetch<ListingData>({ query: LISTINGS }).then(({ data }) => {
      setListing(data.listings);
    });
  };

  const deleteListing = async (id: string) => {
    await server
      .fetch<deleteListingData, deleteListingId>({
        query: DELETE_LISTING,
        variables: {
          deleteListingId: id,
        },
      })
      .then(({ data }) => {
        fetchListing();
      });
  };
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListing}>Query Listing</button>
      <ul>
        {listing?.map((item) => {
          return (
            <>
              <li key={item.id}>{item.title}</li>
              <button
                onClick={() => {
                  deleteListing(item.id);
                }}
              >
                Delete
              </button>
            </>
          );
        })}
      </ul>
    </div>
  );
};
