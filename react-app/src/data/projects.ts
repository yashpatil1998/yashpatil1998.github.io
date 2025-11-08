export type Project = {
    name: string
    description: string
    image: string
    repoUrl: string
}

export const projects: Project[] = [
    {
        name: 'Portfolio Management System',
        description: 'Comprehensive portfolio tracking application with visual dashboards and analytics.',
        image: '/images/pms.jpg',
        repoUrl: 'https://yashpatil1998.github.io/PMS',
    },
    {
        name: 'Taxi System in Java',
        description: 'Simulation of taxi allocation logic featuring dispatch, routes, and performance metrics.',
        image: '/images/taxi.jpg',
        repoUrl: 'https://yashpatil1998.github.io/Taxi-System/',
    },
    {
        name: 'Analysis of Rainfall in India',
        description: 'Interactive visualization and insights into rainfall patterns across Indian regions.',
        image: '/images/rain.jpg',
        repoUrl: 'https://yashpatil1998.github.io/Rainfall-In-India-Analysis/',
    },
    {
        name: 'Sign Language Interpreter',
        description: 'Computer vision system translating sign language gestures into textual output.',
        image: '/images/sli.png',
        repoUrl: 'https://github.com/yashpatil1998/SLI',
    },
]

