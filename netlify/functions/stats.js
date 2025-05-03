exports.handler = async function(event, context) {
  // Mock stats data
  const mockStats = {
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
    platformStats: [
      {
        platform: "GitHub",
        icon: "Github",
        stats: [
          { label: "Stars", value: "250+" },
          { label: "Repositories", value: "45" },
          { label: "Followers", value: "120" },
          { label: "Contributions", value: "2,500+" },
        ],
      },
      {
        platform: "LeetCode",
        icon: "Code",
        stats: [
          { label: "Problems Solved", value: "450+" },
          { label: "Contest Rating", value: "1850" },
          { label: "Global Rank", value: "Top 5%" },
          { label: "Badges", value: "15" },
        ],
      },
      {
        platform: "GeeksforGeeks",
        icon: "Award",
        stats: [
          { label: "Problems Solved", value: "350+" },
          { label: "Articles Published", value: "12" },
          { label: "Institution Rank", value: "#3" },
          { label: "Total Score", value: "2200" },
        ],
      },
      {
        platform: "Codeforces",
        icon: "Trophy",
        stats: [
          { label: "Rating", value: "1750" },
          { label: "Rank", value: "Expert" },
          { label: "Contests", value: "35" },
          { label: "Problems Solved", value: "320+" },
        ],
      },
    ]
  };
  
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mockStats)
  };
}; 