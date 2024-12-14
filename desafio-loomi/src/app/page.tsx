
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100">
     <p><Link href={"/login"}>Tela de Login</Link></p>
    </div>
  );
}
