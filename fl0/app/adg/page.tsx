import { DataGridv01 } from "@/lab/component/datagridv01/datagrid";
import BankLoader from "@/lab/controls/loaders/BankLoader";
import Image from "next/image";
export default function Page() {
  return (

    <div className=" flex flex-col items-center gap-4">
      <Image
        className="dark:invert"
        src="/adg-logo-01-01.png"
        alt="Next.js logo"
        width={180}
        height={50}
        priority
      />
      <BankLoader loading={false} size={12} color="#EE3524" />
      {/* <BankLoader loading={true} size={12} color="#EE3524" /> */}
    <DataGridv01></DataGridv01>
    </div>
  );
}
