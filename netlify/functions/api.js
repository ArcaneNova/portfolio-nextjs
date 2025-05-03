exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions/api', '');
  
  // Mock data based on path
  let responseData = {
    message: "This is a static API. In production, this would return dynamic data."
  };
  
  // Return different mock data based on the endpoint
  if (path.includes('/stats')) {
    responseData = {
      codingStats: [
        {
          label: "Lines of Code",
          value: "500,000+",
          icon: "Code",
          color: "from-purple-500 to-blue-500",
        },
        {
          label: "Total Projects",
          value: "75+",
          icon: "FileCode",
          color: "from-blue-500 to-cyan-500",
        },
        {
          label: "GitHub Contributions",
          value: "2,500+",
          icon: "GitPullRequest",
          color: "from-green-500 to-emerald-500",
        },
        {
          label: "Coding Awards",
          value: "12",
          icon: "Award",
          color: "from-yellow-500 to-orange-500",
        },
      ],
      platformStats: []
    };
  } else if (path.includes('/tools')) {
    responseData = {
      tools: []
    };
  } else if (path.includes('/achievements')) {
    responseData = {
      achievements: []
    };
  } else if (path.includes('/contact')) {
    responseData = {
      success: true,
      message: "Message received successfully."
    };
  }
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(responseData)
  };
}; 