import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ChallengeNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <Image
        src="/error-illustration.svg"
        alt="Challenge not found"
        width={250}
        height={250}
        className="mb-6 opacity-80"
      />
      
      <h1 className="text-3xl font-bold mb-2 text-center">Challenge Not Found</h1>
      <p className="text-muted-foreground max-w-md text-center mb-8">
        The challenge you're looking for doesn't exist or may have been removed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default">
          <Link href="/journey/challenges">
            View All Challenges
          </Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
