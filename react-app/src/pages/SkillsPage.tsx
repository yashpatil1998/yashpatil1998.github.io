import {Avatar, Box, Chip, LinearProgress, Paper, Stack, Typography} from '@mui/material'
import type {Theme} from '@mui/material/styles'
import {skills} from '../data/skills'

type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'

type LevelStyle = {
    chip: ChipColor
    icon: (theme: Theme) => string
}

const levelStyles: Record<'Novice' | 'Intermediate' | 'Advanced', LevelStyle> = {
    Novice: {
        chip: 'default',
        icon: (theme) => theme.palette.text.disabled,
    },
    Intermediate: {
        chip: 'info',
        icon: (theme) => theme.palette.info.main,
    },
    Advanced: {
        chip: 'success',
        icon: (theme) => theme.palette.success.main,
    },
}

const SkillsPage = () => (
    <Stack spacing={4}>
        <Stack spacing={1}>
            <Typography component="h1" variant="h4" fontWeight={700}>
                Skills
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                A snapshot of the technologies and disciplines I work with most.
            </Typography>
        </Stack>
        <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}}}>
            {skills.map((skill) => (
                <Paper
                    key={skill.name}
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        height: '100%',
                    }}
                >
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar
                                src={skill.logo}
                                alt={skill.name}
                                variant="rounded"
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'transparent',
                                    '& img': {
                                        objectFit: 'contain',
                                    },
                                }}
                            />
                            <Typography variant="h6" fontWeight={600}>
                                {skill.name}
                            </Typography>
                            <Chip label={skill.level} size="small" color={levelStyles[skill.level].chip} variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {skill.description}
                        </Typography>
                        <Stack spacing={1}>
                            <LinearProgress value={skill.proficiency} variant="determinate" sx={{height: 8, borderRadius: 4}} />
                            <Typography variant="caption" color="text.secondary">
                                Proficiency: {skill.proficiency}%
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            ))}
        </Box>
    </Stack>
)

export default SkillsPage

