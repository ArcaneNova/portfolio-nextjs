"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Trash2, Plus, CalendarIcon, Edit, ExternalLink } from "lucide-react";
import { FileUploader } from "@/components/admin/file-uploader";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL").or(z.string().length(0)),
  launchDate: z.date(),
  projectUrl: z.string().url("Must be a valid URL"),
  tags: z.string(), // We'll convert this to array before submission
  featured: z.boolean().default(false),
  status: z.enum(["Launched", "Launching Soon"]).default("Launching Soon"),
});

type LaunchFormValues = z.infer<typeof formSchema>;

interface Launch {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  launchDate: string;
  projectUrl: string;
  tags: string[];
  featured: boolean;
  status: "Launched" | "Launching Soon";
  createdAt: string;
  updatedAt: string;
}

export default function LaunchesClient() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentLaunch, setCurrentLaunch] = useState<Launch | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<LaunchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      launchDate: new Date(),
      projectUrl: "",
      tags: "",
      featured: false,
      status: "Launching Soon",
    },
  });

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/launches`, {
        method: "GET",
        cache: "no-store",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(`Failed to fetch launches: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      setLaunches(data);
    } catch (error) {
      console.error("Error fetching launches:", error);
      toast({
        title: "Error",
        description: "Failed to fetch launches. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to fetch launches with a retry mechanism
    const fetchWithRetry = async (retries = 3, delay = 1000) => {
      try {
        await fetchLaunches();
      } catch (err) {
        if (retries > 0) {
          console.log(`Retrying fetch... (${retries} attempts left)`);
          setTimeout(() => fetchWithRetry(retries - 1, delay * 1.5), delay);
        }
      }
    };
    
    fetchWithRetry();
  }, []);

  const handleSubmit = async (values: LaunchFormValues) => {
    try {
      setIsSubmitting(true);

      // Convert comma-separated tags to array
      const tagsArray = values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const url = isEditing
        ? `/api/admin/launches/${currentLaunch?._id}`
        : "/api/admin/launches";
      
      const method = isEditing ? "PUT" : "POST";

      let res;
      
      // If there's a selected image file, use FormData
      if (selectedImage) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("projectUrl", values.projectUrl);
        formData.append("launchDate", values.launchDate.toISOString());
        formData.append("featured", String(values.featured));
        formData.append("status", values.status);
        formData.append("tags", JSON.stringify(tagsArray));
        formData.append("image", selectedImage);

        res = await fetch(url, {
          method,
          body: formData,
        });
      } else {
        // Otherwise, use JSON
        const payload = {
          ...values,
          tags: tagsArray,
        };

        res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error:", errorData, res.status, res.statusText);
        throw new Error(`Failed to ${isEditing ? "update" : "create"} launch: ${res.status} ${res.statusText}`);
      }

      toast({
        title: "Success",
        description: `Launch ${isEditing ? "updated" : "created"} successfully`,
      });

      setIsFormOpen(false);
      fetchLaunches();
      setSelectedImage(null);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} launch`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (launch: Launch) => {
    setCurrentLaunch(launch);
    setIsEditing(true);

    // Convert date string to Date object
    const launchDate = new Date(launch.launchDate);

    // Convert tags array to comma-separated string
    const tagsString = launch.tags.join(", ");

    form.reset({
      title: launch.title,
      description: launch.description,
      imageUrl: launch.imageUrl,
      launchDate: launchDate,
      projectUrl: launch.projectUrl,
      tags: tagsString,
      featured: launch.featured,
      status: launch.status || "Launching Soon",
    });

    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!currentLaunch) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/admin/launches/${currentLaunch._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete launch");

      toast({
        title: "Success",
        description: "Launch deleted successfully",
      });

      setIsDeleteModalOpen(false);
      fetchLaunches();
    } catch (error) {
      console.error("Error deleting launch:", error);
      toast({
        title: "Error",
        description: "Failed to delete launch",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNew = () => {
    setCurrentLaunch(null);
    setIsEditing(false);
    setSelectedImage(null);
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      launchDate: new Date(),
      projectUrl: "",
      tags: "",
      featured: false,
      status: "Launching Soon",
    });
    setIsFormOpen(true);
  };

  return (
    <Card className="w-full border-slate-800 bg-slate-950/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Recent Launches</CardTitle>
          <CardDescription>
            Manage your project and app launches to showcase on your portfolio
          </CardDescription>
        </div>
        <Button onClick={handleAddNew} className="gap-1">
          <Plus size={16} /> Add Launch
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : launches.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg border-slate-700">
            <p className="text-muted-foreground mb-4">No launches have been added yet</p>
            <Button onClick={handleAddNew} variant="outline">
              <Plus size={16} className="mr-2" /> Add Your First Launch
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {launches.map((launch) => (
                  <TableRow key={launch._id}>
                    <TableCell>
                      <div className="h-12 w-12 bg-slate-800 rounded overflow-hidden">
                        <img
                          src={launch.imageUrl || "/placeholder.jpg"}
                          alt={launch.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.jpg";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{launch.title}</TableCell>
                    <TableCell>
                      {new Date(launch.launchDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={launch.status === "Launched" ? "default" : "outline"} 
                        className={launch.status === "Launched" 
                          ? "bg-green-600 hover:bg-green-700 font-medium"
                          : "border-amber-600 text-amber-500 font-medium"
                        }
                      >
                        {launch.status === "Launched" 
                          ? "🚀 Launched" 
                          : "⏳ Launching Soon"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {launch.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {launch.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{launch.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {launch.featured ? (
                        <Badge variant="default" className="bg-blue-500">
                          Featured
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(launch)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a 
                          href={launch.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCurrentLaunch(launch);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Launch Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Launch" : "Add New Launch"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details of this launch"
                : "Add a new project or app launch to showcase on your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome SaaS App" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of your project"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Launch Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <FileUploader 
                            onImageChange={setSelectedImage} 
                            label="Upload Launch Image"
                            currentImageUrl={field.value}
                          />
                          <div className="text-xs text-muted-foreground">
                            {selectedImage 
                              ? `Selected: ${selectedImage.name}` 
                              : field.value 
                                ? "Current image will be used" 
                                : "No image selected (placeholder will be used)"}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="mt-2">
                        Upload an image or leave empty to use placeholder image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="launchDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Launch Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://myproject.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="SaaS, React, AI, Web App" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma separated list of tags (e.g. React, NextJS, API)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Launch Status</FormLabel>
                      <FormControl>
                        <select
                          className="w-full px-3 py-2 rounded-md border border-input bg-transparent text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <option value="Launched">Launched</option>
                          <option value="Launching Soon">Launching Soon</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Set the current status of this launch
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          Feature this launch prominently on your portfolio
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? "Update Launch" : "Add Launch"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this launch? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
