// components/ProForm/ProForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Box, Grid } from '@mui/material';
import { fieldMap } from './fieldMap';

export interface ProFormSchemaItem {
    label: string;
    type: keyof typeof fieldMap;
    required?: boolean;
    props?: Record<string, any>;
}

export type ProFormSchema = Record<string, ProFormSchemaItem>;

interface ProFormProps {
    schema: ProFormSchema;
    onSubmit: (data: any) => void;
    defaultValues?: Record<string, any>;
    submitText?: string;
    columns?: number;
}

export const ProForm: React.FC<ProFormProps> = ({
    schema,
    onSubmit,
    defaultValues = {},
    submitText = '提交',
    columns = 2,
}) => {
    const { handleSubmit, control } = useForm({ defaultValues });

    const renderField = (name: string, config: ProFormSchemaItem) => {
        const FieldComponent = fieldMap[config.type];
        if (!FieldComponent) return null;

        return (
            <Controller
                key={name}
                name={name}
                control={control}
                rules={config.required ? { required: `${config.label} 是必填项` } : {}}
                render={({ field, fieldState }) => (
                    <FieldComponent
                        {...field}
                        {...config.props}
                        label={config.label}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {Object.entries(schema).map(([name, config]) => (
                    <Grid size={{ xs: 12 / columns }} key={name}>
                        {renderField(name, config)}
                    </Grid>
                ))}
                <Grid size={12} >
                    <Box textAlign="right">
                        <Button type="submit" variant="contained">
                            {submitText}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};