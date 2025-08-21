import { ListSubheader } from "@mui/material";
import { Iconify, sxStyled } from "@fastest/components";
import { MenuArrowIconSx, MenuSubHeaderSx } from "../../styles/Menu.sx";

export const SubHeader = ({
  title,
  onToggle,
  open = false,
  tabIndex = 0,
}: {
  title: string;
  onToggle: () => void;
  open: boolean;
  tabIndex?: number;
}) => {
  return (
    <ListSubheader
      sx={sxStyled(MenuSubHeaderSx)}
      onClick={onToggle}
      aria-expanded={open}
      role="button"
    >
      <Iconify
        sx={sxStyled(MenuArrowIconSx)}
        icon="eva:arrow-ios-downward-fill"
        className="icon-arrow"
      />
      <span className="text-xs">{title}</span>
    </ListSubheader>
  );
};

export default SubHeader;
