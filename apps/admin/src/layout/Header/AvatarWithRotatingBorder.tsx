// components/AvatarWithRotatingBorder.tsx
import { Box, Avatar, IconButton, styled } from "@mui/material";
import "@/layout/styles/avatarWithRotatingBorder.less";

interface AvatarWithRotatingBorderProps {
  children?: React.ReactNode;
  src: string;
  size?: number;
}

const IconButtonBox = styled(IconButton)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out",
    marginLeft: "10px",
    "&:hover": {
      scale: 1.05,
    },
  };
});

const RotatingBorderAvatar = (props: AvatarWithRotatingBorderProps) => {
  return (
    <IconButtonBox className="relative w-10 h-10">
      {/* 旋转的边框 SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        className="animate-spin-slow absolute top-0 left-0"
      >
        <title id="svgTitle">Avatar</title>
        <defs>
          <mask id="hole-mask">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="60" cy="60" r="48" fill="black" />
          </mask>
        </defs>
        {/* 外圈边框 */}
        <circle
          cx="60"
          cy="60"
          r="58"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          mask="url(#hole-mask)"
        />
        {/* 渐变色定义 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#5762fe" />
          </linearGradient>
        </defs>
      </svg>
      {/* 头像层 */}

      <Avatar
        className="w-full h-full absolute left-0 top-0 border-[4px] border-transparent"
        src={props.src}
      />
    </IconButtonBox>
  );
};

export default RotatingBorderAvatar;
