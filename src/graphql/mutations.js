/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEvent = /* GraphQL */ `
  mutation AddEvent(
    $id: ID!
    $title: String
    $date: String
    $image: [String]
    $description: String
    $time: String
    $filterCategories: [String]
    $coordinate: [Float]
    $mapDescription: String
    $price: String
    $website: String
    $rating: [Int]
    $savedUsers: [String]
    $location: String
  ) {
    addEvent(
      id: $id
      title: $title
      date: $date
      image: $image
      description: $description
      time: $time
      filterCategories: $filterCategories
      coordinate: $coordinate
      mapDescription: $mapDescription
      price: $price
      website: $website
      rating: $rating
      savedUsers: $savedUsers
      location: $location
    ) {
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
export const category = /* GraphQL */ `
  mutation Category {
    category
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
