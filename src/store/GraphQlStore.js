import { defineStore } from "pinia";
import { gql } from "graphql-tag";
import { useQuery ,useMutation } from "@vue/apollo-composable";

export const useGraphQLStore = defineStore("graphql", {
  state: () => ({
    fetchedResult : [],
    loading : false,
    error : false,
    isInitialized: false,
    id : 0,
    name : ''
  }),
  actions: {
    setId(id){
      this.id = id;
    },
    setName(name){
      this.name = name;
    },
    setFetchedResult(value) {
      this.fetchedResult = value;
    },
    setLoading(value) {
      this.loading = value;
    },
    setError(value) {
      this.error = value;
    },
    deleteUser(id) {
      const REMOVE_USER = this.deletedData;
      const { mutate } = useMutation(REMOVE_USER, {
        variables: {
          id: id,
        },
        update: (cache, data ) => {
          if (id.trim() !== '') {
            const existingData = cache.readQuery({
              query: this.fetchedResult,
            });
            const updatedData = {
              users: existingData.users.filter((user) => user.id !== id),
            };
            cache.writeQuery({
              query: this.fetchedResult,
              data: updatedData,
            });
          }
        },
      });
      return mutate;
    },
    updateUser(id, idd,name) {
      const UPDATE_USER = this.updatedUser;
      const { mutate } = useMutation(UPDATE_USER, {
        variables: {
          id: id,
          idd: idd,
          name: name,
        },
        update: (cache, { data }) => {
          if (props.id.trim() !== '' && props.userInputs.name.trim() !== '') {
            const existingData = cache.readQuery({
              query: this.fetchedResult,
            });
            const updatedData = {
              users: existingData.users,
            };
            cache.writeQuery({
              query: this.fetchedResult,
              data: updatedData,
            });
          }
        },
      });

      return mutate;
    },
    addUser(name) {
      const INSERT_USER = this.insertedData;
      const { mutate  } = useMutation(INSERT_USER, {
        variables: {
          name: name,
        },
        update: (cache, { data }) => {
          const existingData = cache.readQuery({
            query: this.fetchedData,
          });
          const newUser = {
            id: data.insert_users_one.id,
            name: data.insert_users_one.name,
            todos: [],
          };
          const updatedData = {
            users: [...existingData.users, newUser],
          };
          cache.writeQuery({
            query: this.fetchedData,
            data: updatedData,
          });
        },
      });
      return mutate;
    },
 
  },
  getters : {
    fetchedData () {
    const query = gql` query MyQuery @cached {
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
    `
    const { result, error, loading } = useQuery(query);
    return {
      result,
      error,
      loading
    };
  },
    insertedData: () => gql`
       mutation inserUsers($name : String!){
      insert_users_one(object:{
      name: $name
        }){
      id
      name
    } 
      }
    `,
    deletedData : () => gql`
    mutation deleteUsers($id: Int!) {
      delete_users_by_pk(id : $id) {
        id,
      }
    }
    `,
    updatedUser : () => gql`
    mutation updateUsers($id :Int!, $idd : Int! , $name : String!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: {
        id: $idd
        name: $name
      }) {
        id
        name
      }
    }
    `,
  },
  setters: {

  },
});

