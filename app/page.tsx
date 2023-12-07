import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Hello world!</div>
      <Link href="/my-list">View My List</Link>
      
    </main>
  )
}
