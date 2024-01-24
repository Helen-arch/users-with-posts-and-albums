import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { getUserAlbums } from '../api/albums';

export const AlbumsList = ({
  selectedUserId,
  onSelect = () => {},
}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

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
      <h2 className="title is-4">Albums</h2>

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
                  <button
                    onClick={() => navigate(`${album.id}`)}
                    className="icon button is-success is-inverted"
                  >
                    <i className="far fa-eye" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
