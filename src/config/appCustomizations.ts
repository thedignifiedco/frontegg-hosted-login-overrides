// Configuration for AppId-specific Frontegg customizations
// Add new AppIds and their customizations here

interface FronteggOverrides {
  themeV2: {
    loginBox: {
      themeName?: string;
      logo?: {
        image: string;
        alt: string;
        maxHeight: string;
      };
      rootStyle?: Record<string, string>;
      boxStyle?: Record<string, string>;
      typography?: Record<string, string>;
      inputTheme?: Record<string, any>;
      submitButtonTheme?: Record<string, any>;
      linkButtonTheme?: Record<string, any>;
      socialLogins?: Record<string, any>;
      signup?: Record<string, any>;
      login?: Record<string, any>;
      boxFooter?: {
        html?: string;
        text?: string;
        style?: Record<string, string>;
      };
      mfa?: Record<string, any>;
      errorTheme?: Record<string, string>;
    };
  };
  localizations: {
    [locale: string]: {
      loginBox: {
        login?: Record<string, string>;
        signup?: Record<string, string>;
        forgotPassword?: Record<string, string>;
        activateAccount?: Record<string, string>;
        mfa?: Record<string, string>;
        errors?: Record<string, string>;
      };
    };
  };
}

// Default customization template
const defaultCustomization: FronteggOverrides = {
  themeV2: {
    loginBox: {
      themeName: 'modern',
      logo: {
        image: process.env.LOGO_URL || 'https://biopharma.dignifiedlabs.com/pharmacy.png',
        alt: 'Dignified Labs Logo',
        maxHeight: '60px',
      },
      rootStyle: {
        background:
          'linear-gradient(135deg, rgba(0, 102, 204, 0.6) 0%, rgba(0, 68, 153, 0.6) 50%, rgba(0, 51, 102, 0.6) 100%), url("' +
          (process.env.BACKGROUND_IMAGE_URL ||
            'https://biopharma.dignifiedlabs.com/molecule-pattern-background.jpg') +
          '")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      },
      boxStyle: {
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 102, 204, 0.15)',
        border: '1px solid rgba(0, 102, 204, 0.1)',
        padding: '40px',
        maxWidth: '480px',
      },
      typography: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        color: '#1a1a1a',
      },
      inputTheme: {
        base: {
          backgroundColor: '#f8f9fa',
          borderColor: '#e0e7ed',
          color: '#1a1a1a',
          borderRadius: '8px',
          borderWidth: '2px',
          borderStyle: 'solid',
          fontSize: '15px',
          fontWeight: '400',
          height: '48px',
          padding: '0 16px',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
        },
        hover: {
          borderColor: '#0066cc',
          backgroundColor: '#ffffff',
        },
        focus: {
          borderColor: '#0066cc',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.1)',
          outline: 'none',
        },
        error: {
          borderColor: '#dc3545',
          backgroundColor: '#fff5f5',
        },
      },
      submitButtonTheme: {
        base: {
          backgroundColor: '#0066cc',
          color: '#ffffff',
          borderColor: 'transparent',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          height: '48px',
          padding: '0 24px',
          transition: 'all 0.2s ease',
          textTransform: 'none',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
        },
        hover: {
          backgroundColor: '#0052a3',
          boxShadow: '0 6px 16px rgba(0, 102, 204, 0.4)',
          transform: 'translateY(-1px)',
        },
        active: {
          backgroundColor: '#004499',
          transform: 'translateY(0)',
        },
      },
      linkButtonTheme: {
        base: {
          color: '#0066cc',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'color 0.2s ease',
        },
        hover: {
          color: '#0052a3',
          textDecoration: 'underline',
        },
      },
      socialLogins: {
        divider: {
          text: 'OR',
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500',
        },
      },
      signup: {},
      login: {
        docTitle: 'Dignified Labs - Clinical Research Portal Login',
      },
      boxFooter: {
        html:
          '<div style="text-align: center; margin-top: 30px; font-size: 12px; line-height: 16px; color: #36373C;">By continuing, I agree to Dignified Labs\' <a target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: none;" href="https://dignifiedlabs.com/terms">Terms of Service</a> and <a target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: none;" href="https://dignifiedlabs.com/policy">Privacy Policy</a>.</div>',
        text:
          'By continuing, I agree to Dignified Labs\' Terms of Service and Privacy Policy.',
        style: {
          textAlign: 'center',
          marginTop: '30px',
          fontSize: '12px',
          lineHeight: '16px',
          color: '#36373C',
        },
      },
      mfa: {
        boxStyle: {
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 102, 204, 0.15)',
        },
      },
      errorTheme: {
        color: '#dc3545',
        backgroundColor: '#fff5f5',
        borderColor: '#dc3545',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '14px',
        marginTop: '8px',
      },
    },
  },
  localizations: {
    en: {
      loginBox: {
        login: {
          title: 'Welcome to Dignified Labs',
          subtitle: 'Clinical Research Portal',
          emailLabel: 'Professional Email',
          passwordLabel: 'Password',
          submitButtonText: 'Access Portal',
          forgotPasswordText: 'Forgot your password?',
          noAccountText: 'New to our platform?',
          signUpText: 'Request Access',
          docTitle: 'Dignified Labs - Clinical Research Portal Login',
        },
        signup: {
          title: 'Join Dignified Labs',
          subtitle: 'Request access to our clinical research platform',
          emailLabel: 'Professional Email',
          passwordLabel: 'Create Password',
          nameLabel: 'Full Name',
          submitButtonText: 'Request Access',
          hasAccountText: 'Already have access?',
          signInText: 'Sign In',
          docTitle: 'Dignified Labs - Request Access',
          disclaimerCheckboxLabel:
            'I acknowledge that I am an authorized professional',
          termsLinkText: 'Terms of Service',
          privacyLinkText: 'Privacy Policy',
          passwordRequirements:
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
        },
        forgotPassword: {
          title: 'Reset Password',
          subtitle:
            'Enter your professional email to receive password reset instructions',
          emailLabel: 'Professional Email',
          submitButtonText: 'Send Reset Instructions',
          backToLoginText: 'Back to Login',
          docTitle: 'Dignified Labs - Reset Password',
        },
        activateAccount: {
          title: 'Activate Your Account',
          subtitle:
            'Your account activation is required to access the clinical research portal',
          submitButtonText: 'Activate Account',
          docTitle: 'Dignified Labs - Activate Account',
        },
        mfa: {
          title: 'Two-Factor Authentication',
          subtitle: 'Enter the verification code from your authenticator app',
          submitButtonText: 'Verify',
          docTitle: 'Dignified Labs - Two-Factor Authentication',
        },
        errors: {
          invalidEmail: 'Please enter a valid professional email address',
          requiredField: 'This field is required',
          passwordTooShort: 'Password must be at least 8 characters',
          passwordTooWeak:
            'Password must include uppercase, lowercase, number, and special character',
          invalidCredentials:
            'Invalid email or password. Please try again.',
          accountLocked:
            'Account temporarily locked due to multiple failed attempts. Please try again later.',
          networkError:
            'Network error. Please check your connection and try again.',
          genericError:
            'An error occurred. Please try again or contact support.',
        },
      },
    },
  },
};

