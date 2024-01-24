export const getVisibleUsers = ({
  users,
  query,
  sortBy = 'name',
  isReversed = false,
}) => {
  let visibleUsers = [...users];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visibleUsers = visibleUsers.filter(user => (
      user.name.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (sortBy) {
    visibleUsers.sort((a, b) => a.name.localeCompare(b.name));

    if (isReversed) {
      visibleUsers.reverse();
    }
  }

  return visibleUsers;
};
