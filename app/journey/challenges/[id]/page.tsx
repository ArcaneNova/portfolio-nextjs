import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connect } from "@/lib/db";
import ChallengeModel from "@/lib/models/challenge";
import { Challenge, ChallengeUpdate } from "@/lib/models/challenge";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, Clock, TrendingUp, Award, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const challenge = await getChallenge(id);
  
  if (!challenge) {
    return {
      title: "Challenge Not Found | Arshad Noor",
      description: "The challenge you're looking for doesn't exist or has been removed.",
    };
  }
  
  return {
    title: `${challenge.title} | Challenges | Arshad Noor`,
    description: challenge.description,
  };
}

async function getChallenge(id: string): Promise<Challenge | null> {
  await connect();
  try {
    console.log(`Attempting to fetch challenge with ID: ${id}`);

    // Ensure the ID is a valid MongoDB ObjectID
    let challenge;
    try {
      challenge = await ChallengeModel.findById(id).lean();
    } catch (idError) {
      console.error("MongoDB ID validation error:", idError);
      // Try alternate fetch method if ID format is an issue
      challenge = await ChallengeModel.findOne({ _id: id }).lean();
    }
    
    if (!challenge) {
      console.log("Challenge not found in database");
      return null;
    }
    
    console.log("Challenge found:", challenge.title);
    return JSON.parse(JSON.stringify(challenge)) as Challenge;
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return null;
  }
}

export async function generateStaticParams() {
  await connect();
  try {
    const challenges = await ChallengeModel.find({}).lean();
    return challenges.map((challenge: any) => ({
      id: challenge._id.toString()
    }));
  } catch (error) {
    console.error("Error generating static params for challenges:", error);
    return [];
  }
}

export default async function ChallengePage({ params }: PageProps) {
  const { id } = await params;
  const challenge = await getChallenge(id);
  
  if (!challenge) {
    notFound();
  }
  
  const progressPercentage = (challenge.currentDay / challenge.totalDays) * 100;
  const sortedUpdates = [...(challenge.updates || [])].sort((a, b) => b.day - a.day);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="hover:bg-transparent p-0 mb-4">
          <Link href="/journey/challenges" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Challenges</span>
          </Link>
        </Button>

        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative h-[30vh] md:h-[50vh] w-full">
            <Image
              src={challenge.image || "/placeholder.svg"}
              alt={challenge.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 flex flex-col justify-end p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {challenge.title}
              </h1>
              <p className="text-white/80 max-w-2xl mb-4">
                {challenge.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 py-1.5">
                  <Calendar className="h-4 w-4 mr-2" /> 
                  Started: {new Date(challenge.startDate).toLocaleDateString()}
                </Badge>
                
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 py-1.5">
                  <Clock className="h-4 w-4 mr-2" /> 
                  Day {challenge.currentDay} of {challenge.totalDays}
                </Badge>
                
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 py-1.5">
                  {Math.round(progressPercentage)}% Complete
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Progress</h2>
            <div className="text-sm font-medium">
              Day {challenge.currentDay} of {challenge.totalDays}
            </div>
          </div>
          
          <div className="w-full h-2.5 bg-muted rounded-full mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => {
              const segment = (i + 1) * 10;
              return (
                <div 
                  key={i} 
                  className="text-xs text-center text-muted-foreground"
                >
                  {segment}%
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Challenge Updates</h2>
          
          {sortedUpdates.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-border">
              <Image
                src="/empty-illustration.svg"
                alt="No updates"
                width={120}
                height={120}
                className="mx-auto mb-4 opacity-70"
              />
              <h3 className="text-lg font-medium mb-1">No updates yet</h3>
              <p className="text-muted-foreground mb-4">
                Check back soon for updates on this challenge!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedUpdates.map((update) => (
                <Card key={update.day} className="p-6 border border-border bg-card">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {update.imageUrl && (
                      <div className="md:w-1/3 h-[200px] md:h-[240px] relative rounded-lg overflow-hidden">
                        <Image
                          src={update.imageUrl}
                          alt={`Day ${update.day}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className={update.imageUrl ? "md:w-2/3" : "w-full"}>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 py-1.5">
                          <Award className="h-4 w-4 mr-2" /> 
                          Day {update.day}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          {new Date(update.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                        {update.topic}
                      </h3>
                      
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p>{update.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
