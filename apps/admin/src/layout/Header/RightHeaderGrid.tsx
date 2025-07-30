import { Fragment } from "react";
import { Iconify } from "@fastest/components";
import { useAppTheme } from "@/app/providers";
import { useAppLayout } from "@fastest/hook";
import RotatingBorderAvatar from "./AvatarWithRotatingBorder";
import { StyledRightIconButton } from "./header.styles";
import { SettingButton } from "../component";

export const RightHeaderGrid = () => {
  const { toggleTheme, isDarkMode } = useAppTheme()

  return (
    <Fragment>
      <StyledRightIconButton onClick={toggleTheme}>
        {
          isDarkMode ? <Iconify
            icon={"solar:sun-2-bold-duotone"}
            className="animate-fade-in animate-fade-out  animate-duration-1000"
          /> :
            <Iconify
              icon={"solar:cloudy-moon-bold"}
              className="animate-fade-in animate-fade-out animate-duration-1000"
            />
        }
      </StyledRightIconButton>
      <StyledRightIconButton >
        <Iconify
          icon="solar:full-screen-square-outline"
          className=" "
        />
      </StyledRightIconButton>
      <StyledRightIconButton>
        <Iconify
          icon="solar:bell-bing-bold-duotone"
        />
      </StyledRightIconButton>
      <SettingButton />
      {/* <StyledRightIconButton>
        <Iconify
          icon="solar:settings-bold-duotone"
          className=" animate-spin animate-duration-5000"
        />
      </StyledRightIconButton> */}
      {/* 头像 */}
      <RotatingBorderAvatar src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/avatar/avatar-25.webp" />
    </Fragment>
  );
};
