"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestChallengesPage() {
  const [challengeId, setChallengeId] = useState<string>("");
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchChallenge = async () => {
    if (!challengeId.trim()) {
      setError("Please enter a challenge ID");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/challenges/${challengeId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch challenge");
      }
      
      setChallenge(data);
    } catch (err) {
      console.error("Error fetching challenge:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch challenge");
      setChallenge(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Test Challenge Fetching</h1>
      
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <Input 
            value={challengeId}
            onChange={(e) => setChallengeId(e.target.value)}
            placeholder="Enter challenge ID"
            className="max-w-md"
          />
          <Button 
            onClick={fetchChallenge}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Challenge"}
          </Button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 mb-4">
            {error}
          </div>
        )}
      </div>
      
      {challenge && (
        <Card>
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(challenge, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Example Challenge IDs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setChallengeId("686b941c4124cabfdb30b18c")}
          >
            Use ID: 686b941c4124cabfdb30b18c
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const urlParams = new URLSearchParams(window.location.search);
              const id = urlParams.get('id');
              if (id) {
                setChallengeId(id);
              }
            }}
          >
            Use ID from URL param
          </Button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Debug Information</h2>
        <div className="bg-muted p-4 rounded-md">
          <p>URL: <code>/api/challenges/{challengeId || "[id]"}</code></p>
        </div>
      </div>
    </div>
  );
}
