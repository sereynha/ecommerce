import {Router} from "express";
import auths from "./auth";
import productsRoutes from "./products";
import userRoutes from "./users";
import categories from "./categories";
import cartRoutes from "./cart";
import docsRoutes from "./docs";
import ordersRoutes from "./orders";

const rootRouter: Router = Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: auths
    },
    {
        path: '/products',
        route: productsRoutes
    },
    {
        path: '/addresses',
        route: userRoutes
    },
    {
        path: '/categories',
        route: categories
    },
    {
        path: '/carts',
        route: cartRoutes
    },
    {
        path: '/orders',
        route: ordersRoutes
    },
];

defaultRoutes.forEach((routes) => {
    rootRouter.use(routes.path,routes.route)
})

const devRoutes = [
    {
      path: '/api-docs',
      route: docsRoutes
    }
  ];

devRoutes.forEach((route) => {
    rootRouter.use(route.path, route.route);
  });
export  default  rootRouter;