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
    }
  };

  useEffect(() => {
    loadUsers();

    setLoading(false);
  }, [albumId]);

  return (
    <div className="box">
      <h2 className="title is-4">Album</h2>

      {loading && <Loader />}

      {!loading && (
        <div className="is-flex">
          {photos.map(photo => (
            <div key={photo.id}>
              <img src={photo.src} alt='photo' />
              <h6>{photo.title}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
