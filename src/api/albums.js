import { client } from "../utils/fetchClient";

export const getUserAlbums = (userId) => {
  return client.get(`/albums?userId=${userId}`);
};