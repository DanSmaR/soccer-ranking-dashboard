import 'express-async-errors';
import * as express from 'express';
import * as morgan from 'morgan';
import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Express;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.config();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorMiddleware);
  }
}

export default App;
