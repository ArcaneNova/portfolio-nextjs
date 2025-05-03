const fs = require('fs');
const path = require('path');

// Ensure the build process is successful even with API routes in a static export
try {
  // Create the necessary directories if they don't exist
  if (!fs.existsSync('.next/server/app/api')) {
    fs.mkdirSync('.next/server/app/api', { recursive: true });
  }
  
  console.log('Successfully completed Netlify build script');
} catch (error) {
  console.error('Error in Netlify build script:', error);
} 