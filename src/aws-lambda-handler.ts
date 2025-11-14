// AWS Lambda handler version
// Use this if deploying to AWS Lambda instead of Vercel

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getCustomizationsForAppId } from './config/appCustomizations';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Enable CORS for Frontegg
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
    'Access-Control-Allow-Headers':
      'Content-Type, x-frontegg-framework, X-Frontegg-Framework, x-frontegg-sdk, X-Frontegg-Sdk, frontegg-requested-application-id, Authorization, X-Requested-With, Accept, Origin',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Extract the requested application ID from headers
  const requestedAppId =
    event.headers['frontegg-requested-application-id'] ||
    event.headers['x-frontegg-requested-application-id'] ||
    event.headers['Frontegg-Requested-Application-Id'] ||
    undefined;

  // Get customizations for this AppId
  const customizations = getCustomizationsForAppId(requestedAppId);

  if (!customizations) {
    console.log(
      `Request from application ID: ${requestedAppId || 'none'} - no customizations found`
    );
    // Return empty object if no customizations found
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };
  }

  console.log(
    `Request from application ID: ${requestedAppId} - applying customizations`
  );

  // Return the customizations for this AppId
  return {
    statusCode: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customizations),
  };
};

