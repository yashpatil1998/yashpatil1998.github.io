import { Box, Button, Card, CardActions, CardContent, Container, Typography, useTheme, Fade, Avatar, Stack } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { publications } from '../data/publications'

const PublicationsPage = () => {
  const theme = useTheme()

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Publications
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Research papers and articles
        </Typography>
      </Box>

      <Stack spacing={3}>
        {publications.map((pub, index) => (
          <Fade in={true} timeout={500 + index * 100} key={index}>
              <Card 
                sx={{ 
                  width: '100%',
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { sm: 'center' },
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                  p: 2
                }}
              >
                {pub.logo && (
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <Avatar
                        src={pub.logo}
                        alt={pub.venue}
                        variant="rounded"
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'common.white',
                            border: `1px solid ${theme.palette.divider}`,
                            '& img': {
                                objectFit: 'contain',
                                padding: '8px',
                            },
                        }}
                    />
                  </Box>
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                          {pub.year} • {pub.venue}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{ mt: 0.5, lineHeight: 1.3 }}>
                          {pub.title}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {pub.summary}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 1 }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<LaunchIcon />}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Paper
                    </Button>
                  </CardActions>
                </Box>
              </Card>
          </Fade>
        ))}
      </Stack>
    </Container>
  )
}

export default PublicationsPage
