import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getAlbumPhotos } from '../api/photos';

export const Album = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { albumId } = useParams();


  const loadUsers = async () => {
    try {
      const data = await getAlbumPhotos(albumId);

      setPhotos(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [albumId]);

  return (
    <div className="box">
      <h2 className="title is-4">Album</h2>

      {loading && <Loader />}

      {!loading && (
        <div className="content is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-center">
          {photos.map(photo => (
            <div key={photo.id} className="box">
              <img
                src={photo.url}
                alt="albumPhoto"
                className="image"
              />

              <h6 className="title pt-4">{photo.title}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
