// src/types/swagger-jsdoc.d.ts

declare module "swagger-jsdoc" {
  export interface Options {
    definition: any; // You can be more specific if needed
    apis: string[];
  }

  function swaggerJSDoc(options: Options): any;

  export default swaggerJSDoc;
}
