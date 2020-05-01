// ============================================================
// Declare Global Dependencies
import config from 'config';
import express from 'express';

// ============================================================
// Declare Application Middlewares
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cluster from './libs/cluster';

// ============================================================
// Declare Application router
import appRouter from './router';

// ============================================================
// Declare Application Config

const app = express();
const appHttpPort = config.get('app.port');
const optionsStatic = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'css', 'js', 'map'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path, stat) => res.set('x-timestamp', Date.now()),
};

// ============================================================
// Inject Middlewares into App

// express.static: defines the path for public static assets
app.use(express.static(`${__dirname}/public`, optionsStatic))
// cookieParser: parse request cookies into 'req.cookies'
app.use(cookieParser());
// bodyParser: parse request body into 'req.body'
app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser: set body content parser to JSON
app.use(bodyParser.json({ limit: '50mb' }));
// Apolo server 
appRouter.gqlServer(app);
// appRouter: defines url mappings for client app
app.use(appRouter.routPath);

// ============================================================
// Application StartUp via Cluster Service and app.cluster config
cluster(() => {
  app.listen(appHttpPort, () => {
    console.log(`Application Port: ${appHttpPort} | Environment: ${process.env.NODE_ENV || 'not'}`); // eslint-disable-line
    console.log('#####################################################'); // eslint-disable-line
  });
}, config.get('app.cluster'));
