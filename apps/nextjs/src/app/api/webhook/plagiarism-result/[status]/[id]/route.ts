import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

//import { Resend } from "resend";

import { db, eq, schema } from "@voiceai/db";

import { sendMessage } from "~/app/actions/messageAction";

//const resend = new Resend(process.env.RESEND_API_KEY);

export interface PlagiarismResult {
  scannedDocument: {
    totalWords: number;
    credits: number;
  };
  results: {
    score: {
      identicalWords: number;
      minorChangedWords: number;
      relatedMeaningWords: number;
      aggregatedScore: number;
    };
    internet: InternetPayload[];
  };
  developerPayload: string;
}

interface InternetPayload {
  id: string;
  identicalWords: number;
  introduction: string;
  matchedWords: number;
  paraphrasedWords: number;
  similarWords: number;
  title: string;
  totalWords: number;
  url: string;
}
export interface PlagiarismPayload {
  id: string;
  userId: string;
  title: string;
  content: string;
  total_words: number;
  identical_words: number;
  minor_changed_words: number;
  related_meaning_words: number;
  aggregated_score: number;
  internet: InternetPayload[] | [];
  credits_used: number;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { status: string; id: string } },
) {
  const { status, id } = params;
console.log("Webhook status:", status, "ID:", id);
  if (status !== "completed") {
    return NextResponse.json({ error: "Weebhook Eror" }, { status: 500 });
  }

  try {
    const body = (await request.json()) as PlagiarismResult;
    const {
      scannedDocument: { totalWords, credits },
      results: {
        score: {
          identicalWords,
          minorChangedWords,
          relatedMeaningWords,
          aggregatedScore,
        },
        internet,
      },
      developerPayload,
    } = body;

    const payload: PlagiarismPayload = {
      id,
      userId: developerPayload,
      title: "New Scan",
      content: "",
      total_words: totalWords,
      identical_words: identicalWords,
      minor_changed_words: minorChangedWords,
      related_meaning_words: relatedMeaningWords,
      aggregated_score: aggregatedScore,
      internet,
      credits_used: credits,
    };

    await db.insert(schema.plagiarism).values(payload).execute();

    const fetchedCredits = await db.query.clCredits.findFirst({
      where: (clCredits, { eq }) => eq(clCredits.userId, developerPayload),
    });

    if (
      fetchedCredits?.credits &&
      fetchedCredits.credits >= payload.credits_used
    ) {
      await db
        .update(schema.clCredits)
        .set({ credits: fetchedCredits.credits - payload.credits_used })
        .where(eq(schema.clCredits.userId, developerPayload));
    }

    await sendMessage(payload.id);

    // await resend.emails.send({
    //   from: "login@script-timer.ai",
    //   to: "agustinsant@hotmail.com",
    //   subject: "Reset Password",
    //   text: JSON.stringify(body),
    // });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("Error processing completion:", error);
    return NextResponse.json(
      { error: error as string },
      { status: 500, statusText: error as string },
    );
  }
}
