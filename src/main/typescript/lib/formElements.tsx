import * as React from "react"
import { FieldArray, GenericFieldArray, WrappedFieldArrayProps, WrappedFieldInputProps } from "redux-form"
import { WrappedFieldProps } from "redux-form/lib/Field"
import DatePicker from "react-datepicker"
import * as moment from "moment"
import { Moment } from "moment"
import { FieldIterate } from "redux-form/lib/FieldArray"

type FieldProps = WrappedFieldProps & { required?: boolean }
type renderer = (input: WrappedFieldInputProps, label?: string, rest?: any) => JSX.Element

function createRenderer<T>(renderer: renderer) {
    return (props: FieldProps & T) => {
        const {input, meta, label, required} = props
        const changed = (meta as any).changed
        const hasError = meta.error && (changed || meta.submitFailed)
        const requiredText = required ? <b style={{color: 'red'}}> *</b> : ""

        return <div className={[
            hasError ? 'error' : '',
            meta.active ? 'active' : '',
            'input-element',
        ].join(' ')}>
            <label>{label}{requiredText}</label>
            {renderer(input, label, props)}
            {hasError && <span>{meta.error}</span>}
        </div>
    }
}

interface InputProps {
    type?: string
}

export const RenderInput = createRenderer<InputProps>((input, label, {type}: InputProps) => <input {...input} type={type || "text"} placeholder={label}/>)

export const RenderSelect = createRenderer((input, label, {children}) => <select {...input}>{children}</select>)

interface RadioChoice {
    title: string,
    value: string
}

interface RadioProps {
    choices: RadioChoice[]
}

export const RenderRadio = createRenderer<RadioProps>((input, label, {choices}: RadioProps) =>
    <div id="radio-choices">
        {choices.map(({title, value}) =>
            <label key={title} id="radio-choice">
                <input {...input}
                       type="radio"
                       value={title}
                />
                {` ${value}`}
            </label>,
        )}
    </div>,
)

interface CheckboxProps {
    text: string
}

export const RenderCheckbox = createRenderer<CheckboxProps>((input, label, {text}: CheckboxProps) =>
    <label id="radio-choices"><input {...input} type="checkbox"/>{` ${text}`}</label>,
)

interface DatePickerProps {
    dateFormat: string
    minDate?: Moment
    maxDate?: Moment
}

// Note to future me:
// This date picker has very specific settings. Can't we use the original props from DatePicker?
// Or should we add more properties to our own DatePickerProps?
export const RenderDatePicker = createRenderer<DatePickerProps>((input, label, {minDate, maxDate, dateFormat}) =>
    <div id="radio-choices">
        <DatePicker {...input}
                    dateFormat={dateFormat}
                    minDate={minDate}
                    maxDate={maxDate}

                    todayButton="Today"
                    disabledKeyboardNavigation
                    isClearable

                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}

                    placeholderText={label}
                    selected={input.value ? moment(input.value, dateFormat) : null}
                    onChange={date => input.onChange(date ? moment(date).format(dateFormat) : "")}>
            <div style={{color: 'red'}}>This date must be in the future!</div>
        </DatePicker>
    </div>,
)

export const RenderComposed = createRenderer((input, label, {children}) => <div id="radio-choices">{children}</div>)

// repeatable elements
type FieldArrayProps<FieldValue> = WrappedFieldArrayProps<FieldValue>
    & { label: string, empty: FieldValue }

export const RepeatableField = FieldArray as new <Data>() => GenericFieldArray<Data, { label: string, empty: Data }>;

export function createRepeatedRender<Data>(renderer: FieldIterate<Data, JSX.Element>) {
    return (props: FieldArrayProps<Data>) => {
        const {fields, meta: {error, submitFailed}, label, empty} = props
        const hasError = error && submitFailed

        return <div className={hasError ? 'error' : ''}>
            <button type="button" onClick={() => fields.push(empty)}>{label}</button>
            {hasError && <span>{error}</span>}
            {fields.map(renderer)}
        </div>
    }
}
