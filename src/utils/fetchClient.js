import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const client = {
  get: (pathname) => (
    axios.get(`${BASE_URL}${pathname}`)
  )
    .then(response => response.data)
    .catch((error) => {
      throw new Error(error);
    }),
};