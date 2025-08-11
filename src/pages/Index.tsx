import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/enhanced-button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  Lightbulb,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react'

const Index = () => {
  const navigate = useNavigate()

  const startAssessment = () => {
    navigate('/assessment')
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              🌐 DISCOVER FIT
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Career & Learning Assessment
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              For <span className="text-accent font-semibold">Customer Insights Analyst</span>
            </p>
            <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto">
              Discover your psychological, technical, and career readiness to pursue a career as a Customer Insights Analyst. 
              Get personalized insights and a tailored learning path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={startAssessment}
              className="min-w-[200px]"
            >
              Start Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll Discover
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions to give you actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Psychometric Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Evaluate personality traits, interests, and cognitive style alignment with analyst roles
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Technical Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assess your current skills in data analysis, statistics, and customer research methods
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-2" />
                <CardTitle>WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive analysis of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get personalized career path recommendations and alternative options based on your profile
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <Lightbulb className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive a customized roadmap with courses, skills to develop, and next steps
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <Award className="w-8 h-8 text-accent mb-2" />
                <CardTitle>Confidence Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get a reliable confidence score with detailed feedback and skill gap analysis
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About the Role */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl mb-4">What is a Customer Insights Analyst?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <p className="text-lg leading-relaxed">
                A Customer Insights Analyst helps organizations understand customer behaviors, preferences, and needs using data. 
                They convert raw data into actionable insights that guide business strategies, marketing campaigns, product improvements, and customer experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Typical Careers</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Customer Insights Analyst</li>
                    <li>• Market Research Analyst</li>
                    <li>• Consumer Behavior Specialist</li>
                    <li>• Data-Driven Marketing Analyst</li>
                    <li>• Business Intelligence Associate</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Key Skills</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Analytical thinking & critical reasoning</li>
                    <li>• Curiosity about human behavior</li>
                    <li>• Attention to detail</li>
                    <li>• Data storytelling</li>
                    <li>• Qualitative & quantitative analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Potential?
          </h2>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Take our comprehensive assessment and get personalized insights into your Customer Insights Analyst career potential.
          </p>
          
          <Button 
            variant="hero" 
            size="xl" 
            onClick={startAssessment}
            className="min-w-[250px]"
          >
            Begin Your Assessment
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>25-30 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Personalized results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index;
