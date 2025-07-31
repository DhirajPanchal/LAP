"use client";

// import { insertRecordV2 } from "@/axios/external-interface";
import { DatePicker } from "@/components/custom/date-picker-with-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { store } from "@/lib/store";
// import { AD_GROUP_MAP } from "@/types/mdl-ad-group-mapping";
// import {
//   GRP_DEFAULT_REASON_DESC_LIST,
//   GRP_RESOLUTION_STATUS_DESC_LIST,
// } from "@/types/mdl-constants";
// import { GradeChangeRecord } from "@/types/mdl-grade";
// import { showError, showSuccess } from "@/util/toast-util";
// import { isEqual } from "lodash";
import { Loader2, SquarePenIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { DateInputPickerV1 } from "../custom/date-picker-with-input-new";
import { Input } from "../ui/input";
import { isEqual } from "date-fns";
// import SingleSubmission from "./SingleSubmission";

export interface PartialGradeChangeRecord {
  id?: number | null;
  region: string;
  site: string;
  customer_id: string;
  default_date: string;
  resolution_date: string;
  grp_default_reason_desc: string;
  grp_resolution_status_desc: string;
  ad_region?: string;
}

const initialState: PartialGradeChangeRecord = {
  region: "",
  site: "",
  customer_id: "",
  default_date: "",
  resolution_date: "",
  grp_default_reason_desc: "",
  grp_resolution_status_desc: "",
};

export interface FieldManifest {
  fieldLabel: string;
  fieldKey: string;
  fieldType?: string;
  fieldInputType?: string;
  dataProvide?: string[];
}

const composeFormManifest = (
  regions: string[],
  sites: string[]
): FieldManifest[] => [
  {
    fieldLabel: "Region",
    fieldKey: "region",
    fieldType: "string",
    fieldInputType: "enum",
    dataProvide: regions || [],
  },
  {
    fieldLabel: "Site",
    fieldKey: "site",
    fieldType: "string",
    fieldInputType: "enum",
    dataProvide: sites || [],
  },
  {
    fieldLabel: "Customer Id",
    fieldKey: "customer_id",
    fieldType: "string",
    fieldInputType: "text",
  },
  {
    fieldLabel: "Default Date",
    fieldKey: "default_date",
    fieldType: "string",
    fieldInputType: "date",
  },
  {
    fieldLabel: "Resolution Date",
    fieldKey: "resolution_date",
    fieldType: "string",
    fieldInputType: "date",
  },
  {
    fieldLabel: "Grp default reason desc",
    fieldKey: "grp_default_reason_desc",
    fieldType: "string",
    fieldInputType: "enum",
    dataProvide: ["Reason1", "Reason2"],
  },
  {
    fieldLabel: "Grp resolution status desc",
    fieldKey: "grp_resolution_status_desc",
    fieldType: "string",
    fieldInputType: "enum",
    dataProvide: ["Reason1", "Reason2"],
  },
];

type RecordInsertDefaultProps = {
  openDialog?: any;
  setOpenDialog?: any;
  refreshTriggered?: any;
};

export default function RecordInsertDefault({
  openDialog,
  setOpenDialog,
  refreshTriggered,
}: RecordInsertDefaultProps) {
  const [currentRecord, setCurrentRecord] =
    useState<PartialGradeChangeRecord>(initialState);
  const [formManifest, setFormManifest] = useState<FieldManifest[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setCurrentRecord(initialState);
    setErrors({});
    setLoading(false);
  };

  useEffect(() => {
    if (openDialog) {
      resetState();
      composeForm();
    }
  }, [openDialog]);

  const composeForm = () => {
    const manifest = composeFormManifest(
      ["Region1", "Region2"],
      ["Site", "Site"]
    );
    setFormManifest(manifest);
  };

  const handleChange = (field: string, value: string) => {
    setCurrentRecord((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const { default_date, resolution_date } = currentRecord;
    const defaultDate = default_date ? new Date(default_date) : null;
    const resolutionDate = resolution_date ? new Date(resolution_date) : null;
    const now = new Date();

    if (defaultDate && defaultDate > now) {
      newErrors["default_date"] = "Default Date cannot be in the future";
    } else if (resolutionDate && defaultDate && defaultDate > resolutionDate) {
      newErrors["default_date"] =
        "Default Date cannot be after Resolution Date";
    }

    if (
      !currentRecord.region ||
      !currentRecord.site ||
      !currentRecord.customer_id.trim() ||
      !currentRecord.grp_default_reason_desc ||
      !currentRecord.grp_resolution_status_desc
    ) {
      newErrors["other"] = "Missing value(s)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate() && currentRecord && !currentRecord.id) {
      const payload = currentRecord;
    }
  };

  const isDirty: boolean = true;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="h-5/6 w-[80vw] max-w-none rounded-xl border"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#2B2D42] dark:text-white">
            Add Default-2
          </DialogTitle>
        </DialogHeader>

        <div className="relative overflow-x-auto px-6 space-y-8">
          <Table
            className="text-gray-800 bg-white border border-indigo-200 rounded-xl overflow-hidden 
  shadow-[5px_5px_rgba(75,_85,_99,_0.4),_10px_10px_rgba(75,_85,_99,_0.3),_15px_15px_rgba(75,_85,_99,_0.2),_20px_20px_rgba(75,_85,_99,_0.1),_25px_25px_rgba(75,_85,_99,_0.05)]"
          >
            <TableHeader className="uppercase bg-indigo-100 text-indigo-900 rounded-t-md border-b border-indigo-200">
              <TableRow>
                <TableHead className="w-1/3 px-4 py-3">Field</TableHead>
                <TableHead className="w-2/3 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <span>Current Value</span>
                    <SquarePenIcon className="h-6 w-6 text-indigo-100" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formManifest.map((field, index) => {
                const fieldKey = field.fieldKey;
                const value =
                  currentRecord[fieldKey as keyof typeof currentRecord] || "";
                const type = field.fieldInputType;
                return (
                  <TableRow key={index} className="bg-white">
                    <TableCell className="px-4 py-2 text-sm text-[#2B2D42] font-medium bg-[#EDF2F4]">
                      {field.fieldLabel}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right text-[#2B2D42] font-semibold bg-white">
                      {type === "text" && (
                        <Input
                          value={String(value ?? "")}
                          onChange={(e) =>
                            handleChange(fieldKey, e.target.value)
                          }
                          className="w-full bg-white border border-[#8D99AE] text-sm px-3 py-2 rounded-md shadow-sm"
                        />
                      )}
                      {type === "date" && (
                        <div className="max-w-[250px]">
                          <DateInputPickerV1
                            value={String(value ?? "")}
                            onChange={(val) => handleChange(fieldKey, val)}
                          />
                        </div>
                      )}
                      {type === "enum" && (
                        <Select
                          value={String(value ?? "")}
                          onValueChange={(val) =>
                            handleChange(
                              fieldKey,
                              val === "__none__" ? "" : val
                            )
                          }
                        >
                          <SelectTrigger className="w-full border border-[#8D99AE] text-sm rounded-md bg-white px-3 py-2 shadow-sm">
                            <SelectValue placeholder="- Select -" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.dataProvide?.map((opt, i) => (
                              <SelectItem key={i} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter className="bg-indigo-100 text-indigo-900 rounded-b-md border-t border-indigo-200">
              <TableRow className="max-w-[20px]">
                <TableCell colSpan={3}>
                  <div className="flex justify-between items-center">
                    <div className="text-sm space-y-1">
                      {Object.entries(errors).map(([field, msg]) => (
                        <div
                          key={field}
                          className="text-red-600 bg-red-100 border border-red-300 rounded px-3 py-1 my-1"
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                    <div className="space-x-4">
                      <Button
                        disabled={!isDirty}
                        onClick={resetState}
                        className="bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md px-4 py-2"
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={!isDirty && !loading}
                        className="bg-[#8D99AE] hover:bg-[#6c758d] text-white rounded-md px-5 py-2 tracking-wide"
                      >
                        {loading && (
                          <Loader2
                            color="gray"
                            className="animate-spin h-6 w-6"
                          />
                        )}
                        Insert
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <hr className="h-px mx-6 my-4 border-0 bg-[#8D99AE]/30" />

        <DialogFooter className="mx-6 px-2">
          <div>
            <h1>Placeholder of SingleSubmission</h1>
          </div>
          {/* <SingleSubmission
            submitAction="submitForApproval"
            recordId={currentRecord.id ?? 0}
            submitTriggered={refreshTriggered}
            row={currentRecord as GradeChangeRecord}
          /> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
