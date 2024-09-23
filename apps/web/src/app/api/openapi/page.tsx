import { openApiDocument } from '@repo/api/v1/openapi';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });



export default function ApiDoc() {

  return <SwaggerUI  spec={openApiDocument}/>;
};


