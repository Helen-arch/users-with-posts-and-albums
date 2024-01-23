import { client } from "../utils/fetchClient";

export const getUserPosts = (userId) => {
  return client.get(`/posts?userId=${userId}`);
};