import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab'
import {Avatar, Box, Paper, Stack, Typography} from '@mui/material'
import {experiences} from '../data/experience'

const ExperiencePage = () => (
    <Stack spacing={4}>
        <Stack spacing={1}>
            <Typography component="h1" variant="h4" fontWeight={700}>
                Experience
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Roles and projects that shaped my engineering journey.
            </Typography>
        </Stack>
        <Timeline position="alternate">
            {experiences.map((experience, index) => {
                const avatar = (
                    <Avatar
                        src={experience.logo}
                        alt={experience.company}
                        variant="rounded"
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: 'common.white',
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            '& img': {
                                objectFit: 'contain',
                                padding: '6px',
                            },
                        }}
                    />
                )

                return (
                    <TimelineItem key={`${experience.company}-${experience.role}`}>
                        <TimelineOppositeContent sx={{flex: 0.2, display: {xs: 'none', md: 'block'}}}>
                            <Typography variant="subtitle2" color="text.secondary">
                                {experience.start} – {experience.end}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <WorkHistoryIcon />
                            </TimelineDot>
                            {index < experiences.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{py: 2, px: {xs: 0, md: 2}}}>
                            <Paper elevation={0} sx={{p: 3, borderRadius: 3, border: (theme) => `1px solid ${theme.palette.divider}`}}>
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {avatar}
                                        <Stack spacing={0.5}>
                                            <Typography variant="h6" fontWeight={600}>
                                                {experience.role}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {experience.company}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {experience.location}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{display: {xs: 'block', md: 'none'}}}>
                                                {experience.start} – {experience.end}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary">
                                        {experience.summary}
                                    </Typography>
                                    <Stack component="ul" spacing={1.5} sx={{pl: 2, mb: 0, mt: 0}}>
                                        {experience.highlights.map((highlight) => (
                                            <Box component="li" key={highlight} sx={{lineHeight: 1.6}}>
                                                <Typography variant="body2">{highlight}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                )
            })}
        </Timeline>
    </Stack>
)

export default ExperiencePage

