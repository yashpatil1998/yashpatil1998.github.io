import { Link, Stack, Typography } from '@mui/material'

const ContactPage = () => (
  <Stack spacing={3}>
    <Typography component="h1" variant="h4" fontWeight={700}>
      Contact
    </Typography>
    <Typography variant="body1">
      I&apos;m always happy to connect. Reach out via{' '}
      <Link href="mailto:yashpatil1998@gmail.com">yashpatil1998@gmail.com</Link>, explore my work on{' '}
      <Link href="https://github.com/yashpatil1998" target="_blank" rel="noopener noreferrer">
        GitHub
      </Link>
      , or visit my alma mater at{' '}
      <Link href="https://goo.gl/maps/3h32NjfC5vp" target="_blank" rel="noopener noreferrer">
        Sardar Patel Institute of Technology
      </Link>
      .
    </Typography>
    <Typography variant="body2" color="text.secondary">
      More ways to connect — including social badges and forms — are coming soon.
    </Typography>
  </Stack>
)

export default ContactPage

