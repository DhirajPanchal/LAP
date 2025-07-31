import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
      <main className="flex flex-col items-center">
        PROTON V01
        <Link className="text-sm text-blue-600" href="/form">
          FORM
        </Link>
        <Link className="text-sm text-blue-600" href="/default">
          DEFAULT
        </Link>
      </main>
    </div>
  );
}
