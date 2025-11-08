import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import {Box, Button, Paper, Stack, Typography} from '@mui/material'

const ContactPage = () => (
    <Stack spacing={4}>
        <Stack spacing={1}>
            <Typography component="h1" variant="h4" fontWeight={700}>
                Contact
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                I&apos;m always happy to connect for collaborations, mentoring, or knowledge sharing.
            </Typography>
        </Stack>
        <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'}}}>
            <Paper elevation={0} sx={{p: 3, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                <Stack spacing={2} alignItems="flex-start">
                    <EmailIcon color="primary" fontSize="large" />
                    <Stack spacing={0.5}>
                        <Typography variant="h6" fontWeight={600}>
                            Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Drop me a message and I&apos;ll respond as soon as possible.
                        </Typography>
                    </Stack>
                    <Button variant="contained" color="primary" href="mailto:yashpatil1998@gmail.com">
                        yashpatil1998@gmail.com
                    </Button>
                </Stack>
            </Paper>
            <Paper elevation={0} sx={{p: 3, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                <Stack spacing={2} alignItems="flex-start">
                    <GitHubIcon color="primary" fontSize="large" />
                    <Stack spacing={0.5}>
                        <Typography variant="h6" fontWeight={600}>
                            GitHub
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Explore open-source experiments and side projects.
                        </Typography>
                    </Stack>
                    <Button
                        variant="outlined"
                        color="primary"
                        href="https://github.com/yashpatil1998"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        github.com/yashpatil1998
                    </Button>
                </Stack>
            </Paper>
            <Paper elevation={0} sx={{p: 3, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                <Stack spacing={2} alignItems="flex-start">
                    <LocationOnIcon color="primary" fontSize="large" />
                    <Stack spacing={0.5}>
                        <Typography variant="h6" fontWeight={600}>
                            Base Location
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Currently based in Mumbai, India.
                        </Typography>
                    </Stack>
                    <Button
                        variant="outlined"
                        color="primary"
                        href="https://goo.gl/maps/3h32NjfC5vp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Maps
                    </Button>
                </Stack>
            </Paper>
        </Box>
        <Typography variant="body2" color="text.secondary">
            More ways to connect — including social badges and speaking updates — are on the way.
        </Typography>
    </Stack>
)

export default ContactPage

