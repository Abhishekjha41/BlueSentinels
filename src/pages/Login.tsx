import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Users, ArrowLeft, Mail, Lock, UserCheck ,ChartNoAxesCombined } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/oceanwatch-logo.png"; // TODO: Replace logo file if needed

type UserRole = "citizen" | "official" | "analyst";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("citizen");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store auth state (in a real app, this would be proper JWT handling)
  localStorage.setItem("bluesentinels_auth", JSON.stringify({
        email,
        role,
        loginTime: new Date().toISOString()
      }));

      toast({
        title: "Login Successful",
        description: role === "citizen" 
          ? "Welcome Citizen! You can now report hazards and view public data."
          : role === "official" 
            ? "Welcome Official! You have full access to monitoring and incident management tools."
            : "Welcome Analyst! You can now analyze data and generate reports.",
      });

      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={logo} alt="BlueSentinels" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BlueSentinels
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Access Platform</h1>
          <p className="text-muted-foreground">
            Sign in to start monitoring and reporting ocean hazards
          </p>
        </div>
        
        <Card className="shadow-professional">
          <CardHeader className="space-y-4">
            <div className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Choose Your Role
              </CardTitle>
              <CardDescription>
                Select your access level to continue
              </CardDescription>
            </div>
            
            {/* Role Selection */}
            <RadioGroup 
              value={role} 
              onValueChange={(value: UserRole) => setRole(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="citizen" id="citizen" className="peer sr-only" />
                <Label 
                  htmlFor="citizen" 
                  className="flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer transition-colors peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50"
                >
                  <Users className="h-6 w-6 text-primary" />
                  <span className="font-medium">Citizen</span>
                  <Badge variant="outline" className="text-xs">
                    Public Access
                  </Badge>
                </Label>
              </div>
              
              <div className="relative">
                <RadioGroupItem value="official" id="official" className="peer sr-only" />
                <Label 
                  htmlFor="official" 
                  className="flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer transition-colors peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50"
                >
                  <Shield className="h-6 w-6 text-accent" />
                  <span className="font-medium">Official</span>
                  <Badge variant="outline" className="text-xs">
                    Emergency Access
                  </Badge>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="analyst" id="analyst" className="peer sr-only" />
                <Label
                  htmlFor="analyst"
                  className="flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer transition-colors peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-muted/50"
                >
                  <ChartNoAxesCombined  className="h-6 w-6 text-primary" />
                  <span className="font-medium">Analyst</span>
                  <Badge variant="outline" className="text-xs">
                    Data Access
                  </Badge>
                </Label>
              </div>
            </RadioGroup>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-colors focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-colors focus:border-primary"
                  />
                </div>
              </div>

              {/* Demo Credentials
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Demo Credentials:</p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p><strong>Citizen:</strong> citizen@bluesentinels.demo / demo123</p>
                  <p><strong>Official:</strong> official@bluesentinels.demo / admin123</p>
                  <p><strong>Analyst:</strong> analyst@bluesentinels.demo / analyst123 </p>
                </div>
              </div> */}
               {/* Role Information to be seen in left side of the login card */}
        <div className="mt-6 grid grid-cols-1 gap-4">
          {role === "citizen" ? (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">Citizen Access</h3>
                <p className="text-sm text-muted-foreground">
                  Report hazards, view public data, and stay informed about ocean conditions in your area.
                </p>
              </CardContent>
            </Card>
          ) : 
          role === "analyst" ? (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <ChartNoAxesCombined  className="h-6 w-6 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">Analyst Access</h3>
                <p className="text-sm text-muted-foreground">
                  Access and analyze ocean data, generate reports, and support decision-making processes.
                </p>
              </CardContent>
            </Card>
          ) :
          (
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-1">Emergency Official Access</h3>
                <p className="text-sm text-muted-foreground">
                  Full monitoring capabilities, incident management, and coordination tools for emergency response.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <UserCheck className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-center text-sm text-muted-foreground">
                New to BlueSentinels?{" "}
                <Link to="/" className="text-primary hover:underline">
                  Learn more about our platform
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        
       
      </div>
    </div>
  );
};

export default Login;