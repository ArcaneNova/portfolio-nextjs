import { Challenge, ChallengeUpdate } from "@/lib/models/challenge";
import { connect } from "@/lib/db";
import ChallengeModel from "@/lib/models/challenge";
import { ChallengeUpdatesClient } from "@/components/admin/challenge-updates-client";

interface UpdatesPageProps {
  params: {
    id: string;
  };
}

async function getChallengeWithUpdates(id: string) {
  await connect();
  try {
    const challenge = await ChallengeModel.findById(id).lean();
    if (!challenge) {
      return { challenge: null, updates: [] };
    }
    
    return {
      challenge: JSON.parse(JSON.stringify(challenge)) as Challenge,
      updates: challenge.updates || []
    };
  } catch (error) {
    console.error("Error fetching challenge:", error);
    return { challenge: null, updates: [] };
  }
}

export default async function ChallengeUpdatesPage({ params }: UpdatesPageProps) {
  const { challenge, updates } = await getChallengeWithUpdates(params.id);
  
  // Pass data to client component
  return <ChallengeUpdatesClient 
    challengeId={params.id}
    initialChallenge={challenge}
    initialUpdates={updates}
  />;
} 