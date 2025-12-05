import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Stack, Typography, useTheme, alpha} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import {education} from '../data/education'

const EducationPage = () => {
    const theme = useTheme()

    return (
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
                {education.map((entry, index) => (
                    <Accordion 
                        key={entry.program} 
                        disableGutters 
                        defaultExpanded={index === 0}
                        sx={{
                            borderRadius: '12px !important', 
                            '&:before': {display: 'none'},
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: 'none',
                            overflow: 'hidden',
                            '&.Mui-expanded': {
                                boxShadow: theme.shadows[1],
                                borderColor: alpha(theme.palette.primary.main, 0.2)
                            }
                        }}
                    >
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                '& .MuiAccordionSummary-content': {
                                    margin: '12px 0',
                                    alignItems: 'center'
                                }
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center" sx={{width: '100%'}}>
                                <Avatar
                                    src={entry.logo}
                                    alt={entry.institution}
                                    variant="rounded"
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${theme.palette.divider}`,
                                        '& img': {
                                            objectFit: 'contain',
                                            padding: '4px',
                                        },
                                    }}
                                >
                                    <SchoolIcon color="action" />
                                </Avatar>
                                <Box sx={{flexGrow: 1}}>
                                    <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                                        {entry.program}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {entry.institution}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap', ml: 2 }}>
                                    {entry.period}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0, pb: 3, px: 3 }}>
                            <Box sx={{ 
                                ml: { xs: 0, sm: 9 }, 
                                pt: 2,
                                borderTop: `1px solid ${theme.palette.divider}`
                            }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' }, mb: 1 }}>
                                    {entry.period}
                                </Typography>
                                <Stack spacing={1}>
                                    {entry.details.map((detail) => (
                                        <Stack key={detail} direction="row" alignItems="center" spacing={1}>
                                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.6 }} />
                                            <Typography variant="body2">
                                                {detail}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Stack>
    )
}

export default EducationPage
