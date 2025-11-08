export type Experience = {
    company: string
    role: string
    location: string
    start: string
    end: string
    summary: string
    highlights: string[]
    logo: string
}

export const experiences: Experience[] = [
    {
        company: 'MSCI Inc.',
        role: 'Senior Technology Associate',
        location: 'Pune, India',
        start: 'Jan 2025',
        end: 'Present',
        summary:
            'Leading engineering for MSCI Wealth Manager, delivering personalised portfolio tooling across a modern cloud stack.',
        highlights: [
            'Automating asset allocation rebalancing pipelines by integrating with MSCI Quantitative Investment Solutions.',
            'Building React + TypeScript experiences backed by Go microservices and analytics workloads.',
            'Operating a highly normalised PostgreSQL estate with Liquibase migrations on Google Cloud Platform.',
        ],
        logo: '/images/msci.svg',
    },
    {
        company: 'Deutsche Bank',
        role: 'Technology Associate',
        location: 'Pune, India',
        start: 'Mar 2023',
        end: 'Dec 2024',
        summary:
            'Delivered global SaaS capabilities for corporate payments, blending event-driven systems with rich client experiences.',
        highlights: [
            'Launched a receivables platform that trimmed settlement processing by 40+ hours each week for large corporates.',
            'Integrated NPCI’s NACH mandates, SEPA engines, and Deutsche Bank’s OAuth2 and SCA flows into the unified product.',
            'Shipped Server Sent Events using Go and TypeScript to surface real-time payment status updates to customers.',
            'Secured API products via mTLS with strong CN binding on GCP load balancers and built a VPA lookup across 10 banks.',
            'Produced Docker Compose blueprints that recreate the complete environment locally in minutes for integration testing.',
        ],
        logo: '/images/db.gif',
    },
    {
        company: 'Deutsche Bank',
        role: 'Technology Analyst',
        location: 'Pune, India',
        start: 'Aug 2020',
        end: 'Feb 2023',
        summary:
            'Scaled digital channels for corporate banking and introduced contextual marketplaces for partner-led products.',
        highlights: [
            'Built subscription marketplaces and helpdesk tooling with React, MUI, and Go microservices over gRPC.',
            'Designed mandate-driven direct debit services using Spring WebFlux with automated Karate-based API test suites.',
            'Rolled out India, SEPA, UK, Russia, and Indonesia payment APIs with resiliency, automation, and globalisation in mind.',
            'Repeatedly recognised through global hackathons and internal innovation programs for security and blockchain work.',
        ],
        logo: '/images/db.gif',
    },
    {
        company: 'Fractal',
        role: 'Data Science Intern',
        location: 'Mumbai, India',
        start: 'Jan 2020',
        end: 'Jun 2020',
        summary: 'Accelerated invoice digitisation by pairing deep learning models with automation tooling.',
        highlights: [
            'Reduced travel invoice processing from 20+ hours per week to under one hour using NLP-driven extraction.',
            'Operationalised the pipeline with WorkFusion RPA and Google Cloud Vision for reconciliation against MIS data.',
        ],
        logo: '/images/fractal.png',
    },
    {
        company: 'Xoriant',
        role: 'Big Data Intern',
        location: 'Pune, India',
        start: 'May 2018',
        end: 'Jun 2018',
        summary: 'Delivered Hive-backed ingestion services inside a Hadoop ecosystem.',
        highlights: [
            'Developed a generic Hive sink accessible via Thrift, enabling Java services to push batch data into HDFS.',
            'Fine-tuned Hive queries to meet performance expectations across the analytical cluster.',
        ],
        logo: '/images/xoriant.png',
    },
]

