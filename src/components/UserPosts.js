import React, { useEffect, useState } from 'react';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { getUserPosts } from '../api/posts';

const userId = 1;

export const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
    
    setLoading(false);
  }, [userId]);

  const loadPosts = async () => {
    try {
      const data = await getUserPosts(userId);

      setPosts(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="box">
      <h2 className="title is-4">User posts</h2>

      {!loading && !errorMessage && <>
        {posts.length > 0 ? (
          <PostsList
            posts={posts}
          />
        ) : (
          <p>There are no posts yet</p>
        )}
      </>}

      {loading && <Loader />}

      {errorMessage && (
        <p className="notification is-danger">{errorMessage}</p>
      )}
    </div >
  );
};
