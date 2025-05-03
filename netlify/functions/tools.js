exports.handler = async function(event, context) {
  // Mock tools data
  const mockTools = {
    tools: [
      { name: "VS Code", icon: "Code", color: "text-blue-500" },
      { name: "Git", icon: "GitBranch", color: "text-orange-500" },
      { name: "Docker", icon: "Box", color: "text-blue-400" },
      { name: "AWS", icon: "Cloud", color: "text-yellow-500" },
      { name: "GitHub", icon: "Github", color: "text-gray-500" },
      { name: "Kubernetes", icon: "Layers", color: "text-blue-600" },
      { name: "Figma", icon: "Figma", color: "text-purple-500" },
      { name: "Jupyter", icon: "Terminal", color: "text-orange-600" },
    ]
  };
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mockTools)
  };
}; 