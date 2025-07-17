import { ListSubheader, type SxProps, type Theme } from "@mui/material";
import { Iconify } from "../iconify";
import { useState } from "react";

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
      className={`transition-all duration-300 ease-in-out ${
        open ? "rotate-0" : "rotate-[-90deg]"
      } ${className}`}
      {...props}
    />
  );
};

export default function MuiListSubheader(props: any) {
  const { open, onOpen } = props;

  return (
    <ListSubheader
      component="div"
      sx={{
        fontWeight: 700,
        fontSize: (theme) => theme.typography.pxToRem(10),
        lineHeight: 0,
        textTransform: "uppercase",
        cursor: "pointer",
        alignItems: "center",
        position: "relative",
        display: "flex",
        alignSelf: "flex-start",
        color: "text.secondary",
        gap: "8px",
        padding: "16px 8px 8px 12px",
        transition:
          "color 300ms cubic-bezier(0.4, 0, 0.2, 1), padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          paddingLeft: "16px",
          color: "text.primary",
          ".icon-arrow": {
            opacity: 1,
          },
        },
      }}
      onClick={onOpen}
    >
      <ArrowIcon
        className="icon-arrow"
        sx={{
          left: 0,
          opacity: 0,
          fontSize: (theme) => theme.typography.pxToRem(14),
          position: "absolute",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        open={props.open}
      />
      Marketing
    </ListSubheader>
  );
}
