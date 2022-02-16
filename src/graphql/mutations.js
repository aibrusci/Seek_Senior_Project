/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addEvent = /* GraphQL */ `
  mutation AddEvent(
    $id: ID!
    $title: String
    $date: String
    $image: String
    $savedIcon: Boolean
    $description: String
    $time: String
    $filterCategories: [String]
    $location: String
  ) {
    addEvent(
      id: $id
      title: $title
      date: $date
      image: $image
      savedIcon: $savedIcon
      description: $description
      time: $time
      filterCategories: $filterCategories
      location: $location
    ) {
      id
      title
      date
      image
      savedUsers
      description
      time
      filterCategories
      location
      category
      website
      savedIcon
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
      savedUsers
      description
      time
      filterCategories
      location
      category
      website
      savedIcon
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
      savedUsers
      description
      time
      filterCategories
      location
      category
      website
      savedIcon
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
      savedUsers
      description
      time
      filterCategories
      location
      category
      website
      savedIcon
      createdAt
      updatedAt
    }
  }
`;
