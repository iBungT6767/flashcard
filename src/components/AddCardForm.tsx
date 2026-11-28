"use client";
import { useState } from "react";

export function AddCardForm(){
    const [english,setEnglish] = useState("");
    const [thai,setThai] = useState("");
    const [difficulty,setDifficulty] = useState("1");
    const [example,setExample] = useState("");
    const [success, setSuccess] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    async function handleSubmit(event:React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch("/api/cards",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    english:english.trim(),
                    thai:thai.trim(),
                    difficulty:Number(difficulty),
                    example:example.trim() || null,
                }),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error || "เพิ่มศัพท์ไม่สำเร็จ");
            }
            setEnglish("");
            setThai("");
            setDifficulty("1");
            setExample("");
            setSuccess(`เพิ่ม "${data.english}" เรียบร้อยแล้ว`);
        }catch (err) {
            setError(
                err instanceof Error
                ?err.message
                :"เกิดข้อผิดพลาด"
            );
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="english">English</label>
                <input
                    id="english" 
                    value={english}
                    onChange={(event) => setEnglish(event.target.value)}
                    required
                    className="w-full rounded-lg border p-3"
                    placeholder="ใส่คำภาษาอังกฤษ"
                />
            </div>
            <div>
                <label htmlFor="thai">Thai</label>
                <input
                    id="thai"
                    value={thai}
                    onChange={(event) => setThai(event.target.value)}
                    required
                    className="w-full rounded-lg border p-3"
                    placeholder="ความหมายภาษาไทย"
                />
            </div>
            <div>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(event) => setDifficulty(event.target.value)}
                    className="w-full rounded-lg border p-3"
                >
                    <option value="1">1 - ง่ายมาก</option>
                    <option value="2">2 - ง่าย</option>
                    <option value="3">3 - ปานกลาง</option>
                    <option value="4">4 - ยาก</option>
                    <option value="5">5 - ยากมาก</option>
                </select>
            </div>
            <div>
                <label htmlFor="example">Example</label>
                <textarea
                    id="example"
                    value={example}
                    onChange={(event) => setExample(event.target.value)}
                    className="w-full rounded-lg border p-3"
                    placeholder="ใส่ตัวอย่างการใช้คำ(ไม่ใส่ก็ได้)"
                />
            </div>
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
            {success && <p role="status" className="text-sm text-green-700">{success}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 p-3 text-white disabled:opacity-50"
            >
                {loading ? "กำลังบันทึก..." : "เพิ่มคำศัพท์"}
            </button>
        </form>
        
    );
    
}