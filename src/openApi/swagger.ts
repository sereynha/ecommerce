import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A sample Express.js API with Swagger documentation',
  },
  servers: [
    {
      url: 'http://localhost:3031',
    },
  ],
};

const options: OAS3Options = {
  swaggerDefinition,
   apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);