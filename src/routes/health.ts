import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ service_name: 'Tasks service', health: 'OK' });
});

export default router;
