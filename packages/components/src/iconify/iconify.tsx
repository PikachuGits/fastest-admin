import type { IconProps } from "@iconify/react";

import { Icon } from "@iconify/react";
import { useId } from "react";

import { classes_merge } from "@fastest/utils";
import { styled } from "@mui/material/styles";
import { iconifyClasses } from "./classes";
import { allIconNames, registerIcons } from "./register-icons";

import type { IconifyName } from "./register-icons";

// ----------------------------------------------------------------------

export type IconifyProps = React.ComponentProps<typeof IconRoot> &
  Omit<IconProps, "icon"> & {
    icon: IconifyName;
  };

export function Iconify({
  className,
  icon,
  width = "100%",
  height,
  sx,
  ...other
}: IconifyProps) {
  const id = useId();

  if (!allIconNames.includes(icon)) {
    console.warn(
      [
        `Icon "${icon}" is currently loaded online, which may cause flickering effects.`,
        `To ensure a smoother experience, please register your icon collection for offline use.`,
        `More information is available at: https://docs.minimals.cc/icons/`,
      ].join("\n")
    );
  }

  registerIcons();

  return (
    <IconRoot
      ssr
      id={id}
      icon={icon}
      className={classes_merge([className, iconifyClasses.root])}
      sx={[
        {
          flexShrink: 0,
          display: "inline-flex",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

const IconRoot = styled(Icon)``;
