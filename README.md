# Frontegg Overrides Serverless API

A serverless API endpoint that provides conditional Frontegg login page customizations based on AppId. This allows you to serve different themes and localizations for different Frontegg applications from a single endpoint.

## Features

- ✅ **AppId-based conditional logic** - Different customizations for different Frontegg applications
- ✅ **CORS-enabled** - Properly configured for Frontegg hosted mode
- ✅ **Serverless-ready** - Works with Vercel, AWS Lambda, and other serverless platforms
- ✅ **TypeScript** - Fully typed for better development experience
- ✅ **Default customization theme** - Includes a professional, modern customization template

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file (or set environment variables in your deployment platform):

```env
# Default AppId for default customization
DEFAULT_APP_ID=your-frontegg-app-id-here

# Optional: Custom logo and background URLs
LOGO_URL=https://your-domain.com/logo.png
BACKGROUND_IMAGE_URL=https://your-domain.com/background.jpg

# Optional: Alternative customization assets
ALT_LOGO_URL=https://your-domain.com/alt-logo.png
```

### 3. Configure AppIds

Edit `src/config/appCustomizations.ts` to add your AppIds and their customizations:

```typescript
const APP_CUSTOMIZATIONS: Record<string, FronteggOverrides> = {
  'your-app-id-1': defaultCustomization,
  'your-app-id-2': alternativeCustomization,
  // Add more mappings as needed
};
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard or via CLI:
```bash
vercel env add DEFAULT_APP_ID
```

### AWS Lambda

1. Use the AWS Lambda handler instead of the Vercel handler:
   - Update your Lambda function to use `src/aws-lambda-handler.ts` as the entry point
   - The handler exports a `handler` function compatible with API Gateway

2. Build the project:
```bash
npm run build
```

3. Package and deploy using AWS SAM, Serverless Framework, or your preferred method.

4. Set environment variables in your Lambda function configuration:
   - `DEFAULT_APP_ID`
   - `LOGO_URL` (optional)
   - `BACKGROUND_IMAGE_URL` (optional)

### Other Platforms

The function is compatible with any Node.js serverless platform. The handler exports a standard async function that accepts `(req, res)` parameters.

## Usage

### In Frontegg Dashboard

1. Go to your Frontegg dashboard
2. Navigate to **Settings** → **Customizations** → **Hosted Mode**
3. Set the **Override URL** to your deployed endpoint:
   ```
   https://your-domain.com/api
   ```

### Testing Locally

```bash
npm run dev
```

The endpoint will be available at `http://localhost:3000/api`

### Testing with curl

```bash
curl -X GET \
  https://your-deployed-url.com/api \
  -H "frontegg-requested-application-id: your-app-id"
```

## Customization Structure

The customization object follows Frontegg's themeV2 and localizations format:

- **themeV2**: Visual styling (colors, fonts, layouts, etc.)
- **localizations**: Text content for different languages

See [Frontegg Documentation](https://developers.frontegg.com/ciam/sdks/customizations/configuration-old#customization-in-the-hosted-mode) for more details.

## Adding New Customizations

1. Create a new customization object in `src/config/appCustomizations.ts`:

```typescript
const myCustomTheme: FronteggOverrides = {
  themeV2: {
    loginBox: {
      // Your customization here
    }
  },
  localizations: {
    en: {
      loginBox: {
        // Your localizations here
      }
    }
  }
};
```

2. Add it to the `APP_CUSTOMIZATIONS` mapping:

```typescript
const APP_CUSTOMIZATIONS: Record<string, FronteggOverrides> = {
  'my-app-id': myCustomTheme,
  // ... other mappings
};
```

## Project Structure

```
.
├── src/
│   ├── index.ts                    # Main serverless function handler
│   └── config/
│       └── appCustomizations.ts    # AppId-to-customization mappings
├── package.json
├── tsconfig.json
├── vercel.json                     # Vercel deployment config
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEFAULT_APP_ID` | Default Frontegg AppId for default customization | Yes |
| `LOGO_URL` | URL for the default logo image | No |
| `BACKGROUND_IMAGE_URL` | URL for the default background image | No |
| `ALT_LOGO_URL` | URL for alternative logo (if using alternative customization) | No |

## License

MIT

