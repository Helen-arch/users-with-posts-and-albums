import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getUserAlbums } from '../api/albums';

export const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const loadUsers = async () => {
    try {
      const data = await getUserAlbums(userId);

      setAlbums(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [userId]);

  return (
    <div className="box">
      <h2 className="title is-4">Albums</h2>

      {loading && <Loader />}
      
      {!loading && (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Photos</th>
            </tr>
          </thead>
      
          <tbody>
            {albums.map(album => (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.title}</td>
                <td>
                  <Link
                    to={`../${album.id}`}
                    className="icon button is-success is-inverted"
                  >
                    <i className="far fa-eye" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
