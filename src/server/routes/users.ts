import {Router, Request, Response, NextFunction} from 'express';

let router = Router();
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('users');
});

export = router;
