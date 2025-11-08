import LaunchIcon from '@mui/icons-material/Launch'
import {Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from '@mui/material'
import {projects} from '../data/projects'

const ProjectsPage = () => (
    <Stack spacing={4}>
        <Stack spacing={1}>
            <Typography component="h1" variant="h4" fontWeight={700}>
                Projects
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Selected work spanning product builds, data pipelines, and research prototypes.
            </Typography>
        </Stack>
        <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'}}}>
            {projects.map((project) => (
                <Card key={project.name} sx={{height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3}}>
                    <CardMedia component="div" image={project.image} sx={{height: 200}} />
                    <CardContent sx={{flexGrow: 1}}>
                        <Stack spacing={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {project.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {project.description}
                            </Typography>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{px: 3, pb: 3, pt: 0}}>
                        <Button
                            variant="outlined"
                            size="small"
                            endIcon={<LaunchIcon fontSize="small" />}
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Project
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    </Stack>
)

export default ProjectsPage

