import express from 'express';

const AuthRouter = require('./auth');
const PostRouter = require('./post');

const apiRouter = express.Router();

apiRouter.use('/auth', AuthRouter);
apiRouter.use('/post', PostRouter);

module.exports = apiRouter;