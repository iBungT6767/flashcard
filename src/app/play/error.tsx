"use client";

type ErrorProps ={
    error:Error;
    reset:() => void;
};

export default function ErrorPage ({reset}:ErrorProps){
    return (
        <main className="mx-auto max-w-md p-4 text-center">
            <h1 className="mt-16 text-2xl font-bold">เกิดข้อผิดพลาด</h1>
            <button type="button" onClick={reset} className="mt-6 rounded-lg border bg-white px-4 py-2">
                ลองอีกครั้ง
            </button>
        </main>
    );
}
