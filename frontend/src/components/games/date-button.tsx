import useForkRef from '@mui/utils/useForkRef';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps, DatePickerFieldProps } from '@mui/x-date-pickers/DatePicker';
import { useValidation, validateDate } from '@mui/x-date-pickers/validation';
import { useSplitFieldProps, useParsedFormat, usePickerContext } from '@mui/x-date-pickers/hooks';

function ButtonDateField(props: DatePickerFieldProps) {
    const { internalProps, forwardedProps } = useSplitFieldProps(props, 'date');

    const pickerContext = usePickerContext();
    const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
    const parsedFormat = useParsedFormat();
    const { hasValidationError } = useValidation({
        validator: validateDate,
        value: pickerContext.value,
        timezone: pickerContext.timezone,
        props: internalProps,
});

const valueStr =
    pickerContext.value == null
    ? parsedFormat
    : pickerContext.value.format(pickerContext.fieldFormat);

    return (
        <Button
        {...forwardedProps}
        variant="outlined"
        color={hasValidationError ? 'error' : 'primary'}
        ref={handleRef}
        className={pickerContext.rootClassName}
        sx={pickerContext.rootSx}
        onClick={() => pickerContext.setOpen((prev) => !prev)}
        >
        {pickerContext.label ? `${pickerContext.label}: ${valueStr}` : valueStr}
        </Button>
    );
}

function ButtonFieldDatePicker(props: DatePickerProps) {
    return (
        <DatePicker {...props} slots={{ ...props.slots, field: ButtonDateField }} />
    );
}

export default function CalendarInput() {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ButtonFieldDatePicker
                format='DD/MM/YYYY'
                sx={{
                    border: "2px solid #004f8d",
                    borderRadius: "7px",
                    color: "black",
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: "15px",
                }}/>
        </LocalizationProvider>
    );
}