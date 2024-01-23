import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { getUserAlbums } from '../api/albums';

const userId = 1;

export const AlbumsList = ({
  selectedUserId,
  onSelect = () => {},
}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUserAlbums(userId);

      setAlbums(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    loadUsers();

    setLoading(false);
  }, [userId]);

  return (
    <div className="box">
      <h2 className="title is-4">Users</h2>

      {loading && <Loader />}
      
      {!loading && (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>
      
          <tbody>
            {albums.map(album => (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td>{album.title}</td>
                <td>
                  <Link
                    to={`${album.id}`}
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
