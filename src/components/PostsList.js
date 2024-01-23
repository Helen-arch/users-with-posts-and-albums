import React from 'react';

export const PostsList = React.memo((({
  posts,
}) => {
  return (
    <table className="table is-striped is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
  
      <tbody>
        {posts.map(post => (
          <tr 
            key={post.id}
          >
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}));
