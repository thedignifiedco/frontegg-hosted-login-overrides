import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCustomizationsForAppId } from './config/appCustomizations';

// Serverless API endpoint for Frontegg login overrides
// Supports conditional styling based on AppId
// Compatible with Vercel, AWS Lambda, and other serverless platforms

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS for Frontegg to fetch this endpoint
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
    'Access-Control-Allow-Headers':
      'Content-Type, x-frontegg-framework, X-Frontegg-Framework, x-frontegg-sdk, X-Frontegg-Sdk, frontegg-requested-application-id, Authorization, X-Requested-With, Accept, Origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // 24 hours
  };

  // Set all CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the requested application ID from headers
  const requestedAppId =
    (req.headers['frontegg-requested-application-id'] as string) ||
    (req.headers['x-frontegg-requested-application-id'] as string) ||
    undefined;

  // Get customizations for this AppId
  const customizations = getCustomizationsForAppId(requestedAppId);

  if (!customizations) {
    console.log(
      `Request from application ID: ${requestedAppId || 'none'} - no customizations found`
    );
    // Return empty object if no customizations found (Frontegg will use defaults)
    return res.status(200).json({});
  }

  console.log(
    `Request from application ID: ${requestedAppId} - applying customizations`
  );

  // Return the customizations for this AppId
  res.status(200).json(customizations);
}

