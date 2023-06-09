import { defineStore } from "pinia";
import { gql } from "graphql-tag";
import { useQuery} from "@vue/apollo-composable";

export const useGraphQLStore = defineStore("graphql", {
  state: () => ({
    fetchedResult : [],
    loading : false,
    error : false,
    id : 0,
    name : '',
    completed : '',
    fetchedQuery : gql` query MyQuery @cached {
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
  actions: {
    setId(id){
      this.id = id;
    },
    setName(name){
      this.name = name;
    },
    setCompleted(complete){
      this.completed = complete;
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
    const { result, error, loading ,refetch} = useQuery(query);
    this.setFetchedResult(result?.value?.users);
    return {
      result,
      error,
      loading,
      refetch,
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
      delete_todos(where: {userid: {_eq: $id}}) {
        affected_rows
      }
      delete_users_by_pk(id: $id) {
        id
      }
    }    
    `,
    updatedUser : () => gql`
    mutation updateUsers($id :Int!, $name : String!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: {
        name: $name
      }) {
        id
        name
      }
    }
    `,
    updateTodo : () => gql`
    mutation updateTodos($oldid:Int!, $title : String!,$completed : Boolean!) {
      update_todos_by_pk(pk_columns: {id: $oldid}, _set: {
        title: $title
        completed : $completed
      }) {
        id
        title
        completed
      }
    }
    `,
    insertTodo: () => gql`
    mutation insertTodos($userid : Int!, $title: String!, $completed: Boolean!) {
      insert_todos_one(object: {
        title: $title, 
        completed: $completed,
        userid : $userid
      }) {
        id
        title
        completed
        userid
      }
    }    
 `,
    deleteTodo : () => gql`
    mutation deleteTodos($id: Int!) {
      delete_todos_by_pk(id: $id){
        id
        title
        completed
      }
    }    
 `,
  },
});

