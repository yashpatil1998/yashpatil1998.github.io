import { Stack, Typography } from '@mui/material'

const ProjectsPage = () => (
  <Stack spacing={3}>
    <Typography component="h1" variant="h4" fontWeight={700}>
      Projects
    </Typography>
    <Typography variant="body1">
      Soon you&apos;ll find curated highlights of the work I&apos;m most proud of: Portfolio Management System, Taxi
      System in Java, Rainfall Analysis, Sign Language Interpreter, and more.
    </Typography>
  </Stack>
)

export default ProjectsPage

