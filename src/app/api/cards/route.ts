import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

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
    const supabaseServer = await createSupabaseServerClient();
    const{
      data:{user},
      error:authError,
    }=await supabaseServer.auth.getUser();
    if(authError || !user){
      return NextResponse.json(
        {error:"กรุณาเข้าสู่ระบบก่อนเพิ่มคำศัพท์"},
        {status:400}
      );
    }
    const adminUserId = process.env.SUPABASE_ADMIN_USER_ID;
    if(!adminUserId || user.id !== adminUserId){
      return NextResponse.json(
        {error:"บัญชีนี้ไม่มีสิทธิ์เพิ่มคำศัพท์"},
        {status: 403}
      );
    }
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
        { error: "กรุณากรอกคำศัพท์ภาษาอังกฤษ" },
        { status: 400 }
      );
    }
    const cleanEnglish = english.trim();
    if(cleanEnglish.length > 100 || !/^[A-Za-z\s'-]+$/.test(cleanEnglish)){
      return NextResponse.json({
        error:"English ต้องมีเฉพาะตัวอักษรภาษาอังกฤษ เว้นวรรค ขีดกลาง หรือ apostrophe และยาวไม่เกิน 100 ตัวอักษร",
      },{status:400});
    }
    if (typeof thai !== "string" || thai.trim() === "") {
      return NextResponse.json(
        { error: "กรุณากรอกความหมายภาษาไทย" },
        { status: 400 }
      );
    }
    const { data: dup } = await supabase
    .from("cards")
    .select("id")
    .ilike("english", cleanEnglish)
    .limit(1);
    if (dup && dup.length > 0) {
      return NextResponse.json({ error: "มีคำนี้อยู่แล้ว" }, { status: 409 });
    }
    const cleanThai = thai.trim();
    if(cleanThai.length > 100 || !/[\u0E01-\u0E2E]/.test(cleanThai)){
      return NextResponse.json({
        error: "Thai ต้องมีตัวอักษรภาษาไทย และยาวไม่เกิน 100 ตัวอักษร",
      },{status:400});
    }
    if (typeof difficulty !== "number" || !Number.isInteger(difficulty) ||difficulty < 1 ||difficulty > 5) {
      return NextResponse.json(
        { error: "difficulty ต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 5" },
        { status: 400 }
      );
    }
    if (example !== undefined &&example !== null &&typeof example !== "string") {
      return NextResponse.json(
        { error: "example ต้องเป็นข้อความหรือ null" },
        { status: 400 }
      );
    }
    const cleanExample = typeof example === "string"?example.trim():"";
    if(cleanExample.length>300|| (cleanExample !== "" &&  !/[A-Za-z\u0E00-\u0E7F]/.test(cleanExample)) ||
    (cleanExample !== "" &&
        !/^[A-Za-z\u0E00-\u0E7F0-9\s.,!?'"()\-]+$/.test(
          cleanExample
        ))
  ){
    return NextResponse.json({
      error:"Example ต้องเป็นข้อความที่มีตัวอักษร และมีความยาวไม่เกิน 300 ตัวอักษร",
    },{ status: 400 });
  }
    const { data, error } = await supabaseServer
      .from("cards")
      .insert({english: cleanEnglish,thai: cleanThai,difficulty,example:cleanExample || null,
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