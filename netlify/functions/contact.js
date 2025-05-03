exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    
    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }
    
    // In a real application, you would send an email or store the contact info
    // For this static deployment, we'll just return a success response
    console.log('Contact form submission:', { name, email, subject });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Thank you for your message. We'll get back to you soon!"
      })
    };
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process your request' })
    };
  }
}; 