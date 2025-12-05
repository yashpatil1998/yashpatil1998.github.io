export type Education = {
    program: string
    institution: string
    details: string[]
    period: string
    logo: string
}

export const education: Education[] = [
    {
        program: 'Bachelor of Engineering',
        institution: 'Sardar Patel Institute of Technology, Mumbai',
        details: ['Department of Electronics and Telecommunication', 'CGPI: 8.99'],
        period: '2016 – 2020',
        logo: 'https://img.logo.dev/spit.ac.in?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        program: 'Higher Secondary Education',
        institution: 'Pace Junior Science College, Mumbai',
        details: ['HSC 12th', 'Percentage: 85.08%'],
        period: '2014 – 2016',
        logo: 'https://img.logo.dev/iitianspace.com/?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        program: 'Secondary Education',
        institution: 'Ryan International School, Mumbai',
        details: ['ICSE 10th', 'Percentage: 91.00%'],
        period: '2003 – 2014',
        logo: 'https://img.logo.dev/ryangroup.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
]

