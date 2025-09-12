import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, Globe, AlertTriangle, MapPin, Camera, Smartphone, BarChart3, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ocean-monitoring-hero.jpg";
import logo from "@/assets/oceanwatch-logo.png"; // TODO: Replace logo file if needed

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="BlueSentinels" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BlueSentinels
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1)), url('${heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        
        <div className="relative container mx-auto px-4 lg:px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Ocean Hazard Monitoring
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Protecting Coastal Communities Through
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Crowdsourced Intelligence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering citizens and emergency responders with real-time ocean hazard reporting, 
              social media monitoring, and AI-powered threat detection for faster disaster response.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="group">
                  Start Reporting
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="destructive" className="mb-4">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Critical Challenge
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Growing Threat of Ocean Hazards
              </h2>
              <p className="text-lg text-muted-foreground">
                Coastal communities worldwide face increasing risks from tsunamis, storm surges, 
                unusual tides, and flooding, but current warning systems often lack real-time, 
                ground-truth observations from affected areas.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">Delayed Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional monitoring relies on limited sensors, missing critical on-ground conditions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-warning/20 bg-warning/5">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="font-semibold mb-2">Information Gaps</h3>
                  <p className="text-sm text-muted-foreground">
                    Social media contains valuable hazard data that's not systematically analyzed
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2">Slow Response</h3>
                  <p className="text-sm text-muted-foreground">
                    Emergency agencies lack real-time situational awareness for rapid response
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">
                <Shield className="h-3 w-3 mr-1" />
                Our Solution
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Unified Crowdsourced Intelligence Platform
              </h2>
              <p className="text-lg text-muted-foreground">
                BlueSentinels combines citizen reporting, AI-powered social media monitoring, 
                and real-time visualization to create the world's most comprehensive 
                ocean hazard detection system.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Citizen Reporting</h3>
                    <p className="text-muted-foreground text-sm">
                      Geotagged reports with photos and videos from coastal residents and volunteers
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                    <p className="text-muted-foreground text-sm">
                      Natural language processing extracts hazard insights from social media trends
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time Visualization</h3>
                    <p className="text-muted-foreground text-sm">
                      Interactive maps with dynamic hotspots based on report density and threat levels
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Reports</span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="h-32 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">247</div>
                      <div className="text-xs text-muted-foreground">Reports Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">15</div>
                      <div className="text-xs text-muted-foreground">Active Hotspots</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">98%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comprehensive Platform Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything emergency responders and coastal communities need 
                for effective ocean hazard monitoring and response.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Role-Based Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized interfaces for citizens, emergency officials, and analysts
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <Camera className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Media Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Photos, videos, and detailed descriptions with automatic geotagging
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 text-success mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Offline Capability</h3>
                  <p className="text-sm text-muted-foreground">
                    Collect data in remote areas and sync when connection is available
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <MessageSquare className="h-8 w-8 text-warning mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Social Media Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor Twitter, Facebook, and YouTube for hazard-related discussions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <BarChart3 className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Trend analysis, sentiment tracking, and predictive modeling
                  </p>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-professional transition-shadow">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Multilingual Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Regional accessibility with support for multiple languages
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join the Global Ocean Safety Network
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Help protect coastal communities worldwide by contributing to real-time 
              ocean hazard monitoring and emergency response.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="group">
                  Start Reporting Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Contact Emergency Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img src={logo} alt="BlueSentinels" className="h-8 w-8" />
              <span className="text-xl font-bold">BlueSentinels</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Empowering communities through crowdsourced ocean hazard intelligence
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;