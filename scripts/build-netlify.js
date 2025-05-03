const fs = require('fs');
const path = require('path');

// Ensure the build process is successful even with API routes in a static export
try {
  // Create the necessary directories if they don't exist
  if (!fs.existsSync('out/api')) {
    fs.mkdirSync('out/api', { recursive: true });
  }
  
  // Create a fallback HTML for each API route to prevent 404s
  const apiDir = path.join('out', 'api');
  if (fs.existsSync(apiDir)) {
    // Create a dummy JSON response for API endpoints
    ['stats', 'tools', 'achievements', 'contact'].forEach(endpoint => {
      const endpointDir = path.join(apiDir, endpoint);
      if (!fs.existsSync(endpointDir)) {
        fs.mkdirSync(endpointDir, { recursive: true });
      }
      
      // Create an index.html file with a proper JSON response
      fs.writeFileSync(
        path.join(endpointDir, 'index.html'),
        `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>API Response</title>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('json').textContent = JSON.stringify({
        message: "This is a static version of the API. In production, this would return dynamic data."
      }, null, 2);
    });
  </script>
</head>
<body>
  <pre id="json"></pre>
</body>
</html>`
      );
    });
  }
  
  console.log('Successfully completed Netlify build script');
} catch (error) {
  console.error('Error in Netlify build script:', error);
} 