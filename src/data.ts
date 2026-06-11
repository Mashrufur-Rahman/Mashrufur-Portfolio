import BuddyProgramme from './assets/images/buddy programme.jpg';
import IKnowGender from './assets/images/I Know Gender_Course certificate - I Know Gender An Introduction to Gender Equality for UN staff_page-0001.jpg';
import ProtectionHumanRights from './assets/images/Protection_and_promotion_of_human_rights_in_mental_health_and_psychosocial_support_in_emergencies-Course_Certificate_8728215_page-0001.jpg';
import IntroAdvocacy from './assets/images/Advocacy_Course certificate - Introduction to Advocacy_page-0001.jpg';
import DigitalSecurity from './assets/images/Digital Security and human rights amensty_page-0001.jpg';
import PrimaryHealthCare from './assets/images/The primary health care approach_page-0001.jpg';
import ResearchHealth from './assets/images/Reasearch health emergency and disasters_page-0001 (1).jpg';

import { Project, Education, Experience, Certification, Achievement, Volunteering, Skill } from './types';

export const EDUCATION_DATA: Education[] = [
  {
    id: 'edu-hshl',
    degree: 'Bachelor of Engineering (Electronic Engineering)',
    school: 'Hamm-Lippstadt University of Applied Sciences',
    location: 'Lippstadt, Germany',
    period: 'Sep 2024 – Present',
    details: 'Immersive focus on electronic engineering and automated systems. Gaining comprehensive skills in hardware design, digital circuit simulation, embedded systems, and laboratory instrumentation.',
    grade: 'Active Enrollment'
  },
  {
    id: 'edu-gub',
    degree: 'Bachelor of Computer Science & Engineering',
    school: 'Green University of Bangladesh',
    location: 'Bangladesh',
    period: '2022 – 2024',
    details: 'Completed core software development track. Built a rigorous foundation in software architectures, database systems, object-oriented paradigms, and system analysis.',
    credits: '79 ECTS Completed',
    grade: 'CGPA 3.60'
  },
  {
    id: 'edu-hsc',
    degree: 'Higher Secondary Certificate (Science)',
    school: 'Dr. Mahbubur Rahman Mollah College',
    location: 'Bangladesh',
    period: 'Graduated 2021',
    details: 'Rigorous training in advanced physics, chemistry, and higher level mathematics.',
    grade: 'GPA 5.00 out of 5.00 (A+)'
  },
  {
    id: 'edu-ssc',
    degree: 'Secondary School Certificate (Science)',
    school: 'Shanarpar Sheikh Mortaza Ali High School',
    location: 'Bangladesh',
    period: 'Graduated 2018',
    details: 'Foundation in science, computing essentials, and mathematics.',
    grade: 'GPA 5.00 out of 5.00 (A+)'
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-fabrics',
    role: 'Assistant Manager',
    company: 'Rimon Fabrics',
    period: 'Feb 2023 – Nov 2024',
    location: 'Bangladesh',
    bullets: [
      'Managed outlet operations and audited thousands of displays and fabric rolls daily to ensure perfect product presentation.',
      'Supervised and mentored on-floor sales staff, optimizing shift schedules and customer support operations.',
      'Audited daily sales history records and compiled direct operational reports for corporate executives.'
    ]
  },
  {
    id: 'exp-school',
    role: 'Teacher',
    company: 'Boxnagar Pre-Cadet High School',
    period: 'Jan 2021 – Dec 2022',
    location: 'Bangladesh',
    bullets: [
      'Delivered General Science curriculums to 9th-grade students, creating engaging interactive experiments.',
      'Acted as course advisor assisting incoming high schoolers with track selections and academic goals.',
      'Supervised complete virtual classroom platforms, handling remote academic delivery systems.'
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-spotify',
    title: 'Spotify Clone',
    tech: ['HTML', 'CSS', 'JavaScript'],
    summary: 'A fully responsive reproduction of the core Spotify music player, featuring custom client-side audio management, dynamic playlists, and sleek visuals.',
    details: [
      'Created a highly responsive grid layout mimicking Spotify\'s exact interface rules.',
      'Designed a modern persistent player bar with audio scrubbers, volume controls, and track detail tooltips.',
      'Developed native vanilla JS audio listeners to handle play state, track skipping, and local queue management.'
    ],
    image: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Mashrufur-Rahman',
    category: 'software'
  },
  {
    id: 'proj-airline',
    title: 'Airline Management System',
    tech: ['Java', 'SQL', 'OOP Design'],
    summary: 'A modular backend and interface orchestration system built to automate flight schedules, crew assignments, booking lines, and passenger profiles.',
    details: [
      'Engineered a thread-safe appointment booking pipeline following robust procedural rules.',
      'Utilized rich relational structures to model flight capacities, boarding statuses, and airport constraints.',
      'Structured using strict MVC patterns to divide user visualization from persistent database storage.'
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Mashrufur-Rahman',
    category: 'software'
  },
  {
    id: 'proj-water',
    title: 'Water Level Indicator',
    tech: ['Electronics', 'Circuit Design', 'Logic Gates'],
    summary: 'An autonomous digital electronics diagnostic circuit styled to sense, monitor, and print tank measurements onto a physical seven-segment visualizer.',
    details: [
      'Engineered multi-level transistor sensor connections displaying live depth diagnostics.',
      'Integrated logic decoding chips mapping liquid volume onto a numeric display array.',
      'Incorporated emergency alert systems with low-power circuit layouts suitable for agricultural tanks.'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Mashrufur-Rahman',
    category: 'electronics'
  },
  {
    id: 'proj-fff',
    title: 'Fastest Finger First Quiz System',
    tech: ['Digital Electronics', 'IC Gates', 'Latching'],
    summary: 'A high-speed contestant lockout circuit framework built for competitive gamified quiz systems.',
    details: [
      'Engineered electronic latch connections providing instant microsecond contestant signal captures.',
      'Constructed priority encoder gates ensuring absolute lockouts on secondary buzzers prior to reset commands.',
      'Assembled debugging dashboards featuring clear multi-colored status status LEDs and audio beepers.'
    ],
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Mashrufur-Rahman',
    category: 'electronics'
  },
  {
    id: 'proj-duplex',
    title: 'Duplex Home Design',
    tech: ['AutoCAD', 'Structural Engineering', '3D Modeling'],
    summary: 'An architectural blueprint and detailed electrical/space planning model of a contemporary high-end luxury duplex dwelling.',
    details: [
      'Engineered high-contrast architectural floor layouts with structural scale factors.',
      'Plotted advanced functional routing grids detailing AC distribution lines and wiring runs.',
      'Rendered isometric photorealistic modern interior/exterior visualisations for technical review.'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/Mashrufur-Rahman',
    category: 'design'
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-buddy',
    title: 'International Buddy Programme Mentor Certificate',
    issuer: 'HSHL Lippstadt Campus, Germany',
    date: 'Aug 2025',
    description: 'Official volunteer appreciation scroll issued by the university for outstanding mentorship and intercultural care of international bachelor and master entrants.',
    image: BuddyProgramme,
    category: 'volunteering',
    badge: 'Mentoring',
    summary: 'Recognized for outstanding mentorship and intercultural support for international newcomers.'
  },
  {
    id: 'cert-unwomen-gender',
    title: 'I Know Gender: An Introduction to Gender Equality for UN Staff',
    issuer: 'UN Women',
    date: 'Mar 2025',
    description: 'In-depth review of global gender equality strategies, gender mainstreaming in humanitarian actions, women empowerment targets, and inclusive policy frameworks aligned with UN sustainability modules.',
    image: IKnowGender,
    category: 'volunteering',
    badge: 'International Engagement',
    summary: 'Verified competency in gender-responsive policy-making, human rights-driven development, and inclusivity models.',
   
  },
  {
    id: 'cert-who-mental-health',
    title: 'Protection and Promotion of Human Rights in Mental Health and Psychosocial Support in Emergencies',
    issuer: 'World Health Organization (WHO)',
    date: 'Feb 2025',
    description: 'Verified professional knowledge on applying international human rights standards, defending basic dignity, establishing non-coercive setups, and structuring mental wellness protocols in active emergency or humanitarian disaster zones.',
    image: ProtectionHumanRights,
    category: 'volunteering',
    badge: 'Community Impact',
    summary: 'Certified in integrating human rights safeguards into psychosocial support programs in crises.'
  },
  {
    id: 'cert-savethechildren-advocacy',
    title: 'Introduction to Advocacy',
    issuer: 'Save the Children',
    date: 'Jan 2025',
    description: 'Focused on strategic campaign orchestration, lobbying mechanisms, stakeholder mapping, and policy risk assessments designed to advance structural reforms regarding child protection, health, and education.',
    image: IntroAdvocacy,
    category: 'volunteering',
    badge: 'Leadership',
    summary: 'Awarded for mastering child rights advocacy, strategic public campaigns, and stakeholder management.'
  },
  {
    id: 'cert-school',
    title: 'Voluntary Educator Attestation',
    issuer: 'Home School Initiative',
    date: 'Jan 2025',
    description: 'Honored for delivering math, literacy, and general computing science instruction to underprivileged underrepresented kids in city outskirts.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    category: 'volunteering',
    badge: 'Student Support',
    summary: 'Honored for volunteering to design and teach core curriculum to underserved children.'
  },
  {
    id: 'cert-amnesty-digital-security',
    title: 'Digital Security and Human Rights',
    issuer: 'Amnesty International',
    date: 'Dec 2024',
    description: 'Crucial learning on operational safety online, end-to-end encryption frameworks, secure metadata structures, protecting identity, and malware defenses needed to shield human rights defenders from hostile digital surveillance.',
    image: DigitalSecurity,
    category: 'volunteering',
    badge: 'Social Contribution',
    summary: 'Verified understanding of safe cyber-operations, risk mitigation, and technical digital self-defense.'
  },
  {
    id: 'cert-who-primary-health',
    title: 'The Primary Health Care Approach',
    issuer: 'World Health Organization (WHO)',
    date: 'Jun 2024',
    description: 'In-depth conceptual study of universal health coverage frameworks, socio-economic factors in preventative medicine, integrated community-centric health systems, and localized health policy planning.',
    image: PrimaryHealthCare,
    category: 'volunteering',
    badge: 'Volunteer',
    summary: 'Verified mastery of universal healthcare concepts, preventive system strategies, and local outreach.'
  },
  {
    id: 'cert-who-health-emergencies-research',
    title: 'Research in Health Emergencies and Disasters',
    issuer: 'World Health Organization (WHO)',
    date: 'May 2024',
    description: 'Mastered strict ethical rules, rapid epidemiological surveillance techniques, data security regulations, and operational health research design applied within disease outbreaks and natural disaster regions.',
    image: ResearchHealth,
    category: 'volunteering',
    badge: 'Volunteer',
    summary: 'Trained in health research design, emergency epidemiologic surveillance, and disaster ethics.'
  },
  {
    id: 'cert-blood',
    title: 'Humanitarian Leadership Certificate',
    issuer: 'Bangladesh Blood Club',
    date: 'Mar 2024',
    description: 'Appreciation of coordination contributions for recruiting donors, organizing cross-district blood schedules, and building immediate response donor hotlines.',
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=800&q=80',
    category: 'leadership',
    badge: 'Leadership',
    summary: 'Recognized for excellent coordination of donor mobilization networks and blood drives.'
  },
  {
    id: 'cert-circuit',
    title: 'Circuit Simulation Onramp',
    issuer: 'MATLAB Academy - MathWorks',
    date: 'Dec 2023',
    description: 'Designed, modeled, and simulated operational electronic systems using advanced transient, AC/DC parameters, and gate validations inside integrated circuits.',
    image: 'https://images.unsplash.com/photo-1631553127989-5f6afec2007e?auto=format&fit=crop&w=800&q=80',
    category: 'engineering',
    badge: 'Engineering',
    summary: 'Acquired hands-on competencies in simulating integrated circuits and transient systems.'
  },
  {
    id: 'cert-simulink',
    title: 'Simulink Onramp',
    issuer: 'MATLAB Academy - MathWorks',
    date: 'Nov 2023',
    description: 'Acquired core competencies in model-based design, creating block diagram schematics, executing system simulations, and optimizing dynamic parameters.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    category: 'engineering',
    badge: 'Engineering',
    summary: 'Certified in complex model-based layout systems, loop validations, and feedback designs.'
  },
  {
    id: 'cert-ml',
    title: 'Machine Learning Onramp',
    issuer: 'MATLAB Academy - MathWorks',
    date: 'Oct 2023',
    description: 'Practical training on the basics of machine learning, preprocessing features, importing data, training classifiers, and validating model predictions.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    category: 'ai_ml',
    badge: 'Technical',
    summary: 'Mastered mathematical concepts for model fitting and training estimators inside MATLAB.'
  },
  {
    id: 'cert-vc-award',
    title: 'Vice Chancellor Honor Accord',
    issuer: 'Green University of Bangladesh',
    date: '2023',
    description: 'Distinguished honor roll for maintaining an exceptional academic record of CGPA 3.60 and leading software development track assignments.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'awards',
    badge: 'Academic',
    summary: 'Granted high ranking roll honors for superior academic outcomes and software development.'
  },
  {
    id: 'cert-ielts',
    title: 'English Academic Language Verification',
    issuer: 'British Council / IELTS',
    date: '2023',
    description: 'Internationally recognized language standard certifying an overall score of 6.5 band, validating fluent academic reporting and professional presentation capability.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    category: 'language',
    badge: 'Language',
    summary: 'Standardized assessment certifying professional level language and presentation skills.'
  },
  {
    id: 'cert-ai-ess',
    title: 'AI Essentials: Introduction to Artificial Intelligence',
    issuer: 'Udemy',
    date: 'Jun 2023',
    description: 'Conceptual framework for machine intelligence, weights networks, expert systems, and applications of autonomous algorithms.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    category: 'ai_ml',
    badge: 'Technical',
    summary: 'Acquired foundation paradigms of classification neural connections and expert systems.'
  },
  {
    id: 'cert-python',
    title: 'Learn to Code in Python',
    issuer: 'Udemy',
    date: 'May 2023',
    description: 'Thorough programming foundation training ranging from fundamentals, variables, and arrays to object-oriented programming and debugging tools.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    category: 'technical',
    badge: 'Technical',
    summary: 'Achieved proficiency in procedural concepts, OOP standards, and modular formatting.'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-vc',
    title: 'Vice Chancellor Award',
    description: 'Awarded by Green University of Bangladesh for exceptional academic feats, continuous intellectual focus, and commitment to scholar excellence.',
    badge: '★ Academic Excellence'
  },
  {
    id: 'ach-ielts',
    title: 'IELTS Standardized Score',
    description: 'Achieved an Overall Band score of 6.5, demonstrating proficient professional and global technical English capabilities.',
    badge: 'Band 6.5 (2025)'
  },
  {
    id: 'ach-duolingo',
    title: 'Duolingo English Test',
    description: 'Scored an Overall score of 125, confirming stellar communication, active synthesis, and fluent structural alignment.',
    badge: '125 (2023)'
  }
];

export const VOLUNTEERING_DATA: Volunteering[] = [
  {
    id: 'vol-buddy',
    role: 'Coordinator / Mentor',
    organization: 'International Buddy Programme',
    period: 'Aug 2025 – Present',
    description: 'Supporting incoming international students in Lippstadt as they acclimate to academic frameworks, cultural pathways, and local guidelines. Accelerating social and practical integrations.'
  },
  {
    id: 'vol-blood',
    role: 'Humanitarian Organizer',
    organization: 'Blood Club',
    period: '2022 – 2025',
    description: 'Devised university-wide blood donation schedules, coordinated local clinical donor networks, and successfully mobilized life-saving campaigns.'
  },
  {
    id: 'vol-school',
    role: 'Lead Academic Mentor & Educator',
    organization: 'Home School Initiative',
    period: '2023 – 2025',
    description: 'Taught underprivileged children in the Jatrabari area. Assembled systematic basic literacy and math frameworks for 13 consistent learners, lifting them into formal public school registers.'
  }
];

export const SKILLS_DATA: Skill[] = [
  // Programming
  { name: 'Java', category: 'programming', level: 88 },
  { name: 'Python', category: 'programming', level: 90 },
  { name: 'JavaScript', category: 'programming', level: 85 },
  { name: 'C', category: 'programming', level: 75 },
  { name: 'SQL', category: 'programming', level: 80 },

  // Web
  { name: 'HTML5', category: 'web', level: 92 },
  { name: 'CSS3', category: 'web', level: 88 },
  { name: 'Tailwind CSS', category: 'web', level: 86 },

  // Engineering
  { name: 'MATLAB', category: 'engineering', level: 82 },
  { name: 'Simulink', category: 'engineering', level: 80 },
  { name: 'Circuit Simulation', category: 'engineering', level: 85 },
  { name: 'AutoCAD', category: 'engineering', level: 78 },

  // Core Concepts
  { name: 'OOP', category: 'core', level: 90 },
  { name: 'Data Structures', category: 'core', level: 84 },
  { name: 'Algorithms', category: 'core', level: 82 },
  { name: 'Digital Logic Gates', category: 'core', level: 88 },

  // Professional
  { name: 'Leadership', category: 'professional', level: 90 },
  { name: 'Communication', category: 'professional', level: 92 },
  { name: 'Project Management', category: 'professional', level: 85 },
  { name: 'Intercultural Collaboration', category: 'professional', level: 94 }
];

export const LANGUAGES = [
  { name: 'Bengali', level: 'Native / Mother Tongue' },
  { name: 'English', level: 'Fluent / Professional (IELTS 6.5)' },
  { name: 'Hindi', level: 'Spoken / Conversational' },
  { name: 'German', level: 'Basic A1 Level' }
];
