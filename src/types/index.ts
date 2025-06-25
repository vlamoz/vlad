export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  period: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  technologies?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}