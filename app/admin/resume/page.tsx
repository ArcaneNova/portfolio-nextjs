import { getCollection } from "@/lib/db";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download, FileEdit, Trash, Eye } from "lucide-react";

const templates = [
  {
    id: "1",
    name: "Web Developer Resume",
    role: "Web Developer",
    description: "Frontend and backend web development focused resume",
    isDefault: true,
  },
  {
    id: "2",
    name: "Machine Learning Engineer Resume",
    role: "Machine Learning Engineer",
    description: "Specialized resume for ML and AI roles",
    isDefault: false,
  },
  {
    id: "3",
    name: "Full Stack Developer Resume",
    role: "Full Stack Developer",
    description: "Comprehensive resume showcasing full stack capabilities",
    isDefault: false,
  },
];

export default function ResumePage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Resume Generator</h1>
          <p className="text-muted-foreground">
            Create and manage customized resumes for different roles
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Resume Template
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sections">Resume Sections</TabsTrigger>
          <TabsTrigger value="preview">Preview & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{template.name}</CardTitle>
                    {template.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <CardDescription>{template.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Resume Sections</CardTitle>
              <CardDescription>
                Add and edit sections for your resume templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Select a template to manage its sections
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>
                Preview and export your resume in different formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <p className="text-muted-foreground">
                  Select a template to preview your resume
                </p>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Select Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 