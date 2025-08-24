import DashboardCards4 from "@/components/db/db4";
import DashboardCards5 from "@/components/db/db5";
import BrandMDL from "@/lab/component/datagridv01/BrandMDL";
import { DataTable } from "@/lab/component/datagridv01/datagrid";
import { dg_columns } from "@/lab/component/datagridv01/dg-columns";
import { db_payments } from "@/lab/component/datagridv01/dg-data";
import BarLoader from "@/lab/controls/loaders/BarLoader";

const isLoading: boolean = true;

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-2 border border-yellow-400 h-full w-full ">
      <BrandMDL x="#415D8A" size="xs" />
      <BrandMDL x="#415D8A" size="sm" />
      <BrandMDL x="#415D8A" size="md" />
      <BrandMDL x="#415D8A" size="lg" />
      <DashboardCards4 />
      <div>
        <BarLoader loading={true} color="#68bdf2" className="border-none" />
        <DataTable columns={dg_columns} data={db_payments} />
      </div>
      {/* <DashboardCards5 /> */}
    </div>
  );
}
