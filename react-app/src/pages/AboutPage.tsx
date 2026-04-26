import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GitHubIcon from '@mui/icons-material/GitHub'
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography} from '@mui/material'
import {useEffect} from 'react'

const focusAreas = [
    'Distributed backend systems, microservices, and cloud-native infrastructure on GCP',
    'Financial systems engineering across payments, wealth management, and SaaS platforms',
    'Client-facing product development bridging engineering and business needs',
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
                    Senior Technology Associate, fintech engineer, and builder of distributed financial systems.
                </Typography>
            </Stack>
            <Paper elevation={0} sx={{p: {xs: 3, md: 4}, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                <Stack spacing={2}>
                    <Typography variant="body1">
                        With 5+ years in fintech engineering, I specialise in building distributed backend systems, cloud-native infrastructure, and client-facing financial products across payments and wealth management.
                    </Typography>
                    <Typography variant="body1">
                        At MSCI, I'm part of the Wealth Management team building MSCI Wealth Manager, a platform that helps clients personalise and optimise their wealth portfolios. My work spans automated asset allocation and rebalancing pipelines, portfolio tax optimisation, and cloud-native backend services on GCP. I also serve as a Forward Deployed Engineer for clients across APAC and AMER, working directly with clients to surface product gaps and translate business needs into engineering decisions.
                    </Typography>
                    <Typography variant="body1">
                        At Deutsche Bank, I built Synthix, a global receivables SaaS platform for corporate payments, and contributed to Corporate Payments Technology, delivering payment APIs across India, SEPA, UK, and other regions. My work included distributed systems with Go and Spring Boot, OAuth2.0, mTLS security, and event-driven architecture on GCP.
                    </Typography>
                    <Typography variant="body1">
                        During my academic years, I published research across IEEE and Springer on computer vision, NLP, and deep learning. These experiences continue to inform how I think about data-driven systems.
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