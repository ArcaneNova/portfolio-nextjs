"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Upload, Save, Trash, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Challenge } from "@/lib/models/challenge";

interface ChallengeEditClientProps {
  challenge: Challenge;
}

export default function ChallengeEditClient({ challenge }: ChallengeEditClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(challenge.image || null);

  const [formData, setFormData] = useState({
    title: challenge.title,
    description: challenge.description,
    startDate: challenge.startDate ? new Date(challenge.startDate).toISOString().substring(0, 10) : "",
    totalDays: challenge.totalDays,
    image: null as File | null,
  });

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show nothing (the layout will handle the login screen)
  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "totalDays" ? parseInt(value) || 0 : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.startDate || !formData.totalDays) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
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

      const response = await fetch(`/api/challenges/${challenge._id}`, {
        method: "PATCH",
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update challenge");
      }

      toast({
        title: "Challenge updated",
        description: "The challenge has been updated successfully",
      });
      
      // Refresh data
      router.refresh();
      router.push("/admin/challenges");
    } catch (error) {
      console.error("Error updating challenge:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update challenge",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/challenges/${challenge._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }

      toast({
        title: "Challenge deleted",
        description: "The challenge has been deleted successfully",
      });
      
      // Close the dialog and redirect
      setIsDeleteDialogOpen(false);
      router.refresh();
      router.push("/admin/challenges");
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toast({
        title: "Error",
        description: "Failed to delete the challenge",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin/challenges" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Edit Challenge</h1>
        <p className="text-muted-foreground">
          Update the details of your challenge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter challenge title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="totalDays">Total Days</Label>
                <Input 
                  id="totalDays" 
                  name="totalDays" 
                  type="number" 
                  min="1"
                  value={formData.totalDays}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" /> 
                    {formData.image ? "Change Image" : "Select Image"}
                  </Button>
                  <Input 
                    id="image" 
                    name="image" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.image ? formData.image.name : "No new image selected. Current image will be kept."}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter challenge description"
                rows={5}
                required
              />
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="destructive"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <Trash className="h-4 w-4" /> 
                    Delete Challenge
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Delete Challenge
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this challenge? This action cannot be undone 
                      and all challenge updates will be permanently deleted.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDelete}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⧖</span>
                          Deleting...
                        </>
                      ) : (
                        <>Delete</>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push("/admin/challenges")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⧖</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        <div>
          <CardContent className="p-0">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium">Challenge Preview</h3>
              </div>
              
              <div className="relative h-48 overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Challenge preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">No image selected</p>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-bold text-lg mb-1">{formData.title || "Challenge Title"}</h4>
                <div className="text-xs text-muted-foreground mb-2">
                  {formData.startDate ? `Start Date: ${new Date(formData.startDate).toLocaleDateString()}` : "Start Date"}
                  {" • "}
                  {formData.totalDays ? `${formData.totalDays} Days` : "Duration"}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {formData.description || "Challenge description will appear here"}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href={`/admin/challenges/${challenge._id}/updates`} className="flex items-center">
                    <Image 
                      src="/icons/update.svg" 
                      alt="Updates" 
                      width={16} 
                      height={16}
                      className="mr-2" 
                    /> 
                    Manage Updates
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <Link href={`/journey/challenges/${challenge._id ? challenge._id.toString() : ''}/`} target="_blank" className="flex items-center">
                    <Image 
                      src="/icons/view.svg" 
                      alt="View" 
                      width={16} 
                      height={16}
                      className="mr-2" 
                    /> 
                    View Public Page
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
