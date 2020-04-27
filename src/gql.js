import gql from 'graphql-tag';

export const GET_PROCESS = gql`
  query getProcess {
    process @client {
      flow
    }
  }
`;

export const SAVE_USER = gql`
  mutation saveUser($fullName: String!, $email: String!) {
    saveUser(fullName: $fullName, email: $email) @client
  }
`;

export const GET_USER = gql`
  query getUser {
    userDetails @client {
      fullName
      email
    }
  }
`;

export const getResolvers = (cache) => ({
  Mutation: {
    saveUser(_root, {fullName, email}) {
      cache.writeData({
        data: {
          userDetails: {__typename: 'UserDetails', fullName, email},
        },
      });
    },
  },
});
