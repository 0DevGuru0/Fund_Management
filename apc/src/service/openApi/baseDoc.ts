import { getOpenApiComponents } from './getOpenApiComponents';

const components = getOpenApiComponents();

components.securitySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
  ApiKeyAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'X-API-Key',
  },
};

export const baseDoc = {
  servers: [
    {
      url: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS,
    },
  ],
  info: {
    title: 'iKnito APC API',
    version: '1',
    description: `
      This iKnito APC (SmartFund) API Documentation.
    `,
    'x-logo': {
      url: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/docLogo.png`,
      altText: 'iKnito Logo',
    },
  },
  components,
};
