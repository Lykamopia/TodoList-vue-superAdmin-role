import { defineStore } from "pinia";
import { gql } from "graphql-tag";

export const useGraphQLStore = defineStore("graphql", {
  state: () => ({
    fetchedData: gql`
      query MyQuery @cached {
        users {
          id
          name
          todos {
            completed
            id
            title
          }
        }
      }
    `,
  }),
});

