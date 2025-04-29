import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDay = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format(`DD/MM/YYYY`);
  

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div
            className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600"
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={90}
            height={90}
            className="rounded-full object-fill size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
                <Image alt="calendat" width={22} height={22} src={"/calendar.svg"}/>
                <p>{formattedDay}</p>
            </div>
            <div className="flex flex-row gap-2 items-center ">
                <Image src={"/star.svg"} alt="star " height={20} width={20}/>
                    <p>
                        {feedback?.totalScore || '---'}/100
                    </p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment || "You haven't taken interview yet"}
          </p>
        </div>
        <div className="flex flex-row justify-between">

      <DisplayTechIcons techStack={techstack} />
    <Button className="btn-primary">
            <Link href={feedback
                ? `/interview/${interviewId}/feedback`
                : `/interview/${interviewId}`
            }>
                    {feedback ? "Check feedback " : "View Interview"}
            </Link>
    </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
