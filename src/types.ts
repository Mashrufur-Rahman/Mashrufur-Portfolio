export interface Project {
  id: string;
  title: string;
  tech: string[];
  summary: string;
  details: string[];
  image: string;
  github: string;
  demo?: string;
  category: 'software' | 'electronics' | 'design';
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  details: string;
  grade?: string;
  credits?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  category: 'technical' | 'ai_ml' | 'engineering' | 'volunteering' | 'leadership' | 'awards' | 'language';
  link?: string;
  badge?: string;
  summary?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Volunteering {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'programming' | 'web' | 'engineering' | 'core' | 'professional';
  level: number; // 0-100 indicating confidence
}
