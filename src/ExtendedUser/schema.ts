/*
  # global properties

  type Profile - is rout custom profiletype wich will joined to vendure Administrator type. fill it with any properties yu wll need
  CreateAdministratorWithProfileInput - fitst 4 fields are required! add any additional fields you will use while creating new administratir with custom profile
* 
*/

import gql from "graphql-tag";


const profileSchema = gql`
  
  type Profile {
    blocked: Boolean!
  }

  extend type Administrator {
    profile: Profile!
  }

  extend type Query {
    # if you want to create additional queries for your admin with profile-add it here, otherwise - delete
    getProfiles: [Administrator]
  }

  input CreateAdministratorWithProfileInput {
    firstName: String! 
    lastName: String!
    emailAddress: String!
    password: String!

    # add additional fields here
  }

  extend type Mutation {
    # add creation mutation here
    cretaeAdminWithProfile(input: CreateAdministratorWithProfileInput!): Administrator
  }
`;

const addressSchema = gql`
  type PhysicalAddress {
    street: String!
  }

  input PhysicalAddressInput {
    street: String!
  }

  extend type Query {
    getPhysicalAddresses: [PhysicalAddress]
  }

  extend type Mutation {
    # add creation mutation here
    createPhysicalAddress(input: PhysicalAddressInput!): PhysicalAddress
  }
`;

export const schemaExtension = gql`
  ${profileSchema}
  ${addressSchema}
`;
