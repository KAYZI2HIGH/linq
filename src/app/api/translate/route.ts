import { translateText } from "@/lib/translate";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();
  const translated = await translateText(text, targetLang);
  return NextResponse.json({ translated });
}
