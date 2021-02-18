import express, {Request, Response} from 'express';
import url from "url";
import { connection } from '../../db/connection';

const postRouter = express.Router();

postRouter.post("/post", (req: Request, res: Response) => {
  const { contents, deadline, userId } = req.body.post;

  const insertQuery = `
  INSERT INTO post
    (contents, deadline, user_id)
  VALUES
    ('${contents}', '${deadline}', '${userId}')
  `;

  connection.query(insertQuery, (err, queryRes) => {
    if (err) throw err;
    res.send(queryRes);
  });
});

postRouter.get("/posts", (req: Request, res: Response) => {
  const queryData = url.parse(req.url, true).query;
  const userId = queryData.id;

  const selectQuery = `
  SELECT
    post_id as postId, contents, deadline, complete, user_id as userId
  FROM
    post
  WHERE
    user_id = '${userId}'
  AND
    uses = 'Y'
  `;
  connection.query(selectQuery, (err, queryRes) => {
    if (err) throw err;

    res.send(queryRes);
  });
});

postRouter.put('/post', (req: Request, res: Response) => {
  const { id, status } = req.body;

  let completeFlag = 'y';

  if (status === 'y') {
    completeFlag = 'n';
  }

  const updateQuery = `
  UPDATE
    post
  SET
    complete = '${completeFlag}'
  WHERE
    (post_id = '${id}')
  `;

  connection.query(updateQuery, (err, queryRes) => {
    if (err) throw err;

    if (queryRes) {
      res.send({status: 200});
    }
  });
});

module.exports = postRouter;