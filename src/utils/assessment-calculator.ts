import { UserResponse, AssessmentResult, AssessmentScores } from '@/types/assessment'
import { assessmentQuestions } from '@/data/questions'

export function calculateResults(responses: UserResponse[]): AssessmentResult {
  // Create a map for quick lookup of responses by question ID
  const responseMap = new Map(responses.map(r => [r.questionId, r]))
  
  // Initialize scores
  let psychometricTotal = 0
  let psychometricWeight = 0
  let technicalTotal = 0
  let technicalWeight = 0
  
  let wiscarScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability_to_learn: 0,
    real_world: 0
  }
  let wiscarWeights = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability_to_learn: 0,
    real_world: 0
  }

  // Calculate scores for each question
  assessmentQuestions.forEach(question => {
    const response = responseMap.get(question.id)
    if (!response) return

    let score = 0
    
    if (question.type === 'likert') {
      // Likert scale: 1-5, normalize to 0-100
      score = ((Number(response.answer) - 1) / 4) * 100
    } else if (question.type === 'multiple_choice') {
      // Multiple choice: award points based on correct answers
      score = getMultipleChoiceScore(question.id, response.answer as string)
    }

    // Apply weight
    const weightedScore = score * question.weight

    // Categorize scores
    if (question.category === 'psychometric') {
      psychometricTotal += weightedScore
      psychometricWeight += question.weight
    } else if (question.category === 'technical') {
      technicalTotal += weightedScore
      technicalWeight += question.weight
    } else if (question.category === 'wiscar') {
      const subcategory = question.subcategory as keyof typeof wiscarScores
      if (subcategory in wiscarScores) {
        wiscarScores[subcategory] += weightedScore
        wiscarWeights[subcategory] += question.weight
      }
    }
  })

  // Calculate final scores
  const psychometricScore = psychometricWeight > 0 ? Math.round(psychometricTotal / psychometricWeight) : 0
  const technicalScore = technicalWeight > 0 ? Math.round(technicalTotal / technicalWeight) : 0
  
  // Calculate WISCAR scores
  Object.keys(wiscarScores).forEach(key => {
    const k = key as keyof typeof wiscarScores
    wiscarScores[k] = wiscarWeights[k] > 0 ? Math.round(wiscarScores[k] / wiscarWeights[k]) : 0
  })

  // Calculate overall score
  const overallScore = Math.round((psychometricScore + technicalScore + 
    Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3)

  const scores: AssessmentScores = {
    psychometric: psychometricScore,
    technical: technicalScore,
    wiscar: wiscarScores,
    overall: overallScore
  }

  // Generate recommendation
  const recommendation = getRecommendation(scores)
  const confidence = getConfidence(scores)
  const feedback = generateFeedback(scores, recommendation)
  const careerPaths = getCareerPaths(scores)
  const nextSteps = getNextSteps(scores, recommendation)
  const skillGaps = getSkillGaps(scores)

  return {
    scores,
    recommendation,
    confidence,
    feedback,
    careerPaths,
    nextSteps,
    skillGaps
  }
}

function getMultipleChoiceScore(questionId: string, answer: string): number {
  // Define correct answers and scoring logic
  const correctAnswers: { [key: string]: string } = {
    'tech_general_1': '650',
    'tech_general_2': 'They tend to change together',
    'tech_domain_1': 'A measure of customer loyalty and satisfaction',
    'tech_domain_2': 'Qualitative is descriptive, quantitative is numerical',
    'wiscar_realworld_1': 'Extremely important - it drives all key business decisions'
  }

  const partialCredit: { [key: string]: { [answer: string]: number } } = {
    'wiscar_realworld_1': {
      'Extremely important - it drives all key business decisions': 100,
      'Very important - it influences many decisions': 75,
      'Moderately important - useful but not critical': 50,
      'Not very important - businesses can succeed without it': 25
    }
  }

  if (partialCredit[questionId] && partialCredit[questionId][answer] !== undefined) {
    return partialCredit[questionId][answer]
  }

  return correctAnswers[questionId] === answer ? 100 : 0
}

function getRecommendation(scores: AssessmentScores): 'yes' | 'maybe' | 'no' {
  const { overall, psychometric, technical } = scores
  
  if (overall >= 75 && psychometric >= 70 && technical >= 60) {
    return 'yes'
  } else if (overall >= 60 && (psychometric >= 60 || technical >= 50)) {
    return 'maybe'
  } else {
    return 'no'
  }
}

