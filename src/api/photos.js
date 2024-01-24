import { client } from "../utils/fetchClient";

export const getAlbumPhotos = (albumId) => {
  return client.get(`/photos?albumId=${albumId}`);
};