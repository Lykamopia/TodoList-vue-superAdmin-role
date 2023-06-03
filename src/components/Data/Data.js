// import { useQuery } from "@vue/apollo-composable";
// import gql from "graphql-tag";
// import { watchEffect } from "vue";
// import { ref } from "vue";

// const { result ,loading } = useQuery(gql`
//   query MyQuery @cached {
//     users {
//       id
//       name
//       todos {
//         completed
//         id
//         title
//       }
//     }
//   }
// `);
// const fetchedValue = ref([]);
// const TotalNumber = ref('');
// watchEffect(() => {
//   if (result.value?.users) {
//     fetchedValue.value = result.value.users;
//     TotalNumber.value = fetchedValue.value.length;
//   }
// });

// const getUserDetailRoute = (userId,detail) => {
//   return {
//     name: "page1Detail",
//     params: {
//       id: userId,
//       detail,
//     },
//   };
// };

// export default fetchedValue.value;

import { provide } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

export default {
  setup() {
    const { result } = useQuery(gql`...`);
    
    provide('fetchedData', result.value);
  },
};
