export type Skill = {
    name: string
    level: 'Novice' | 'Intermediate' | 'Advanced'
    description: string
    proficiency: number
    logo: string
}

export const skills: Skill[] = [
    {
        name: 'Go',
        level: 'Advanced',
        description: 'Developing high-performance, concurrent backend services and command-line tools.',
        proficiency: 90,
        logo: 'https://img.logo.dev/go.dev?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Java',
        level: 'Advanced',
        description: 'Building resilient services and backend systems with strong testing discipline.',
        proficiency: 85,
        logo: 'https://img.logo.dev/java.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'gRPC',
        level: 'Intermediate',
        description: 'Designing efficient, cross-language remote procedure calls for microservices.',
        proficiency: 70,
        logo: 'https://img.logo.dev/grpc.io?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Spring Boot',
        level: 'Intermediate',
        description: 'Designing microservices, REST APIs, and enterprise integrations.',
        proficiency: 70,
        logo: 'https://img.logo.dev/spring.io?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'GCP',
        level: 'Intermediate',
        description: 'Deploying and managing scalable infrastructure and cloud-native applications.',
        proficiency: 75,
        logo: 'https://img.logo.dev/googlecloudpresscorner.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Terraform',
        level: 'Intermediate',
        description: 'Infrastructure as Code for provisioning and managing cloud resources reliably.',
        proficiency: 70,
        logo: 'https://img.logo.dev/terraform.io?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'TypeScript',
        level: 'Intermediate',
        description: 'Building type-safe frontend applications and robust node.js services.',
        proficiency: 67,
        logo: 'https://img.logo.dev/typescriptlang.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'ReactJS',
        level: 'Intermediate',
        description: 'Creating interactive and responsive user interfaces with modern React patterns.',
        proficiency: 67,
        logo: 'https://img.logo.dev/react.dev?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'SQL',
        level: 'Intermediate',
        description: 'Designing normalized schemas and optimizing complex queries for performance.',
        proficiency: 70,
        logo: 'https://img.logo.dev/postgresql.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Machine Learning',
        level: 'Intermediate',
        description: 'Applying ML models to practical business problems with measurable outcomes.',
        proficiency: 73,
        logo: 'https://img.logo.dev/deeplearning.ai?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Python',
        level: 'Intermediate',
        description: 'Rapid prototyping, data science, and scripting in production environments.',
        proficiency: 73,
        logo: 'https://img.logo.dev/python.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        name: 'Linux',
        level: 'Intermediate',
        description: 'Automating workflows, managing deployments, and troubleshooting systems.',
        proficiency: 65,
        logo: 'https://img.logo.dev/linux.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
]
