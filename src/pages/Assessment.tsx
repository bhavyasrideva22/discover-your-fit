import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/enhanced-button'
import { Progress } from '@/components/ui/progress'
import { assessmentQuestions, likertScale } from '@/data/questions'
import { UserResponse } from '@/types/assessment'
import { ChevronRight, ArrowLeft } from 'lucide-react'

const Assessment = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)

  const question = assessmentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  const handleAnswer = (answer: number | string) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newResponse: UserResponse = {
      questionId: question.id,
      answer: selectedAnswer,
      timestamp: new Date()
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)

    if (currentQuestion === assessmentQuestions.length - 1) {
      // Store responses and navigate to results
      localStorage.setItem('assessmentResponses', JSON.stringify(updatedResponses))
      navigate('/results')
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      // Find the previous answer
      const previousResponse = responses[currentQuestion - 1]
      if (previousResponse) {
        setSelectedAnswer(previousResponse.answer)
        // Remove the response from array since we're going back
        setResponses(responses.slice(0, -1))
      }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'psychometric': return '🧠'
      case 'technical': return '🔧'
      case 'wiscar': return '⭐'
      default: return '❓'
    }
  }

  const getCategoryName = (category: string, subcategory: string) => {
    if (category === 'psychometric') {
      return subcategory === 'interest' ? 'Interest Assessment' : 'Personality Fit'
    }
    if (category === 'technical') {
      return subcategory === 'general_aptitude' ? 'General Aptitude' : 'Domain Knowledge'
    }
    return 'WISCAR Framework'
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Career Assessment</h1>
            <div className="text-white/80">
              {currentQuestion + 1} of {assessmentQuestions.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-card border-border/50 shadow-card backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{getCategoryIcon(question.category)}</span>
              <div>
                <CardTitle className="text-xl text-foreground">
                  {getCategoryName(question.category, question.subcategory)}
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1 capitalize">
                  {question.subcategory.replace('_', ' ')}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg text-foreground leading-relaxed">
              {question.question}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.type === 'likert' ? (
                likertScale.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      selectedAnswer === option.value
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border bg-secondary/20 hover:bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                        selectedAnswer === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))
              ) : (
                question.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      selectedAnswer === option
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border bg-secondary/20 hover:bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                        selectedAnswer === option
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`} />
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={selectedAnswer === null}
                size="lg"
              >
                {currentQuestion === assessmentQuestions.length - 1 ? 'See Results' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Assessment