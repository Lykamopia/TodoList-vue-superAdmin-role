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
    insertedData: gql`
    mutation inserUsers($name : String!){
      insert_users_one(object:{
      name: $name
        }){
      id
      name
    } 
      }
    `,
    deletedData : gql`
    mutation deleteUsers($id: Int!) {
      delete_users_by_pk(id : $id) {
        id,
      }
    }
    `,
    updateUser : gql`
    mutation($id :Int!, $idd : Int! , $name : String!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: {
        id: $idd
        name: $name
      }) {
        id
        name
      }
    }
    `,
  }),
});

