"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Upload } from "lucide-react";

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

export default function NewChallengePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: new Date().toISOString().substring(0, 10), // Today's date in YYYY-MM-DD format
    totalDays: 100,
    image: null as File | null,
  });

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
    
    if (!formData.title || !formData.description || !formData.startDate || !formData.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields and upload an image.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("startDate", formData.startDate);
      form.append("totalDays", formData.totalDays.toString());
      
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch("/api/challenges", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create challenge");
      }

      toast({
        title: "Challenge created",
        description: "Your challenge has been created successfully.",
      });

      router.push("/admin/challenges");
      router.refresh();
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create challenge",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common challenge durations
  const challengeDurations = [
    { value: 7, label: "7 Days (1 week)" },
    { value: 14, label: "14 Days (2 weeks)" },
    { value: 30, label: "30 Days (1 month)" },
    { value: 60, label: "60 Days (2 months)" },
    { value: 100, label: "100 Days" },
    { value: 365, label: "365 Days (1 year)" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/challenges" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Challenges
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Challenge</h1>
        <p className="text-muted-foreground">
          Start a new learning challenge to track your progress
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
              <CardDescription>
                Basic information about your challenge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  placeholder="e.g., 100 Days of Coding"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  placeholder="What is this challenge about?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-10"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalDays">Challenge Duration <span className="text-red-500">*</span></Label>
                <select
                  id="totalDays"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.totalDays}
                  onChange={(e) => setFormData({ ...formData, totalDays: parseInt(e.target.value) })}
                  required
                >
                  {challengeDurations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Challenge Image <span className="text-red-500">*</span></CardTitle>
              <CardDescription>
                Upload a cover image for your challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-sm text-muted-foreground">
                        {imagePreview ? "Change image" : "Click to upload an image"}
                      </p>
                    </div>
                  </Label>
                </div>

                {imagePreview && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Challenge preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/challenges">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Challenge"}
          </Button>
        </div>
      </form>
    </div>
  );
} 