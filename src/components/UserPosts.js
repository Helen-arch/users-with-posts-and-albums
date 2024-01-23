import React, { useEffect, useState } from 'react';
import { PostForm } from './PostForm';
import { PostList } from './PostList';
import { Loader } from './Loader';


export const UserPosts = ({ userId }) => {
  // #region loadPosts
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   getUsers().then(setUsers);
  // }, []);

  // useEffect(loadPosts, [userId]);

  // function loadPosts() {
  //   setLoading(true);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setErrorMessage('Try again later'))
  //     .finally(() => setLoading(false));
  // }
  // #endregion
  // #region add, delete, update
  const [selectedPost, setSelectedPost] = useState(null);
  
  function addPost(post) {
    setPosts(currentPosts => {
      const maxId = Math.max(0, ...currentPosts.map(post => post.id));
      const id = maxId + 1;

      return [...currentPosts, { ...post, id }];
    });
  }

  function deletePost(postId) {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  }

  function updatePost(updatedPost) {
    setPosts(currentPosts => {
      const newPosts = [...currentPosts];
      const index = newPosts.findIndex(post => post.id === updatedPost.id);

      newPosts.splice(index, 1, updatedPost);

      return newPosts;
    });
  }
  // #endregion

  return (
    <div className="box">
      <h2 className="title is-4">User {userId} posts</h2>

      {!loading && !errorMessage && <>
        {posts.length > 0 ? (
          <PostList
            posts={posts}
            selectedPostId={selectedPost?.id}
            onSelect={setSelectedPost}
            onDelete={deletePost}
          />
        ) : (
          <p>There are no posts yet</p>
        )}

        <hr />

        <PostForm
          key={selectedPost?.id}
          post={selectedPost}
          fixedUserId={userId}
          users={users}
          onSubmit={selectedPost ? updatePost : addPost}
          onReset={() => setSelectedPost(null)}
        />
      </>}

      {loading && <Loader />}

      {errorMessage && (
        <p className="notification is-danger">{errorMessage}</p>
      )}
    </div >
  );
};
