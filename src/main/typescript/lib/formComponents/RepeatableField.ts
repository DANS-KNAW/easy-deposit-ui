import { FieldArray, GenericFieldArray, WrappedFieldArrayProps } from "redux-form"

export interface CustomFieldArrayProps<FieldValue> {
    label: string,
    empty: FieldValue,
    fieldName: (name: string) => string
}

export type FieldArrayProps<FieldValue> = WrappedFieldArrayProps<FieldValue> & CustomFieldArrayProps<FieldValue>

export const RepeatableField = FieldArray as new <Data>() => GenericFieldArray<Data, CustomFieldArrayProps<Data>>
