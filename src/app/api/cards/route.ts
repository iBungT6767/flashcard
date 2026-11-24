import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const {data,error} = await supabase
    .from("cards")
    .select("id,english,thai,difficulty,example")
    .order("id");

    if(error){
        return NextResponse.json({error: error.message},{status:500});
    }
    const cards = data.map((row) => ({
        ...row,
        example:row.example ?? undefined,
    }));
    return NextResponse.json(cards);
}
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null ||Array.isArray(body)) {
      return NextResponse.json(
        { error: "รูปแบบข้อมูลไม่ถูกต้อง" },
        { status: 400 }
      );
    }
    const {english,thai,difficulty,example,} = body as Record<string, unknown>;
    if (typeof english !== "string" || english.trim() === "") {
      return NextResponse.json(
        { error: "english is required" },
        { status: 400 }
      );
    }
    if (typeof thai !== "string" || thai.trim() === "") {
      return NextResponse.json(
        { error: "thai is required" },
        { status: 400 }
      );
    }
    if (typeof difficulty !== "number" || !Number.isInteger(difficulty) ||difficulty < 1 ||difficulty > 5) {
      return NextResponse.json(
        { error: "difficulty must be between 1 and 5" },
        { status: 400 }
      );
    }
    if (example !== undefined &&example !== null &&typeof example !== "string") {
      return NextResponse.json(
        { error: "example must be a string or null" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("cards")
      .insert({english: english.trim(),thai: thai.trim(),difficulty,example:
          typeof example === "string"
            ? example.trim() || null
            : null,
      })
      .select("id,english,thai,difficulty,example")
      .single();
    if (error) {return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "รูปแบบ JSON ไม่ถูกต้อง" },
      { status: 400 }
    );
  }
}