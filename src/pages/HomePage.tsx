import { Button, Stack, Typography } from '@mui/material'

const HomePage = () => (
  <Stack spacing={3}>
    <Typography component="h1" variant="h3" fontWeight={700}>
      Hi there! I&apos;m Yash
    </Typography>
    <Typography variant="h5" color="text.secondary">
      Technology Enthusiast
    </Typography>
    <Typography variant="body1">
      Welcome to my professional space on the web. I enjoy solving complex problems, designing resilient systems,
      and constantly learning new things in the world of technology.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Button variant="contained" size="large" href="/YashPatil_Resume.pdf" target="_blank" rel="noopener noreferrer">
        View Resume
      </Button>
      <Button variant="outlined" size="large" href="mailto:yashpatil1998@gmail.com">
        Contact Me
      </Button>
    </Stack>
  </Stack>
)

export default HomePage

