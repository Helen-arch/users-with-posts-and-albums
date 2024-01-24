import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { getUserPosts } from '../api/posts';

export const UserPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

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

      {!loading && <>
        {posts.length > 0 ? (
          <PostsList
            posts={posts}
          />
        ) : (
          <Loader />
        )}
      </>}
    </div >
  );
};
