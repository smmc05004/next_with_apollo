interface userSqlProps {
  userId: string;
}

interface addUserSqlProps extends userSqlProps {
  newName: string;
}

export const getUserSql = ({ userId }: userSqlProps) => {
  const query = `
    SELECT
      * 
    FROM 
      user 
    WHERE 
      user_id = '${userId}'
    `;

  return query;
};

export const addUserSql = ({ userId, newName }: addUserSqlProps) => {
  const query = `
    INSERT INTO user 
      (user_id, user_name)
    VALUES 
      ('${userId}', '${newName}')
    `;

  return query;
};
