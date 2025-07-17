import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Iconify } from "@fastest/components";

import RotatingBorderAvatar from "./AvatarWithRotatingBorder";

const IconButtonBox = styled(IconButton)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: 1.05,
    },
  };
});

export const RightHeaderGrid = () => {
  return (
    <Fragment>
      <IconButtonBox>
        <Iconify
          icon="solar:full-screen-square-outline"
          className=" text-gray-500 "
        />
      </IconButtonBox>
      <IconButtonBox>
        <Iconify
          icon="solar:bell-bing-bold-duotone"
          className=" text-gray-500 "
        />
      </IconButtonBox>
      <IconButtonBox>
        <Iconify
          icon="solar:settings-bold-duotone"
          className="text-gray-500 animate-spin animate-duration-5000"
        />
      </IconButtonBox>
      {/* 头像 */}
      <RotatingBorderAvatar src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp" />
    </Fragment>
  );
};
