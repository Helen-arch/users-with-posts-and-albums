import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader';
import { getUsers } from '../api/users';
import { getVisibleUsers } from '../utils/getVisibleUsers';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

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

  const handleQueryChange = (event) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event?.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const visibleUsers = getVisibleUsers({
    users,
    query,
    // sortBy,
    // isReversed,
  });

  // const firstClick = sortBy !== header;
  // const secondClick = sortBy === header && !isReversed;
  // const thirdClick = sortBy === header && !!isReversed;
  // let sort = null;
  // let order = null;

  // if (firstClick) {
  //   sort = header.toLowerCase();
  //   order = null;
  // }

  // if (secondClick) {
  //   sort = header.toLowerCase();
  //   order = 'desc';
  // }

  // if (thirdClick) {
  //   sort = null;
  //   order = null;
  // }

  return (
    <div className="box">
      <h2 className="title is-4">Users</h2>

      <div className="pb-6">
        <p className="control has-icons-left">
          <input
            value={query}
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {loading && <Loader />}

      {visibleUsers.length === 0 && query && (
        <p>There are no such users</p>
      )}
      
      {!loading && visibleUsers.length > 0 && (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>
                Name

                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': true,
                      // 'fa-sort-up': secondClick,
                      // 'fa-sort-down': thirdClick,
                    })}
                  />
                </span>
              </th>
              <th>Email</th>
              <th>Posts</th>
              <th>Albums</th>
            </tr>
          </thead>
      
          <tbody>
            {visibleUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`posts/${user.id}`}
                    className="icon button is-success is-inverted"
                  >
                    <i className="fa-regular fa-pen-to-square" />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`albums/${user.id}`}
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