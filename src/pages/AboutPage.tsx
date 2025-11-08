import { Stack, Typography } from '@mui/material'

const AboutPage = () => (
  <Stack spacing={3}>
    <Typography component="h1" variant="h4" fontWeight={700}>
      About
    </Typography>
    <Typography variant="body1">
      I&apos;m Yash Patil, currently working as a Technology Analyst at Deutsche Bank. My interests span software
      engineering, microservices, computer vision, deep learning, and big data. This section will soon highlight my
      journey, interests, and what drives me professionally.
    </Typography>
  </Stack>
)

export default AboutPage

