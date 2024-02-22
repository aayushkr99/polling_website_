import axios from 'axios';
const graphqlEndpoint = "http://20.212.248.87:8080/v1/graphql";
const callApi = async(query) => {
    const response = await axios.post(graphqlEndpoint, {
      query: query,
    });
    return response
}
export default callApi;