export type Skill = {
    name: string
    level: 'Novice' | 'Intermediate' | 'Advanced'
    description: string
    proficiency: number
}

export const skills: Skill[] = [
    {
        name: 'Go',
        level: 'Advanced',
        description: 'Developing high-performance, concurrent backend services and command-line tools.',
        proficiency: 90,
    },
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
        name: 'GCP',
        level: 'Intermediate',
        description: 'Deploying and managing scalable infrastructure and cloud-native applications.',
        proficiency: 75,
    },
    {
        name: 'TypeScript',
        level: 'Intermediate',
        description: 'Building type-safe frontend applications and robust node.js services.',
        proficiency: 75,
    },
    {
        name: 'ReactJS',
        level: 'Intermediate',
        description: 'Creating interactive and responsive user interfaces with modern React patterns.',
        proficiency: 75,
    },
    {
        name: 'Machine Learning',
        level: 'Intermediate',
        description: 'Applying ML models to practical business problems with measurable outcomes.',
        proficiency: 73,
    },
    {
        name: 'Python',
        level: 'Intermediate',
        description: 'Rapid prototyping, data science, and scripting in production environments.',
        proficiency: 73,
    },
    {
        name: 'Linux',
        level: 'Intermediate',
        description: 'Automating workflows, managing deployments, and troubleshooting systems.',
        proficiency: 65,
    },
]
