import { ListSubheader, styled, type SxProps, type Theme } from "@mui/material";
import { Iconify } from "../iconify";

export interface GroupHeaderProps {
  title: string;
  onClick?: () => void;
  open: boolean;
}

const StyledGroupHeader = styled(ListSubheader)(({ theme }) => ({
  backgroundColor: "transparent",
  fontSize: "12px",
  fontWeight: 500,
  color: "#9E9E9E",
  letterSpacing: "0.5px",
  lineHeight: "16px",
  padding: "16px 16px 8px 0",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: theme.palette.text.primary,
    "& .icon-arrow": {
      opacity: 1,
      width: "16px",
    },
  },
}));

export const GroupHeader = ({ title, onClick, open }: GroupHeaderProps) => {
  return (
    <StyledGroupHeader
      onClick={() => {
        onClick?.();
      }}
      sx={{ cursor: "pointer" }}
    >
      <Iconify
        icon={"eva:arrow-ios-downward-fill"}
        className={`transition-all duration-300 ease-in-out ${
          open ? "rotate-0" : "rotate-[-90deg]"
        } icon-arrow text-xl mr-1`}
        sx={{ color: "#757575", opacity: 0, width: 0 }}
      />
      <span className="text-xs">{title}</span>
    </StyledGroupHeader>
  );
};
