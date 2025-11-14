// Simple local development server
// This allows running the API locally without Vercel CLI

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getCustomizationsForAppId } from './config/appCustomizations';

const PORT = process.env.PORT || 3000;

function setCorsHeaders(res: ServerResponse) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
    'Access-Control-Allow-Headers':
      'Content-Type, x-frontegg-framework, X-Frontegg-Framework, x-frontegg-sdk, X-Frontegg-Sdk, frontegg-requested-application-id, Authorization, X-Requested-With, Accept, Origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };

  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

function parseHeaders(req: IncomingMessage): Record<string, string> {
  const headers: Record<string, string> = {};
  Object.keys(req.headers).forEach((key) => {
    const value = req.headers[key];
    if (typeof value === 'string') {
      headers[key.toLowerCase()] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      headers[key.toLowerCase()] = value[0];
    }
  });
  return headers;
}

async function handler(req: IncomingMessage, res: ServerResponse) {
  // Only handle /api route (or root for simplicity)
  const url = req.url || '/';
  if (url !== '/' && url !== '/api') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  setCorsHeaders(res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Extract the requested application ID from headers
  const headers = parseHeaders(req);
  const requestedAppId =
    headers['frontegg-requested-application-id'] ||
    headers['x-frontegg-requested-application-id'] ||
    undefined;

  // Get customizations for this AppId
  const customizations = getCustomizationsForAppId(requestedAppId);

  if (!customizations) {
    console.log(
      `Request from application ID: ${requestedAppId || 'none'} - no customizations found`
    );
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
    return;
  }

  console.log(
    `Request from application ID: ${requestedAppId} - applying customizations`
  );

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(customizations));
}

const server = createServer(handler);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
  console.log(`\nTo test:`);
  console.log(`  curl -X GET http://localhost:${PORT}/api -H "frontegg-requested-application-id: your-app-id"`);
});

