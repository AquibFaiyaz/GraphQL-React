import { gql } from "apollo-boost";
import React, { FunctionComponent } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ListingData,
  deleteListingData,
  deleteListingVariables,
} from "./types";

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
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
  //custom hook
  const { data, refetch, loading, error } = useQuery<ListingData>(LISTINGS);

  const [deleteListing, state] = useMutation<
    deleteListingData,
    deleteListingVariables
  >(DELETE_LISTING);

  const deleteListingHandle = async (id: string) => {
    await deleteListing({ variables: { deleteListingId: id } }).then((res) => {
      refetch();
    });
  };

  const listing = data ? data.listings : null;
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h2>{title}</h2>

      <ul>
        {listing?.map((listing) => {
          return (
            <>
              <li key={listing.id}>{listing.title}</li>
              <button
                onClick={() => {
                  deleteListingHandle(listing.id);
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
