
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gray-100">
     <p className="text-brand text-xl p-4"><Link href={"/login"}>Tela de Login</Link></p>
    </div>
  );
}
