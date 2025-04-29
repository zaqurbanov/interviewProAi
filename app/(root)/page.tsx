import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex  max-md:flex-col gap-5">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2>Get interview-ready with AI-Powered practice and feedback</h2>
            <p className="text-lg">
              Practice on real interview questions and get instant
            </p>

            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview"> Start an Interview</Link>
            </Button>
          </div>

          <Image
            alt="Robot image"
            src={"/robot.png"}
            height={400}
            width={400}
            className="max-"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="interviews-section">

          {dummyInterviews.map((interview)=>{
            return (
              
              <InterviewCard {...interview} key={interview?.id}/>
              
            )
          })}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>

        <div className="interviews-section">
          {" "}
          {dummyInterviews.map((interview)=>{
            return (
              
              <InterviewCard {...interview} key={interview?.id}/>
              
            )
          })}
          
        </div>
      </section>
    </>
  );
}
