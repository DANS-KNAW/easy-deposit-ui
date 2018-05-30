import * as React from "react"
import RadioChoices, { RadioProps } from "./RadioChoices"
import FormEntry from "./FormEntry"

interface RadioChoicesEntryProps {
    withoutLabel?: boolean
}

const RadioChoicesEntry = (props: RadioProps & RadioChoicesEntryProps) => (
    <FormEntry htmlFor={props.input.name} label={props.label} withoutLabel={props.withoutLabel}>
        <RadioChoices {...props}/>
    </FormEntry>
)

export default RadioChoicesEntry
