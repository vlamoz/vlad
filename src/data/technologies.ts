// Shared technology definitions to ensure consistency across components
export const TECHNOLOGIES = {
  // Core Java
  JAVA: 'Java',
  JAVA_8_11_17_21: 'Java (8, 11, 17, 21+)',
  SPRING_BOOT: 'Spring Boot',
  SPRING_FRAMEWORK: 'Spring Framework',
  SPRING: 'Spring',
  HIBERNATE_JPA: 'Hibernate/JPA',
  MAVEN_GRADLE: 'Maven/Gradle',
  JUNIT_TESTNG: 'JUnit/TestNG',

  // Architecture & Enterprise
  MICROSERVICES: 'Microservices',
  REST_APIS: 'RESTful APIs',
  REST_SOAP: 'REST/SOAP',
  SOAP_REST: 'SOAP/REST APIs',
  DESIGN_PATTERNS: 'Design Patterns',
  SYSTEM_ARCHITECTURE: 'System Architecture',
  B2B_INTEGRATIONS: 'B2B Integrations',
  EVENT_DRIVEN_ARCHITECTURE: 'Event-Driven Architecture',
  ENTERPRISE_INTEGRATION: 'Enterprise Integration',
  ENTERPRISE_SECURITY: 'Enterprise Security',
  GOVERNMENT_STANDARDS: 'Government Standards',
  GOVERNMENT_SYSTEMS: 'Government Systems',

  // Databases
  POSTGRESQL: 'PostgreSQL',
  MYSQL: 'MySQL',
  ORACLE: 'Oracle',
  MONGODB: 'MongoDB',
  REDIS: 'Redis',
  DATABASE_DESIGN: 'Database Design',

  // DevOps & Tools
  GIT: 'Git',
  AWS: 'AWS',
  KUBERNETES: 'Kubernetes',
  JENKINS_CI_CD: 'Jenkins/CI/CD',
  DOCKER: 'Docker',
  INTELLIJ_ECLIPSE: 'IntelliJ IDEA/Eclipse',

  // Web Technologies
  HTML5_CSS3: 'HTML5/CSS3',
  JAVASCRIPT: 'JavaScript',
  ANGULAR_REACT: 'Angular/React',
  REACT: 'React',
  TYPESCRIPT: 'TypeScript',
  BOOTSTRAP: 'Bootstrap',

  // Specialized
  AI_ML_INTEGRATION: 'AI/ML Integration',
  AI_ML_APIS: 'AI/ML APIs',
  CLOUD_ARCHITECTURE: 'Cloud Architecture',
  REAL_TIME_AUDIO_VIDEO: 'Real time audio/video',
  WEBRTC: 'WebRTC',
  RABBITMQ: 'RabbitMQ',
  IBM_MQ: 'IBM MQ',
  MESSAGE_QUEUING: 'Message Queuing',
  FINANCIAL_APIS: 'Financial APIs',
  DATA_PROCESSING: 'Data Processing',
  UI_MODERNIZATION: 'UI Modernization',
  XML_JSON: 'XML/JSON',

  // Domain Expertise
  INSURANCE_SYSTEMS: 'Insurance Systems',
  TRAVEL_PLATFORMS: 'Travel Platforms',
  FINANCIAL_SERVICES: 'Financial Services',
  INTERNATIONAL_PROJECTS: 'International Projects',
  B2B_PLATFORMS: 'B2B Platforms',
  ENTERPRISE_SOLUTIONS: 'Enterprise Solutions'
} as const;

// Type for technology values
export type Technology = typeof TECHNOLOGIES[keyof typeof TECHNOLOGIES];