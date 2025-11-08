import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from '@mui/material'
import {education} from '../data/education'

const EducationPage = () => (
    <Stack spacing={4}>
        <Stack spacing={1}>
            <Typography component="h1" variant="h4" fontWeight={700}>
                Education
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Academic milestones that laid the groundwork for my engineering career.
            </Typography>
        </Stack>
        <Stack spacing={2}>
            {education.map((entry) => (
                <Accordion key={entry.program} disableGutters sx={{borderRadius: 3, '&:before': {display: 'none'}}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Stack spacing={0.5}>
                            <Typography variant="h6" fontWeight={600}>
                                {entry.program}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {entry.institution}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {entry.period}
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1.5}>
                            {entry.details.map((detail) => (
                                <Typography variant="body2" key={detail}>
                                    {detail}
                                </Typography>
                            ))}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    </Stack>
)

export default EducationPage

