export type Skill = {
    name: string
    level: 'Novice' | 'Intermediate' | 'Advanced'
    description: string
    proficiency: number
}

export const skills: Skill[] = [
    {
        name: 'Java',
        level: 'Advanced',
        description: 'Building resilient services and backend systems with strong testing discipline.',
        proficiency: 85,
    },
    {
        name: 'Spring Boot',
        level: 'Intermediate',
        description: 'Designing microservices, REST APIs, and enterprise integrations.',
        proficiency: 70,
    },
    {
        name: 'Machine Learning',
        level: 'Intermediate',
        description: 'Applying ML models to practical business problems with measurable outcomes.',
        proficiency: 73,
    },
    {
        name: 'Linux',
        level: 'Intermediate',
        description: 'Automating workflows, managing deployments, and troubleshooting systems.',
        proficiency: 65,
    },
    {
        name: 'Cloud',
        level: 'Novice',
        description: 'Experimenting with managed services and scalable infrastructure patterns.',
        proficiency: 50,
    },
    {
        name: 'Python',
        level: 'Intermediate',
        description: 'Rapid prototyping, data science, and scripting in production environments.',
        proficiency: 73,
    },
]

