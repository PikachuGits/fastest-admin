import { Chip } from "@mui/material";

export type NumberChipColor = "default" | "primary" | "success";

export interface NumberChipProps {
  number: number;
  color?: NumberChipColor;
}

export const NumberChip = ({ number, color = "default" }: NumberChipProps) => {
  const chipColors = {
    default: { backgroundColor: "#F5F5F5", color: "#757575" },
    primary: { backgroundColor: "#E3F2FD", color: "#1976D2" },
    success: { backgroundColor: "#E8F5E8", color: "#2E7D32" },
  };

  return (
    <Chip
      label={`+${number}`}
      size="small"
      sx={{
        height: 20,
        fontSize: "11px",
        fontWeight: 500,
        ...chipColors[color],
        "& .MuiChip-label": {
          padding: "0 6px",
        },
      }}
    />
  );
};
