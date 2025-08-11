export interface Question {
  id: string
  category: 'psychometric' | 'technical' | 'wiscar'
  subcategory: string
  question: string
  type: 'likert' | 'multiple_choice' | 'scenario'
  options?: string[]
  weight: number
}

export interface UserResponse {
  questionId: string
  answer: number | string
  timestamp: Date
}

export interface AssessmentScores {
  psychometric: number
  technical: number
  wiscar: {
    will: number
    interest: number
    skill: number
    cognitive: number
    ability_to_learn: number
    real_world: number
  }
  overall: number
}

export interface AssessmentResult {
  scores: AssessmentScores
  recommendation: 'yes' | 'maybe' | 'no'
  confidence: number
  feedback: string
  careerPaths: string[]
  nextSteps: string[]
  skillGaps: Array<{
    skill: string
    importance: 'High' | 'Medium' | 'Low'
    readiness: 'High' | 'Moderate' | 'Low'
  }>
}