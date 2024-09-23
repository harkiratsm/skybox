import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../../trpc/server/router';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Skybox API',
  description: 'The Skybox API for managing notes, folders, and files',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000/api',
  docsUrl: 'https://github.com/harkiratsm/skybox',
  tags: ['note', 'folder'],
});
