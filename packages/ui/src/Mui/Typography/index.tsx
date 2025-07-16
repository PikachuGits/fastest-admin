import { styled, Typography, type TypographyProps } from "@mui/material";

const EllipsisTypographySpan = styled(Typography)(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  display: "-webkit-box",
  textOverflow: "ellipsis",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  fontFamily:
    '"Public Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: 400,
  lineHeight: "1.5",
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}));

export default function EllipsisTypography(props: TypographyProps) {
  return <EllipsisTypographySpan component="span" {...props} />;
}
