import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Trash } from "lucide-react";

interface Message {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

async function getMessages() {
  const messagesCollection = await getCollection("messages");
  const messages = await messagesCollection.find({}).sort({ createdAt: -1 }).toArray();
  
  return messages as Message[];
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const unreadMessages = messages.filter(message => !message.read);
  const readMessages = messages.filter(message => message.read);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Manage messages from your contact form.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Badge variant="outline" className="px-3 py-1">
          Total: {messages.length}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          Unread: {unreadMessages.length}
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <MessagesTable messages={messages} />
        </TabsContent>
        
        <TabsContent value="unread">
          <MessagesTable messages={unreadMessages} />
        </TabsContent>
        
        <TabsContent value="read">
          <MessagesTable messages={readMessages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MessagesTable({ messages }: { messages: Message[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message._id.toString()}>
                  <TableCell>
                    <Checkbox checked={message.read} />
                  </TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{message.subject}</TableCell>
                  <TableCell>{format(new Date(message.createdAt), "MMM dd, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 