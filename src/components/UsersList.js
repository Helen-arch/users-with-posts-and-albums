import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { getUsers } from '../api/users';

export const UsersList = ({
  selectedUserId,
  onSelect = () => {},
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    loadUsers();

    setLoading(false);
  }, []);

  return (
    <div className="box">
      <h2 className="title is-4">Users</h2>

      {loading && <Loader />}
      
      {!loading && (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Posts</th>
              <th>Albums</th>
            </tr>
          </thead>
      
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`posts/${user.id}`}
                    onClick={() => onSelect(user)}
                    className="icon button is-success is-inverted"
                  >
                    <i className="fa-regular fa-pen-to-square" />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`albums/${user.id}`}
                    onClick={() => onSelect(user)}
                    className="icon button is-success is-inverted"
                  >
                    <i className="fa-regular fa-images" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}