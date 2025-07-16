// components/ProForm/fieldMap.tsx
import { TextField, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';

export const fieldMap = {
    text: TextField,
    number: (props: any) => <TextField {...props} type="number" />,
    password: (props: any) => <TextField {...props} type="password" />,
    checkbox: (props: any) => (
        <FormControlLabel control={<Checkbox checked={props.value} {...props} />} label={props.label} />
    ),
    select: (props: any) => (
        <Select {...props}>
            {(props.options || []).map((opt: any) => (
                <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                </MenuItem>
            ))}
        </Select>
    ),
};