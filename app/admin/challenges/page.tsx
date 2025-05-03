import Link from "next/link";
import Image from "next/image";
import { connect } from "@/lib/db";
import ChallengeModel from "@/lib/models/challenge";
import { Challenge } from "@/lib/models/challenge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Pencil, ListPlus, Trash } from "lucide-react";

async function getChallenges() {
  await connect();
  try {
    const challenges = await ChallengeModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return JSON.parse(JSON.stringify(challenges)) as Challenge[];
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Challenges</h1>
          <p className="text-muted-foreground">
            Manage your progress challenges and track your consistency
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/challenges/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create New Challenge
          </Link>
        </Button>
      </div>

      {challenges.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <h3 className="text-xl font-medium mb-2">No challenges yet</h3>
            <p className="text-muted-foreground mb-8">
              Create your first learning challenge to showcase your consistent progress
            </p>
            <Button asChild>
              <Link href="/admin/challenges/new">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Challenge
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => {
            const progressPercentage = (challenge.currentDay / challenge.totalDays) * 100;
            
            return (
              <Card key={challenge._id} className="overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-lg font-bold text-white">{challenge.title}</h3>
                  </div>
                </div>
                
                <CardContent className="py-4 flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="px-2 py-1">
                      Day {challenge.currentDay} of {challenge.totalDays}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Started: {new Date(challenge.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {challenge.description}
                  </p>
                  
                  {challenge.latestUpdate && (
                    <div className="bg-muted/50 p-3 rounded-lg text-sm mb-2">
                      <p className="font-medium mb-1">Latest Update: Day {challenge.latestUpdate.day}</p>
                      <p className="text-muted-foreground line-clamp-2">
                        {challenge.latestUpdate.topic}
                      </p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-0 flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/admin/challenges/${challenge._id}`}>
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link href={`/admin/challenges/${challenge._id}/updates`}>
                      <ListPlus className="h-4 w-4 mr-2" /> Add Progress
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 