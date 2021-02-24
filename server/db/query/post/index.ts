interface GetPostsSqlProps {
  userId: string;
}

interface AddPostSqlProps extends GetPostsSqlProps {
  contents: string;
  deadline: string;
}

interface updateCompleteSql {
  completeFlag: string;
  postId: number;
}

export const addPostSql = ({ contents, deadline, userId }: AddPostSqlProps) => {
  const query = `
  INSERT INTO post
    (contents, deadline, user_id)
  VALUES
    ('${contents}', '${deadline}', '${userId}')
  `;

  return query;
};

export const getPostsSql = ({ userId }: GetPostsSqlProps) => {
  const query = `
  SELECT
    post_id as postId, contents, deadline, complete, user_id as userId
  FROM
    post
  WHERE
    user_id = '${userId}'
  AND
    uses = 'Y'
  `;

  return query;
};

export const updateCompleteSql = ({
  completeFlag,
  postId,
}: updateCompleteSql) => {
  const query = `
  UPDATE
    post
  SET
    complete = '${completeFlag}'
  WHERE
    (post_id = '${postId}')
  `;

  return query;
};
