import React from "react"
import { Box, Typography } from "@mui/material"

const Footer: React.FC = () => {
    return (
        <Box sx={{ mt: 4, py: 2, borderTop: "1px solid #ddd", textAlign: "center" }}>
            <Typography variant="body2">© 2025 Powered by MUI</Typography>
        </Box>
    )
}

export default Footer