// Example: Alternative customization for a different AppId
// You can create multiple customizations and map them to different AppIds
const alternativeCustomization: FronteggOverrides = {
  themeV2: {
    loginBox: {
      themeName: 'modern',
      logo: {
        image: process.env.ALT_LOGO_URL || 'https://example.com/logo.png',
        alt: 'Alternative Logo',
        maxHeight: '60px',
      },
      rootStyle: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      },
      boxStyle: {
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '480px',
      },
      submitButtonTheme: {
        base: {
          backgroundColor: '#667eea',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          height: '48px',
        },
        hover: {
          backgroundColor: '#5568d3',
        },
      },
    },
  },
  localizations: {
    en: {
      loginBox: {
        login: {
          title: 'Welcome',
          subtitle: 'Sign in to continue',
          submitButtonText: 'Sign In',
        },
      },
    },
  },
};

// AppId to customization mapping
// Add your AppIds here and map them to their respective customizations
const APP_CUSTOMIZATIONS: Record<string, FronteggOverrides> = {
  // Default customization - use your actual AppId from environment variable
  [process.env.DEFAULT_APP_ID || '']: defaultCustomization,
  
  // Example: Map a different AppId to alternative customization
  // 'your-alternative-app-id': alternativeCustomization,
  
  // Add more AppId mappings here as needed
};

/**
 * Get customizations for a specific AppId
 * @param appId - The Frontegg application ID
 * @returns Customizations object or null if not found
 */
export function getCustomizationsForAppId(
  appId: string | undefined
): FronteggOverrides | null {
  if (!appId) {
    return null;
  }

  // Check if we have customizations for this AppId
  const customizations = APP_CUSTOMIZATIONS[appId];

  if (customizations) {
    return customizations;
  }

  // If no specific customization found, return null
  // Frontegg will use default styling
  return null;
}

/**
 * Get all configured AppIds
 * @returns Array of configured AppIds
 */
export function getConfiguredAppIds(): string[] {
  return Object.keys(APP_CUSTOMIZATIONS).filter((id) => id.length > 0);
}

