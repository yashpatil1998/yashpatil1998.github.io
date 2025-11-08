export type Education = {
    program: string
    institution: string
    details: string[]
    period: string
}

export const education: Education[] = [
    {
        program: 'Bachelor of Engineering',
        institution: 'Sardar Patel Institute of Technology, Mumbai',
        details: ['Department of Electronics and Telecommunication', 'CGPI: 8.99'],
        period: '2016 – 2020',
    },
    {
        program: 'Higher Secondary Education',
        institution: 'Pace Junior Science College, Mumbai',
        details: ['HSC 12th', 'Percentage: 85.08%'],
        period: '2014 – 2016',
    },
    {
        program: 'Secondary Education',
        institution: 'Ryan International School, Mumbai',
        details: ['ICSE 10th', 'Percentage: 91.00%'],
        period: '2003 – 2014',
    },
]

