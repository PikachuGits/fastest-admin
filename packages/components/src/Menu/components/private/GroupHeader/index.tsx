import { StyledGroupHeader, StyledArrowIcon, type GroupHeaderProps } from "../../../styles/GroupHeader.styles";

export const GroupHeader = ({ title, onClick, open = false }: GroupHeaderProps) => {
  return (
    <StyledGroupHeader onClick={onClick}>
      <StyledArrowIcon
        icon="eva:arrow-ios-downward-fill"
        open={open}
        className="icon-arrow"
      />
      <span className="text-xs">{title}</span>
    </StyledGroupHeader>
  );
};