function getConfidence(scores: AssessmentScores): number {
  const { overall, psychometric, technical } = scores
  const wiscarAvg = Object.values(scores.wiscar).reduce((sum, score) => sum + score, 0) / 6
  
  // Calculate variance between different score components
  const scoreArray = [psychometric, technical, wiscarAvg]
  const mean = scoreArray.reduce((sum, score) => sum + score, 0) / scoreArray.length
  const variance = scoreArray.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scoreArray.length
  
  // Lower variance = higher confidence, high overall score = higher confidence
  const varianceConfidence = Math.max(0, 100 - variance * 2)
  const overallConfidence = overall
  
  return Math.round((varianceConfidence + overallConfidence) / 2)
}

function generateFeedback(scores: AssessmentScores, recommendation: 'yes' | 'maybe' | 'no'): string {
  const { psychometric, technical, wiscar } = scores

  if (recommendation === 'yes') {
    return `Excellent! You demonstrate strong alignment with Customer Insights Analyst roles. Your psychological fit (${psychometric}%) and technical readiness (${technical}%) indicate you're well-positioned to succeed in this field. Your high motivation and analytical thinking make you an ideal candidate.`
  } else if (recommendation === 'maybe') {
    if (psychometric > technical) {
      return `You show good personality fit for analytics roles, but your technical skills need development. Focus on building foundational data analysis skills through courses in Excel, statistics, and data visualization tools.`
    } else {
      return `Your technical aptitude is promising, but consider whether your interests and motivations align with day-to-day customer insights work. Explore the field more through informational interviews or project-based learning.`
    }
  } else {
    const highestWiscar = Object.entries(wiscar).reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, { key: '', value: 0 }
    )
    
    return `Based on your responses, Customer Insights Analysis may not be the best fit. However, your strength in ${highestWiscar.key.replace('_', ' ')} suggests you might excel in related fields like UX research, marketing strategy, or data-driven product management.`
  }
}

function getCareerPaths(scores: AssessmentScores): string[] {
  const { overall, technical, psychometric } = scores
  const paths = []

  if (overall >= 60) {
    paths.push('Customer Insights Analyst')
  }
  if (technical >= 65) {
    paths.push('Marketing Data Analyst')
  }
  if (psychometric >= 70) {
    paths.push('Market Research Analyst', 'Consumer Behavior Specialist')
  }
  if (scores.wiscar.cognitive >= 75) {
    paths.push('Business Intelligence Analyst')
  }
  if (scores.wiscar.interest >= 80) {
    paths.push('UX Research Analyst')
  }

  // Fallback paths
  if (paths.length === 0) {
    paths.push('Data-Driven Marketing Specialist', 'Business Analyst', 'Product Research Coordinator')
  }

  return paths.slice(0, 5) // Return top 5 paths
}

function getNextSteps(scores: AssessmentScores, recommendation: 'yes' | 'maybe' | 'no'): string[] {
  const { technical, psychometric } = scores
  const steps = []

  if (recommendation === 'yes') {
    steps.push(
      'Start with advanced Excel and Google Sheets courses',
      'Learn SQL for database querying', 
      'Study customer psychology and behavioral economics',
      'Practice data visualization with Tableau or Power BI',
      'Build a portfolio with real customer analysis projects'
    )
  } else if (recommendation === 'maybe') {
    if (technical < 60) {
      steps.push(
        'Begin with Excel basics and data analysis fundamentals',
        'Take an introductory statistics course',
        'Learn survey design and analysis methods'
      )
    }
    if (psychometric < 60) {
      steps.push(
        'Explore customer research through online courses',
        'Shadow a current analyst or researcher',
        'Read case studies in consumer behavior'
      )
    }
    steps.push('Consider informational interviews with professionals in the field')
  } else {
    steps.push(
      'Explore alternative careers in marketing or business analysis',
      'Consider UX research or product management paths',
      'Develop foundational business and analytical thinking skills',
      'Take personality and career assessments to find better-aligned roles'
    )
  }

  return steps
}

function getSkillGaps(scores: AssessmentScores): Array<{
  skill: string
  importance: 'High' | 'Medium' | 'Low'
  readiness: 'High' | 'Moderate' | 'Low'
}> {
  const gaps = []
  
  // Determine readiness levels based on scores
  const getReadiness = (score: number) => {
    if (score >= 75) return 'High'
    if (score >= 50) return 'Moderate'
    return 'Low'
  }

  gaps.push({
    skill: 'Excel/Data Analysis Tools',
    importance: 'High' as const,
    readiness: getReadiness(scores.technical)
  })

  gaps.push({
    skill: 'Customer Psychology Understanding',
    importance: 'Medium' as const,
    readiness: getReadiness(scores.wiscar.interest)
  })

  gaps.push({
    skill: 'Data Storytelling & Visualization',
    importance: 'High' as const,
    readiness: getReadiness(scores.wiscar.cognitive)
  })

  gaps.push({
    skill: 'Statistical Analysis',
    importance: 'Medium' as const,
    readiness: getReadiness(scores.technical)
  })

  return gaps
}