export const getUserSql = ({ userId }) => {

  const query = `
    SELECT
      * 
    FROM 
      user 
    WHERE 
      user_id = '${userId}'
    `;
  console.log('query: ', query);

  return query;
};

export const addUserSql = ({ userId, newName }) => {
  const query = `
    INSERT INTO user 
      (user_id, user_name)
    VALUES 
      ('${userId}', '${newName}')
    `;

  return query;
}
