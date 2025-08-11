import { Question } from '@/types/assessment'

export const assessmentQuestions: Question[] = [
  // Psychometric - Interest Scale
  {
    id: 'psych_interest_1',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find it fascinating to understand why customers behave the way they do.',
    type: 'likert',
    weight: 1.2
  },
  {
    id: 'psych_interest_2', 
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy analyzing patterns in data to discover insights.',
    type: 'likert',
    weight: 1.1
  },
  {
    id: 'psych_interest_3',
    category: 'psychometric', 
    subcategory: 'interest',
    question: 'I would be excited to present data findings to business stakeholders.',
    type: 'likert',
    weight: 1.0
  },

  // Psychometric - Personality Compatibility
  {
    id: 'psych_personality_1',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer structured, step-by-step approaches to solving problems.',
    type: 'likert',
    weight: 1.0
  },
  {
    id: 'psych_personality_2',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I am naturally curious and like to ask "why" questions.',
    type: 'likert',
    weight: 1.1
  },
  {
    id: 'psych_personality_3',
    category: 'psychometric',
    subcategory: 'personality', 
    question: 'I pay close attention to details and accuracy in my work.',
    type: 'likert',
    weight: 1.2
  },

  // Technical Aptitude - General
  {
    id: 'tech_general_1',
    category: 'technical',
    subcategory: 'general_aptitude',
    question: 'If a survey of 1000 customers shows 65% satisfaction, approximately how many customers were satisfied?',
    type: 'multiple_choice',
    options: ['550', '650', '750', '850'],
    weight: 1.0
  },
  {
    id: 'tech_general_2',
    category: 'technical',
    subcategory: 'general_aptitude',
    question: 'What does it mean when we say data shows a "correlation" between two variables?',
    type: 'multiple_choice',
    options: [
      'One causes the other',
      'They tend to change together',
      'They are exactly the same',
      'They are completely unrelated'
    ],
    weight: 1.1
  },

  // Technical - Domain Specific
  {
    id: 'tech_domain_1',
    category: 'technical',
    subcategory: 'domain_knowledge',
    question: 'What is an NPS (Net Promoter Score)?',
    type: 'multiple_choice',
    options: [
      'A measure of customer loyalty and satisfaction',
      'A sales performance metric',
      'A website traffic measurement',
      'A social media engagement score'
    ],
    weight: 1.2
  },
  {
    id: 'tech_domain_2',
    category: 'technical',
    subcategory: 'domain_knowledge',
    question: 'What is the main difference between qualitative and quantitative data?',
    type: 'multiple_choice',
    options: [
      'Qualitative is numerical, quantitative is descriptive',
      'Qualitative is descriptive, quantitative is numerical', 
      'There is no difference',
      'Qualitative is more reliable than quantitative'
    ],
    weight: 1.1
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am highly motivated to develop skills in data analysis and customer research.',
    type: 'likert',
    weight: 1.2
  },
  {
    id: 'wiscar_will_2',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I would be willing to spend evenings and weekends learning new analytics tools.',
    type: 'likert',
    weight: 1.0
  },
  {
    id: 'wiscar_interest_1',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I enjoy exploring consumer psychology and behavioral economics.',
    type: 'likert',
    weight: 1.1
  },
  {
    id: 'wiscar_skill_1',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I am comfortable using Excel or Google Sheets for data analysis.',
    type: 'likert',
    weight: 1.0
  },
  {
    id: 'wiscar_cognitive_1',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'I can easily spot trends and patterns in data or information.',
    type: 'likert',
    weight: 1.1
  },
  {
    id: 'wiscar_learning_1',
    category: 'wiscar',
    subcategory: 'ability_to_learn',
    question: 'I learn new software and tools quickly and enjoy the challenge.',
    type: 'likert',
    weight: 1.0
  },
  {
    id: 'wiscar_realworld_1',
    category: 'wiscar',
    subcategory: 'real_world',
    question: 'How important is understanding customer behavior for business success?',
    type: 'multiple_choice',
    options: [
      'Extremely important - it drives all key business decisions',
      'Very important - it influences many decisions',
      'Moderately important - useful but not critical',
      'Not very important - businesses can succeed without it'
    ],
    weight: 1.1
  }
]

export const likertScale = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
]