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
            'Building secure wealth management and portfolio technology at MSCI, spanning privacy-preserving data flows, portfolio optimization, distributed workflows, cloud infrastructure, and AI-assisted developer tooling.',
        highlights: [
            'Developing a PII tokenization and protection flow for a Japan-based securities client serving 5,000+ users and 5M+ accounts and portfolios. Integrating with the client’s master data service over Server-Sent Events (SSE) to resolve tokens for authorized data display and validate and tokenize user actions before persistence, keeping raw PII out of the product database.',
            'Designing end-to-end data flows between the wealth management platform and the client’s master data service, separating tokenized identifiers used within the application from sensitive source data managed by the client.',
            'Built backend workflows for asset allocation and portfolio rebalancing in MSCI Wealth Manager, integrating with MSCI Quantitative Investment Solutions for returns analysis and tax optimization.',
            'Engineered concurrent bulk portfolio rebalancing workflows using Server-Sent Events, supporting 70+ simultaneous rebalances with real-time per-portfolio execution status and failure reporting.',
            'Implemented role-based access control for 300+ users across 5+ client organizations, enabling organization administrators to manage permissions and workflow-level access.',
            'Built reusable Terraform modules for provisioning and managing two isolated GCP environments, reducing environment setup from days to under an hour through consistent, repeatable deployments.',
            'Implemented a configurable multi-endpoint OpenTelemetry pipeline exporting telemetry to GCP and internal Grafana, enabling new telemetry sinks without application-code changes.',
            'Reduced Amplitude analytics spend from $2,000+/month to under $600/month by caching user identity in Redux and local storage and resuming sessions through a persistent identifier instead of repeatedly pushing login events.',
            'Built an MCP-based developer automation server integrated with Claude Code, Cursor, and OpenAI Codex, enabling AI agents to execute development workflows covering tests, database migrations, linting, type checking, and code formatting.',
            'Instrumented frontend interactions with structured Amplitude events containing user actions, resource identifiers, and workflow outcomes to improve product analytics.',
            'Orchestrated MSCI index data ingestion through Redpanda Kafka using declarative YAML pipelines, enabling structured streaming into portfolio computation tables.',
            'Served as Forward Deployed Engineer for APAC and AMER clients across Singapore, Hong Kong, and the US, working directly with clients and coverage teams to identify product gaps and translate business requirements into engineering solutions.',
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
            'Led engineering for Synthix, a global receivables SaaS platform for corporate banking, delivering payment APIs, entitlement management, event-driven workflows, and secure integrations across financial systems.',
        highlights: [
            'Led development of Synthix, a global receivables SaaS platform for corporate payments, reducing manual payment processing effort by 40+ hours per week during settlement cycles.',
            'Designed and delivered an entitlement management system that reduced user permission configuration time from 5 minutes to 10 seconds, streamlining corporate client onboarding.',
            'Built distributed backend services using Go, Java, Spring Boot, REST, and gRPC, supporting event-driven workflows across GCP-hosted financial applications.',
            'Integrated NPCI NACH for mandate-based bulk collections, enabling reconciliation against invoice-based and scheduled payments.',
            'Delivered a real-time VPA lookup API integrating with 10+ banks across India to support low-latency UPI payment workflows.',
            'Built a custom OAuth 2.0 authorization server for corporate API access, issuing access and refresh tokens with scope-based authorization.',
            'Secured public API products using mutual TLS (mTLS) with certificate common-name binding at GCP Load Balancing.',
            'Implemented Server-Sent Events in Go and TypeScript for real-time SEPA payment status updates, reducing client-side polling by 10 calls per minute per user.',
            'Integrated Strong Customer Authentication for SEPA Credit Transfers through Deutsche Bank’s dbSecureAuthenticator mobile application.',
            'Containerized the application stack using Docker Compose for integration testing, reducing development environment setup from 2 hours to 5 minutes.',
            'Received the Gold Problem Solver Medal from bank leadership, selected from more than 2,000 employees in Corporate Banking Technology India.',
            'Contributed to Synthix receiving The Asset Triple A Treasurise Award 2024 for Best Cash Management Solution.',
            'Reached the national finals among 100 teams in Deutsche Bank Global Hackathon 2024.',
            'Won Hack2Protect May 2023, Deutsche Bank’s internal security hackathon with over 200 participants.',
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
            'Developed corporate banking platforms and cross-border payment services, combining Java and Go microservices with React-based applications and clearing-network integrations.',
        highlights: [
            'Built a banking product marketplace enabling corporate clients to discover and subscribe to financial services through a ReactJS portal backed by Go REST and gRPC microservices.',
            'Designed and developed an incoming direct debit payments service to manage customer mandates and route payments through clearing-specific channels using Spring WebFlux.',
            'Developed client-facing payment APIs across India (NEFT and UPI), SEPA (Credit Transfer and Instant), the UK (Faster Payments), Russia, and Indonesia.',
            'Built a Central Helpdesk Portal for managing client onboarding, product subscriptions, and service request tickets using ReactJS and Material UI.',
            'Designed microservices with gRPC-based inter-service communication for distributed banking and payment workflows.',
            'Implemented automated REST API test suites using the Karate Framework.',
            'Secured first runners-up among 20 teams in Deutsche Bank Global Blockchain Hackathon 2022.',
            'Reached the global finals of Deutsche Bank Global Hackathon 2022, competing among more than 300 teams across global technology centers.',
            'Won Hack2Protect December 2022, Deutsche Bank’s internal security hackathon with over 100 participants.',
        ],
        logo: 'https://img.logo.dev/db.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Fractal',
        role: 'Data Science Intern',
        location: 'Mumbai, India',
        start: 'Jan 2020',
        end: 'Jun 2020',
        summary:
            'Automated invoice digitization and reconciliation by combining deep learning, natural language processing, and robotic process automation.',
        highlights: [
            'Built an invoice digitization system using deep learning and NLP to extract and reconcile invoice data, reducing processing time from 20+ person-hours per week to under one hour.',
            'Operationalized the pipeline using WorkFusion RPA and reconciliation against system MIS data.',
        ],
        logo: 'https://img.logo.dev/fractal.ai?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
    {
        company: 'Xoriant',
        role: 'Big Data Intern',
        location: 'Pune, India',
        start: 'May 2018',
        end: 'Jun 2018',
        summary:
            'Developed data ingestion components for Hadoop-based data platforms using Hive and JDBC.',
        highlights: [
            'Developed a generic Hive sink accessible through JDBC, enabling services to write batch data into HDFS.',
            'Worked with HDFS, Hive, and JDBC to build reusable data ingestion pipelines.',
        ],
        logo: 'https://img.logo.dev/xoriant.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg',
    },
]