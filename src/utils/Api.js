import axios from 'axios';
const graphqlEndpoint = "http://20.212.248.87:8000/v1/graphql";
const host = "http://20.212.248.87:5000/api/redis-data";
const callApi = async(query) => {
    const response = await axios.post(graphqlEndpoint, {
      query: query,
    });
    return response
}

const insertRedis = async(body) => {
  const response = await axios.post(host, body);
  return response.data
}

const searchRedis = async(searchval) => {
  const response = await axios.post( `${host}/search`, {searchval} );
  return response.data;
}
// export default callApi;
export {callApi,insertRedis, searchRedis};