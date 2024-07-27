import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import {NAME_PROJECT, RIPOSITORIES, URL_API} from "../utils/secret";

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: `${NAME_PROJECT} API with Swagger`,
    version: '1.0.0',
    description: `${NAME_PROJECT} API Using Express Typescript API with Swagger documentation`,
    license: {
      name: 'MIT',
      url: RIPOSITORIES
    }
  },
  servers: [
    {
      url: URL_API,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options: OAS3Options = {
  swaggerDefinition,
   apis: ['./src/docs/*.yml','./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);