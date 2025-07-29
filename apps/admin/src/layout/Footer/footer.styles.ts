import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Footer 主容器
export const StyledFooterContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderTop: '1px solid #ddd',
  textAlign: 'center',
}));

// Footer 文本
export const StyledFooterText = styled(Typography)(({ theme }) => ({
  // 可以在这里添加自定义样式
}));