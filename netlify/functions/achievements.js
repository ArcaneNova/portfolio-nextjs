exports.handler = async function(event, context) {
  // Parse query parameters
  const queryParams = new URLSearchParams(event.queryStringParameters || {});
  const limit = parseInt(queryParams.get('limit') || '4', 10);
  
  // Mock achievements data
  const allAchievements = [
    {
      _id: "ach1",
      title: "Hackathon Winner",
      description: "First place at University Tech Hackathon 2023",
      icon: "Trophy",
    },
    {
      _id: "ach2",
      title: "Tech Blog Feature",
      description: "Featured in a leading tech publication for innovative project",
      icon: "Award",
    },
    {
      _id: "ach3",
      title: "Open Source Star",
      description: "Project received 500+ stars on GitHub",
      icon: "Star",
    },
    {
      _id: "ach4",
      title: "AI Competition",
      description: "Top 5% in international machine learning competition",
      icon: "Medal",
    },
    {
      _id: "ach5",
      title: "Best Student Project",
      description: "Awarded best capstone project in Computer Science department",
      icon: "Trophy",
    },
    {
      _id: "ach6",
      title: "Coding Mentor",
      description: "Mentored 20+ students in web development technologies",
      icon: "Award",
    }
  ];
  
  // Limit the number of achievements returned
  const limitedAchievements = allAchievements.slice(0, limit);
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ achievements: limitedAchievements })
  };
}; 