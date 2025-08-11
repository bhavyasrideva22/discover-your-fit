import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/enhanced-button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { UserResponse, AssessmentResult } from '@/types/assessment'
import { calculateResults } from '@/utils/assessment-calculator'
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Lightbulb, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Download,
  Repeat
} from 'lucide-react'

const Results = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResponses = localStorage.getItem('assessmentResponses')
    if (!storedResponses) {
      navigate('/') // Redirect if no responses found
      return
    }

    try {
      const responses: UserResponse[] = JSON.parse(storedResponses)
      const calculatedResults = calculateResults(responses)
      setResults(calculatedResults)
    } catch (error) {
      console.error('Error processing results:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Calculating your results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center p-6">
            <p className="text-lg mb-4">Unable to load results</p>
            <Button onClick={() => navigate('/')} variant="hero">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="w-8 h-8 text-accent" />
      case 'maybe': return <AlertTriangle className="w-8 h-8 text-yellow-500" />
      case 'no': return <XCircle className="w-8 h-8 text-destructive" />
      default: return null
    }
  }

  const getRecommendationTitle = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'Strong Match!'
      case 'maybe': return 'Potential Fit'
      case 'no': return 'Consider Alternatives'
      default: return ''
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'bg-gradient-secondary'
      case 'maybe': return 'bg-yellow-500/20 border-yellow-500/50'
      case 'no': return 'bg-destructive/20 border-destructive/50'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl font-bold">Your Assessment Results</h1>
          <p className="text-xl text-white/80">
            Personalized insights for your Customer Insights Analyst journey
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`${getRecommendationColor(results.recommendation)} shadow-glow`}>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              {getRecommendationIcon(results.recommendation)}
              <h2 className="text-3xl font-bold">{getRecommendationTitle(results.recommendation)}</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg">Confidence Score:</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {results.confidence}%
                </Badge>
              </div>
              <p className="text-lg max-w-2xl leading-relaxed">{results.feedback}</p>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Scores */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Psychometric Fit</span>
                  <span className="font-semibold">{results.scores.psychometric}%</span>
                </div>
                <Progress value={results.scores.psychometric} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Technical Readiness</span>
                  <span className="font-semibold">{results.scores.technical}%</span>
                </div>
                <Progress value={results.scores.technical} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Overall Score</span>
                  <span className="font-semibold">{results.scores.overall}%</span>
                </div>
                <Progress value={results.scores.overall} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Framework */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results.scores.wiscar).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize">{key.replace('_', ' ')}</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <Progress value={value} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.careerPaths.map((path, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="font-semibold">{path}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Your Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <span className="flex-1">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gaps */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Skill Development Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.skillGaps.map((gap, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10">
                  <span className="font-medium">{gap.skill}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant={gap.importance === 'High' ? 'destructive' : gap.importance === 'Medium' ? 'default' : 'secondary'}>
                      {gap.importance} Priority
                    </Badge>
                    <Badge variant={gap.readiness === 'High' ? 'default' : gap.readiness === 'Moderate' ? 'secondary' : 'destructive'}>
                      {gap.readiness} Readiness
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={() => navigate('/')}>
            <Repeat className="w-4 h-4 mr-2" />
            Take Assessment Again
          </Button>
          <Button variant="accent" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button variant="glass" size="lg">
            <ArrowRight className="w-4 h-4 mr-2" />
            Start Learning Path
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Results