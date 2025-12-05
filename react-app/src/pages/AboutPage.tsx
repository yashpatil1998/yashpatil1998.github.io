import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GitHubIcon from '@mui/icons-material/GitHub'
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography} from '@mui/material'
import {useEffect} from 'react'

const focusAreas = [
    'Microservices, UI, CI/CD, Test Automation, and Infrastructure',
    'Computer vision and deep learning implementations with real-world impact',
    'Data engineering across big data ecosystems',
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
                        Implementing technology solutions for a FinTech, I'm seasoned in Microservices, UI, CI/CD, Test Automation, and Infrastructure.
                    </Typography>
                    <Typography variant="body1">
                        At MSCI, I am a part of the Wealth Management Team, where I am building features as part of the MSCI Wealth Manager application, majorly focusing on the reallocation of assets, helping clients understand their portfolio returns and optimize taxes and costs.
                    </Typography>
                    <Typography variant="body1">
                        In Deutsche Bank, I was a part of Contextual Banking (popularly Banking as a Service or Embedded Financing), where I built Synthix, a marketplace for financial institutions and corporates to publish/subscribe to banking products as a service. Previously, I have worked in Corporate Payments Technology, where I contributed to building APIs for payments targeting multiple regions like India and SEPA.
                    </Typography>
                    <Typography variant="body1">
                        During my internship tenure and academic research publications, I've worked on NLP, Deep Learning, Computer Vision, and Big Data-based implementations.
                    </Typography>
                    <Typography variant="body1">
                        Feel free to get in touch and extend our professional network.
                    </Typography>
                    <Typography variant="body1">
                        A few areas I focus on:
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

