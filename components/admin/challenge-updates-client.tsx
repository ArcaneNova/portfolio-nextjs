"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, Upload, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Challenge, ChallengeUpdate } from "@/lib/models/challenge";
import { format } from "date-fns";

interface ChallengeUpdatesClientProps {
  challengeId: string;
  initialChallenge?: Challenge | null;
  initialUpdates?: ChallengeUpdate[];
}

export function ChallengeUpdatesClient({ 
  challengeId,
  initialChallenge = null,
  initialUpdates = []
}: ChallengeUpdatesClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(!initialChallenge);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(initialChallenge);
  const [updates, setUpdates] = useState<ChallengeUpdate[]>(initialUpdates);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    day: initialChallenge ? (initialChallenge.currentDay || 0) + 1 : 0,
    topic: "",
    description: "",
    date: new Date().toISOString().substring(0, 10), // Today's date in YYYY-MM-DD format
    image: null as File | null,
  });

  useEffect(() => {
    // Check if user is authenticated in localStorage
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    const fetchChallenge = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/challenges/${challengeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch challenge");
        }
        
        const data = await response.json();
        setChallenge(data);
        
        // Set default day to be the next day in the challenge
        const nextDay = (data.currentDay || 0) + 1;
        if (nextDay <= data.totalDays) {
          setFormData((prev) => ({ ...prev, day: nextDay }));
        }
        
        // Fetch updates
        const updatesResponse = await fetch(`/api/challenges/${challengeId}/updates`);
        if (updatesResponse.ok) {
          const updatesData = await updatesResponse.json();
          setUpdates(updatesData.updates || []);
        }
      } catch (error) {
        console.error("Error fetching challenge:", error);
        toast({
          title: "Error",
          description: "Failed to fetch challenge details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!initialChallenge) {
      fetchChallenge();
    }
  }, [challengeId, toast, initialChallenge]);

  // If not authenticated, show nothing (the layout will handle the login screen)
  if (!isAuthenticated) {
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.day || !formData.topic || !formData.description || !formData.date) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const form = new FormData();
      form.append("day", formData.day.toString());
      form.append("topic", formData.topic);
      form.append("description", formData.description);
      form.append("date", formData.date);
      
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch(`/api/challenges/${challengeId}/updates`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add challenge update");
      }

      toast({
        title: "Progress updated",
        description: `Day ${formData.day} progress has been recorded.`,
      });

      // Reset form
      setFormData({
        day: formData.day + 1,
        topic: "",
        description: "",
        date: new Date().toISOString().substring(0, 10),
        image: null,
      });
      setImagePreview(null);
      
      // Refresh data
      router.refresh();
      
      // Fetch updated challenge and updates
      const challengeResponse = await fetch(`/api/challenges/${challengeId}`);
      if (challengeResponse.ok) {
        const challengeData = await challengeResponse.json();
        setChallenge(challengeData);
      }
      
      const updatesResponse = await fetch(`/api/challenges/${challengeId}/updates`);
      if (updatesResponse.ok) {
        const updatesData = await updatesResponse.json();
        setUpdates(updatesData.updates || []);
      }
    } catch (error) {
      console.error("Error adding challenge update:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add challenge update",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const deleteUpdate = async (day: number) => {
    if (!confirm(`Are you sure you want to delete the update for Day ${day}?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/challenges/${challengeId}/updates`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateDay: day }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete update");
      }
      
      toast({
        title: "Update deleted",
        description: `Day ${day} update has been removed.`,
      });
      
      // Refresh data
      router.refresh();
      
      // Fetch updated challenge and updates
      const challengeResponse = await fetch(`/api/challenges/${challengeId}`);
      if (challengeResponse.ok) {
        const challengeData = await challengeResponse.json();
        setChallenge(challengeData);
      }
      
      const updatesResponse = await fetch(`/api/challenges/${challengeId}/updates`);
      if (updatesResponse.ok) {
        const updatesData = await updatesResponse.json();
        setUpdates(updatesData.updates || []);
      }
    } catch (error) {
      console.error("Error deleting update:", error);
      toast({
        title: "Error",
        description: "Failed to delete the update.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading challenge details...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/challenges" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Challenges
            </Link>
          </Button>
        </div>
        
        <Card className="text-center p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Challenge Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The challenge you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/admin/challenges">Return to Challenges</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const sortedUpdates = [...updates].sort((a, b) => b.day - a.day);

  return (
    <div className="p-6">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin/challenges" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">{challenge.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline">Day {challenge.currentDay} of {challenge.totalDays}</Badge>
              <span>•</span>
              <span>Started {new Date(challenge.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/challenges/${challengeId}`}>
                Edit Challenge
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/journey/challenges/${challenge._id}`} target="_blank">
                View Public Page
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Update Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add Progress Update</CardTitle>
              <CardDescription>Record your progress for this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day #</Label>
                    <Input
                      id="day"
                      type="number"
                      min="1"
                      max={challenge.totalDays}
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Title</Label>
                  <Input
                    id="topic"
                    placeholder="What did you work on today?"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you learned or accomplished..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Image (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image")?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" /> Upload Image
                    </Button>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {formData.image && (
                      <span className="text-sm text-muted-foreground">
                        {formData.image.name}
                      </span>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-2 relative h-40 rounded-md overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" /> Add Update
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Progress Updates List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Progress Updates</CardTitle>
              <CardDescription>
                {updates.length === 0 
                  ? "No updates recorded yet. Use the form to add your first update."
                  : `${updates.length} updates recorded for this challenge`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {updates.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <div className="text-muted-foreground mb-2">No updates yet</div>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Start tracking your challenge progress by recording your first update using the form on the left.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedUpdates.map((update) => (
                    <div key={update.day} className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 items-start">
                          <div className="min-w-16 text-center">
                            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full font-medium">
                              Day {update.day}
                            </span>
                            <div className="text-xs text-muted-foreground mt-1">
                              {format(new Date(update.date), "MMM d, yyyy")}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">{update.topic}</h3>
                            <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">
                              {update.description}
                            </p>
                            {update.imageUrl && (
                              <div className="mt-3 relative h-48 sm:h-64 rounded-md overflow-hidden">
                                <Image
                                  src={update.imageUrl}
                                  alt={update.topic}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteUpdate(update.day)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 