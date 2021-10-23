import gql from "graphql-tag";

const commons = gql`
  enum Status {
    INACTIVE
    ACTIVE
    CANCEL
  }
`;

const noteSchema = gql`
  type Note implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime
    content: String!
  }

  input NoteInput {
    content: String!
    operation: ID!
  }

  extend type Mutation {
    addNote(input: NoteInput): Note
  }
`;

const profileSchema = gql`
  type Profile {
    blocked: Boolean!
  }

  extend type Administrator {
    profile: Profile!
  }

  type ProfilesPaginatedResult {
    list: [Administrator]!
    totalItems: Int!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    emailAddress: String!
    password: String!
  }

  extend type Query {
    getProfiles: ProfilesPaginatedResult!
  }

  # TODO add mutation to register user with role

`;

export const schemaExtension = gql`
  ${commons}
  ${noteSchema}
`;
