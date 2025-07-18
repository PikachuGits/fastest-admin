import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Iconify } from "../../../iconify";
import { NumberChip, type NumberChipColor } from "../NumberChip";
import "../../styles/index.less";

export interface MenuItemProps {
  icon?: import("../../../iconify").IconifyProps["icon"];
  primary: string;
  secondary?: string;
  level?: number;
  selected?: boolean;
  hasSubItems?: boolean;
  open?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  numberBadge?: number;
  badgeColor?: NumberChipColor;
  disabled?: boolean;
}

const StyledListItemButton = styled(ListItemButton)<{
  level?: number;
  selected?: boolean;
  hasSubItems?: boolean;
}>(({ theme, level = 0, selected, hasSubItems }) => ({
  marginTop: theme.spacing(0.5),
  padding: " 4px 8px 4px 12px",
  minHeight: 44,
  // backgroundColor: "rgba(0, 0, 0, 0.04)",
  backgroundColor: selected ? "#E8F5E8" : "transparent",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: selected ? "#E8F5E8" : "#F5F5F5",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 24,
    marginRight: theme.spacing(1.5),
  },
  "& .MuiListItemText-primary": {
    color: selected ? "#2E7D32" : "#212121",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: "#757575",
  },
}));

const StyledListItemText = styled(ListItemText)({
  flex: "1 1 auto",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: 40,
  padding: "0 8px 0 0",
  margin: 0,
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: "#757575",
    lineHeight: 0
  },
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    color: "#212121",
    fontWeight: 500
  }
})

const ArrowIcon = ({
  open,
  className,
  ...props
}: {
  open: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Iconify
      icon={"eva:arrow-ios-downward-fill"}
      className={`transition-all duration-300 ease-in-out ${open ? "rotate-0" : "rotate-[-90deg]"
        } ${className}`}
      sx={{ color: "#757575" }}
      {...props}
    />
  );
};

export const MenuItem = ({
  icon,
  primary,
  secondary,
  level = 0,
  selected = false,
  hasSubItems = false,
  open = false,
  onToggle,
  onClick,
  numberBadge,
  badgeColor = "default",
  disabled = false,
}: MenuItemProps) => {
  const handleClick = () => {
    if (hasSubItems && onToggle) {
      onToggle();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <StyledListItemButton
      level={level}
      selected={selected}
      hasSubItems={hasSubItems}
      onClick={handleClick}
      disabled={disabled}
      data-level={level == 0 ? "false" : "true"}
      className="fast-menu-item-container-sub-child"
    >
      {icon && (
        <ListItemIcon >
          <Iconify
            icon={icon}
            className="w-full h-full"
            sx={{
              color: selected ? "#2E7D32" : disabled ? "#BDBDBD" : "#757575",
            }}
          />
        </ListItemIcon>
      )}
      <StyledListItemText
        primary={
          primary && (
            <span className="text-sm truncate">{primary}</span>
          )
        }
        secondary={
          secondary && (
            <span className="inline-block text-xs truncate w-full">
              {secondary}
            </span>
          )
        }
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {numberBadge && <NumberChip number={numberBadge} color={badgeColor} />}
        {hasSubItems && <ArrowIcon open={open} />}
      </Box>
    </StyledListItemButton>
  );
};
