import { TECHNOLOGIES as T } from './technologies';

// key: translation key under skills:categories
export interface SkillCategory {
  key: 'coreJava' | 'enterprise' | 'databases' | 'devops' | 'webTech' | 'domain';
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'coreJava',
    items: [T.JAVA_21_25, T.SPRING_FRAMEWORK, T.SPRING_BOOT, T.HIBERNATE_JPA, T.MAVEN_GRADLE, T.JUNIT_TESTNG]
  },
  {
    key: 'enterprise',
    items: [T.MICROSERVICES, T.REST_APIS, T.DESIGN_PATTERNS, T.SYSTEM_ARCHITECTURE, T.B2B_INTEGRATIONS, T.EVENT_DRIVEN_ARCHITECTURE]
  },
  {
    key: 'databases',
    items: [T.POSTGRESQL, T.MYSQL, T.ORACLE, T.MONGODB, T.REDIS, T.DATABASE_DESIGN]
  },
  {
    key: 'devops',
    items: [T.GIT, T.AWS, T.KUBERNETES, T.JENKINS_CI_CD, T.DOCKER, T.INTELLIJ_ECLIPSE]
  },
  {
    key: 'webTech',
    items: [T.HTML5_CSS3, T.JAVASCRIPT, T.ANGULAR_REACT, T.TYPESCRIPT, T.BOOTSTRAP, T.REST_SOAP]
  },
  {
    key: 'domain',
    items: [T.INSURANCE_SYSTEMS, T.TRAVEL_PLATFORMS, T.FINANCIAL_SERVICES, T.INTERNATIONAL_PROJECTS, T.B2B_PLATFORMS, T.ENTERPRISE_SOLUTIONS]
  }
];
