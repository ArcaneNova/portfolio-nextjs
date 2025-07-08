import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { connect } from "@/lib/db";
import ChallengeModel from "@/lib/models/challenge";
import { Challenge } from "@/lib/models/challenge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, Clock, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "My Challenges | Arshad Noor",
  description: "Explore my learning and coding challenges, projects, and journey.",
};

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
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button asChild variant="ghost" size="sm" className="hover:bg-transparent p-0">
              <Link href="/journey" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Journey</span>
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">My Challenges</h1>
          <p className="text-muted-foreground max-w-2xl">
            Tracking my progress through various coding challenges and learning journeys
          </p>
        </div>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-lg border border-border">
          <Image
            src="/empty-illustration.svg"
            alt="No challenges"
            width={180}
            height={180}
            className="mx-auto mb-6 opacity-70"
          />
          <h3 className="text-xl font-medium mb-2">No challenges yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Check back soon for updates on my learning journey!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const progressPercentage = (challenge.currentDay / challenge.totalDays) * 100;
            
            return (
              <Link 
                key={challenge._id} 
                href={`/journey/challenges/${challenge._id ? challenge._id.toString() : ''}/`}
                className="group block bg-card rounded-xl overflow-hidden border border-border shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={challenge.image || "/placeholder.svg"}
                    alt={challenge.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-foreground transition-colors">
                      {challenge.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Started: {new Date(challenge.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 mr-1" />
                      Day {challenge.currentDay} of {challenge.totalDays}
                    </div>
                  </div>
                  
                  <div className="w-full h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                    {challenge.description}
                  </p>
                  
                  {challenge.latestUpdate && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="font-medium text-sm text-foreground mb-1">Latest Update: Day {challenge.latestUpdate.day}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {challenge.latestUpdate.topic}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
