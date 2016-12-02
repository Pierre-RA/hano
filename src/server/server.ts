import * as express from 'express';
import * as path from 'path';
import * as indexRouter from './routes/index';
import * as usersRouter from './routes/users';

export class Server {
  private _App: express.Application;
  private _port: number;

  constructor() {
    this._App = express();
    this._port = process.env.PORT || 3000;
    this._App.use(express.static(path.join(__dirname, '../client')));
    this.routes();
  }

  private routes(): void {
    let router = express.Router();
    this._App.use('/', indexRouter);
    this._App.use('/users', usersRouter);
  }

  public startServer() {
    this._App.listen(this._port, () => {
      console.log('Example app listening.');
    });
  }
}
