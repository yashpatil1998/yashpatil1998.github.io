import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GitHubIcon from '@mui/icons-material/GitHub'
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography} from '@mui/material'
import {useEffect} from 'react'

const focusAreas = [
    'Microservices and scalable backend architecture',
    'Computer vision and deep learning experiments that deliver real-world impact',
    'Data engineering across big data ecosystems with strong automation practices',
]

const AboutPage = () => {
    useEffect(() => {
        const scriptId = 'linkedin-badge-script'
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script')
            script.src = 'https://platform.linkedin.com/badges/js/profile.js'
            script.async = true
            script.defer = true
            script.id = scriptId
            document.body.appendChild(script)
        } else {
            ;(window as unknown as {LIRenderAll?: () => void}).LIRenderAll?.()
        }
    }, [])

    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <Typography component="h1" variant="h4" fontWeight={700}>
                    About
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Technology analyst, lifelong learner, and builder of thoughtful engineering solutions.
                </Typography>
            </Stack>
            <Paper elevation={0} sx={{p: {xs: 3, md: 4}, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                <Stack spacing={2}>
                    <Typography variant="body1">
                        Hi, I&apos;m Yash Patil. I currently work as a Technology Analyst at Deutsche Bank within the Corporate Banking Technology group. My work bridges platform modernization, distributed systems, and data-intensive applications to support mission-critical financial services.
                    </Typography>
                    <Typography variant="body1">
                        Previously, I have researched and shipped projects that span computer vision, natural language processing, deep learning, and big data systems. Regardless of the stack, I enjoy collaborating with teams, iterating quickly, and shipping reliable software that solves business problems.
                    </Typography>
                    <Typography variant="body1">
                        A few areas I love diving into:
                    </Typography>
                    <List disablePadding>
                        {focusAreas.map((area) => (
                            <ListItem key={area} sx={{pl: 0}}>
                                <ListItemIcon sx={{minWidth: 32}}>
                                    <CheckCircleIcon color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={area} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="body1">
                        Outside of work, you can usually find me learning new tools, mentoring teammates, or tinkering with ideas that merge technology and meaningful user experiences.
                    </Typography>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} justifyContent="flex-start" alignItems="stretch">
                        <Box
                            sx={{
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                px: 2,
                                py: 2,
                                backgroundColor: 'background.paper',
                                display: 'inline-block',
                                '.LI-profile-badge': {margin: 0},
                                '.LI-profile-badge > .LI-simple-link:first-of-type': {display: 'none'},
                            }}
                        >
                            <div
                                className="LI-profile-badge"
                                data-version="v1"
                                data-size="medium"
                                data-locale="en_US"
                                data-type="horizontal"
                                data-theme="light"
                                data-vanity="yashpatil1998"
                            >
                                <a className="LI-simple-link" href="https://www.linkedin.com/in/yashpatil1998?trk=profile-badge">
                                    Yash Patil
                                </a>
                            </div>
                        </Box>
                        <Box
                            sx={{
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                px: 3,
                                py: 2,
                                backgroundColor: 'background.paper',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minWidth: {xs: '100%', sm: 240},
                                maxWidth: 320,
                            }}
                        >
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <GitHubIcon color="action" />
                                <Typography variant="subtitle1" fontWeight={600}>
                                    github.com/yashpatil1998
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                                Explore open-source experiments, automation utilities, and side projects.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="inherit"
                                href="https://github.com/yashpatil1998"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{alignSelf: 'flex-start', mt: 2, textTransform: 'none'}}
                                startIcon={<GitHubIcon fontSize="small" />}
                            >
                                View GitHub
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    )
}

export default AboutPage

