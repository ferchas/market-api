import express from 'express';

const router = express.Router();

/*
* Page Router, render Json
*/

router.use('/', (req, res) => res.json({ server: 'up' }));

export default router;
