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
            'Leading engineering for MSCI Wealth Manager, delivering personalised portfolio tooling and client-facing financial systems across a modern cloud stack.',
        highlights: [
            'Built and automated asset allocation and portfolio rebalancing systems for MSCI Wealth Manager, integrating with MSCI Quantitative Investment Solutions for returns and tax optimization.',
            'Implemented Server-Sent Events for bulk portfolio rebalancing with concurrent execution, supporting 70+ simultaneous rebalances with real-time per-portfolio status and failure reporting.',
            'Built a role-based access control system managing 300+ users across 5+ client organizations, enabling org admins to control permissions and workflow-level access.',
            'Implemented a configurable multi-endpoint OpenTelemetry pipeline pushing to GCP and internal Grafana, designed for zero-code addition of new telemetry sinks.',
            'Instrumented frontend event tracking via Amplitude with structured, context-rich events capturing user actions, resource identifiers, and workflow outcomes for product analytics.',
            'Provisioned reusable Terraform modules to provision and manage 2 isolated GCP environments, enabling consistent and repeatable infrastructure deployments.',
            'Orchestrated ingestion of MSCI index data into the platform via Redpanda Kafka using declarative YAML pipelines, enabling structured streaming into portfolio computation tables.',
            'Appointed as Forward Deployed Engineer for clients across APAC and AMER (Singapore, Hong Kong, US), engaging directly with clients and coverage teams to surface product gaps and translate business needs into engineering decisions.',
        ],
        logo: 'https://img.logo.dev/msci.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Deutsche Bank',
        role: 'Technology Associate',
        location: 'Pune, India',
        start: 'Mar 2023',
        end: 'Dec 2024',
        summary:
            'Led development of Synthix, a global receivables SaaS platform for corporate payments, blending event-driven systems with rich client experiences on GCP.',
        highlights: [
            'Led development of Synthix, a global receivables SaaS platform, reducing manual payment processing by 40+ hours/week in settlement cycles.',
            'Designed and delivered an Entitlements System reducing user permission configuration time from 5 minutes to 10 seconds per user, significantly enhancing client onboarding.',
            'Integrated with NPCI NACH for mandate-based bulk collections, enabling reconciliation against invoice-based and scheduled payments.',
            'Delivered a real-time VPA lookup API integrating 10+ banks across India, enabling low-latency UPI payment workflows.',
            'Built a custom OAuth2.0 server for corporate API access, issuing access and refresh tokens with scope-based authorization.',
            'Secured public API products using mTLS with CN binding over GCP Load Balancing.',
            'Implemented Server-Sent Events in Go and TypeScript for real-time SEPA payment status updates, reducing client status polling by 10 calls/min per user.',
            'Integrated Strong Customer Authentication for SEPA Credit Transfer via Deutsche Bank\'s dbSecureAuthenticator mobile app.',
            'Containerized the full application stack using Docker Compose for integration testing, reducing environment setup from 2 hours to 5 minutes.',
            'Awarded the Gold Problem Solver Medal by the bank\'s leadership from among more than 2,000 employees in Corporate Banking Technology India.',
            'Won the Best Cash Management Solution by The Asset Triple A Treasurise Awards 2024.',
            'National finalist among 100 teams in Deutsche Bank Global Hackathon 2024.',
            'Winner of Hack2Protect MAY2023, Deutsche Bank\'s internal security hackathon with over 200 participants.',
        ],
        logo: 'https://img.logo.dev/db.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Deutsche Bank',
        role: 'Technology Analyst',
        location: 'Pune, India',
        start: 'Aug 2020',
        end: 'Feb 2023',
        summary:
            'Scaled digital channels for corporate banking and built contextual marketplaces for partner-led financial products.',
        highlights: [
            'Built a banking product marketplace enabling corporates to discover and subscribe to financial services, with a ReactJS portal served by a Go REST and gRPC microservices backend.',
            'Designed and built an incoming direct debit payments service managing customer mandates and routing payments through clearing-specific channels using Spring WebFlux.',
            'Developed client-facing Payment APIs covering India (NEFT, UPI), SEPA (Credit Transfer, Instant), UK (Fast Payments), Russia, and Indonesia.',
            'Built a Central Helpdesk Portal for managing onboarding, product subscription, and service request tickets using ReactJS and MUI.',
            'Implemented automated API test suites using Karate Framework across REST services.',
            'First runners-up out of 20 teams in Deutsche Bank\'s Global Blockchain Hackathon 2022.',
            'Global finalist of Deutsche Bank Global Hackathon 2022, spanning all global technology centers with over 300 participating teams.',
            'Winner of Hack2Protect DEC2022, Deutsche Bank\'s internal security hackathon with over 100 participants.',
        ],
        logo: 'https://img.logo.dev/db.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Fractal',
        role: 'Data Science Intern',
        location: 'Mumbai, India',
        start: 'Jan 2020',
        end: 'Jun 2020',
        summary: 'Accelerated invoice digitisation by pairing deep learning models with automation tooling.',
        highlights: [
            'Built an Invoice Digitisation system using Deep Learning and NLP to extract and reconcile invoice data, reducing processing time from 20+ man-hours/week to under 1 hour.',
            'Operationalised the pipeline with WorkFusion RPA and reconciliation against system MIS data.',
        ],
        logo: 'https://img.logo.dev/fractal.ai?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Xoriant',
        role: 'Big Data Intern',
        location: 'Pune, India',
        start: 'May 2018',
        end: 'Jun 2018',
        summary: 'Delivered Hive-backed ingestion services inside a Hadoop ecosystem.',
        highlights: [
            'Developed a generic Hive sink accessible via JDBC, enabling services to push batch data into HDFS.',
            'Worked with HDFS, Hive, and JDBC to build scalable data ingestion pipelines.',
        ],
        logo: 'https://img.logo.dev/xoriant.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
]
