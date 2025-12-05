import { Box, Button, Chip, Stack, Typography } from '@mui/material'

const HomePage = () => (
    <Box
        component="section"
        sx={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            minHeight: { xs: 320, md: 420 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage:
                'linear-gradient(120deg, rgba(0, 24, 64, 0.75), rgba(0, 91, 150, 0.55)), url("/images/linkedin_cover.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <Stack spacing={3} alignItems={{ xs: 'flex-start', md: 'flex-start' }} sx={{ p: { xs: 4, md: 6 }, maxWidth: 560 }}>
            <Chip color="secondary" label="Technology Enthusiast" sx={{ fontWeight: 600, alignSelf: { xs: 'stretch', sm: 'flex-start' } }} />
            <Typography component="h1" variant="h3" fontWeight={700} color="common.white">
                Hi there!
                <br />
                I&apos;m Yash Patil
            </Typography>
            <Typography variant="h6" color="rgba(255,255,255,0.85)" fontWeight={400}>
                Software engineer with experience across microservices, computer vision, deep learning, and big data projects.
            </Typography>
            <Typography variant="body1" color="rgba(255,255,255,0.85)">
                I build dependable systems, craft data-driven solutions, and love partnering with teams to tackle challenging engineering problems.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    href="/YashPatil_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Resume
                </Button>
                <Button variant="outlined" size="large" color="inherit" href="mailto:yashpatil1998@gmail.com">
                    Contact Me
                </Button>
            </Stack>
        </Stack>
    </Box>
)

export default HomePage

