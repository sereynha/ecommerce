import {Router} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {swaggerSpec} from "../docs/swagger";

const docsRoutes: Router = Router();

//const specs = swaggerJSDoc(options);

docsRoutes.use('/', swaggerUi.serve);
docsRoutes.get(
    '/',
    swaggerUi.setup(swaggerSpec, {
      explorer: true
    })
  );

export default docsRoutes;