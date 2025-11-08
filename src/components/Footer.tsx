import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Link, Stack, Typography } from '@mui/material'

const Footer = () => (
  <Box
    component="footer"
    sx={{
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      py: 3,
      mt: 'auto',
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      alignItems="center"
      justifyContent="space-between"
      sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, md: 3 } }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <GitHubIcon fontSize="small" />
        <Link
          href="https://github.com/yashpatil1998"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          github.com/yashpatil1998
        </Link>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        This website is still under development ;)
      </Typography>
    </Stack>
  </Box>
)

export default Footer

