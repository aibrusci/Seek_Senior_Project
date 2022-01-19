/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEvent = /* GraphQL */ `
  mutation AddEvent(
    $id: ID!
    $title: String
    $description: String
    $day: String
    $time: String
    $filterCategories: [String]
    $location: String
  ) {
    addEvent(
      id: $id
      title: $title
      description: $description
      day: $day
      time: $time
      filterCategories: $filterCategories
      location: $location
    ) {
      id
      title
      description
      day
      time
      filterCategories
      location
      createdAt
      updatedAt
      owner
    }
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
      description
      day
      time
      filterCategories
      location
      createdAt
      updatedAt
      owner
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
      description
      day
      time
      filterCategories
      location
      createdAt
      updatedAt
      owner
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
      description
      day
      time
      filterCategories
      location
      createdAt
      updatedAt
      owner
    }
  }
`;
