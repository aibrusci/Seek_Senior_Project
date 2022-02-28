/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      date
      image
      description
      time
      filterCategories
      location
      coordinate
      mapDescription
      price
      website
      savedUsers
      rating
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        date
        image
        description
        time
        filterCategories
        location
        coordinate
        mapDescription
        price
        website
        savedUsers
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
