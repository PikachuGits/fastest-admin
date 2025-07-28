import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import MiniMenu from './MiniMenu';

const MiniMenuDemo: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MiniMenu Component Demo
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        这是从编译后的HTML代码转换而来的MiniMenu组件演示。
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Default MiniMenu
          </Typography>
          <MiniMenu />
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>
            Custom Styled MiniMenu
          </Typography>
          <MiniMenu 
            sx={{
              maxWidth: 280,
              boxShadow: 3,
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MiniMenuDemo;