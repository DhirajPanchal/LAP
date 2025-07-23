export interface Grade {
  id: number;
  old_default_reason?: string;
  new_default_reason?: string; // editable, one of the Reason
  old_resolution_reason?: string;
  new_resolution_reason?: string; // editable, one of the Reason
  old_default_date?: string;
  new_default_date?: string; // editable, datetime
  old_resolution_date?: string;
  new_resolution_date?: string; // editable, datetime
}

// Validation rules
// new_default_date cannot be in future
// new_default_date cannot be greater than new_resolution_date
// new_default_date cannot be more than one year old

export interface FieldCompare {
  fieldLabel: string;
  originalValueField: string;
  updateValueField: string;
  fieldType?: string; // string or DateTime Or Reason (Reason1, Reason2, Reason3)
}

export const GRADE_DUMMY: Grade[] = [
  {
    id: 0,
    old_default_reason: "Dhiraj",
    old_resolution_reason: "Mumbai",
    old_default_date: "1982-11-20",
    old_resolution_date: "2004-09-06",
    new_default_reason: "Reason ONE",
    new_default_date: "2025-07-01",
  },
];

export const FIELD_MENIFEST: FieldCompare[] = [
  {
    fieldLabel: "Default Reason",
    originalValueField: "old_default_reason",
    updateValueField: "new_default_reason",
    fieldType: "string",
  },
  {
    fieldLabel: "Resolution Reason",
    originalValueField: "old_resolution_reason",
    updateValueField: "new_resolution_reason",
    fieldType: "string",
  },
  {
    fieldLabel: "Default Date",
    originalValueField: "old_default_date",
    updateValueField: "new_default_date",
    fieldType: "string",
  },
  {
    fieldLabel: "Resolution Date",
    originalValueField: "old_resolution_date",
    updateValueField: "new_resolution_date",
    fieldType: "string",
  },
];

export const REASONS: string[] = [
  "Reason ONE",
  "Reason TWO",
  "Reason THERE",
  "Reason FOUR",
  "Reason FIVE",
];

export const VALIDATION_RULES: Record<
  string,
  {
    required?: boolean;
    pattern?: string;
  }
> = {
  defaultDate: {
    required: true,
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
  },
  resolutionDate: {
    required: true,
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
  },
};
