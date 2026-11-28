import { supabaseBrowser } from "./supabase-browser";
import type { AnswerRecord } from "@/types";

export async function saveRecord(record: AnswerRecord): Promise<boolean> {
    const {
        data: { user },
        error: userError,
    } = await supabaseBrowser.auth.getUser();

    if (userError || !user) {
        console.error("ไม่พบผู้ใช้ที่ล็อกอิน:", userError);
        return false;
    }
    const { error } = await supabaseBrowser
        .from("answer_records")
        .insert({
            user_id: user.id,
            card_id: record.cardId,
            is_correct: record.isCorrect,
            rating: record.rating,
        });
    if (error) {
        console.error("saveRecord failed:", error);
        return false;
    }
    return true;
}
export async function loadRecords(): Promise<AnswerRecord[]> {
    const {data: { user },error: userError,} = await supabaseBrowser.auth.getUser();
    if (userError || !user) return [];
    const { data, error } = await supabaseBrowser
        .from("answer_records")
        .select("card_id,selected_choice_id,is_correct,rating")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(500);
    if (error || !data) return [];
    return data.map((row) => ({
        cardId: row.card_id,
        selectedChoiceId: row.selected_choice_id,
        isCorrect: row.is_correct,
        rating: row.rating,
    }));
}