import Link from "next/link";

export default function NotFound() {
    return(
        <main className="mx-auto max-w-md p-4 text-center">
            <h1 className="mt-16 text-2xl font-bold">ไม่พบหน้านี้</h1>
            <Link href="/home" className="mt-6 inline-block rounded-lg border px-4 py-2">กลับหน้าแรก</Link>
        </main>
    );
}