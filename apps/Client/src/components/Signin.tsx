import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        const token = Cookies.get("token");
        if (token) {
            navigate("/dashboard");
        }
      setIsLoaded(true);
    };
    
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log({ username, password });
      const res = await axios.post(`${BACKEND_URL}/user/signIn`, {
        username,
        password,
      });
      if (res.status === 200) {
        Cookies.set("token", res.data.token, { expires: 7 });
        navigate("/dashboard");
      } else {
        toast("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);
      toast(error.response?.data?.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-metaverse-dark-blue text-metaverse-text flex justify-center items-center hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-metaverse-purple/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-metaverse-blue/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-metaverse-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className={`relative glass-card rounded-xl p-1 max-w-md w-full mx-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-gradient-to-br from-metaverse-midnight/80 to-metaverse-dark-blue/60 backdrop-blur-xl p-8 rounded-lg border border-white/5">
          <div className="flex justify-center mb-6 space-x-6">
            {/* Avatar Previews */}
            <div className="relative">
              <img
                src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_19_dancing.png?alt=media&token=03c3e96f-9148-42f9-a667-e8aeeba6d558"
                alt="Avatar preview"
                className="w-12 h-12 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
            </div>
            <div className="relative">
              <img
                src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_29_dancing.png?alt=media&token=507cc40a-a280-4f83-9600-69836b64522b"
                alt="Avatar preview"
                className="w-12 h-12 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <div className="relative">
              <img
                src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_32_dancing.png?alt=media&token=e7d9d5fa-b7bd-41d5-966e-817f147b63d7"
                alt="Avatar preview"
                className="w-12 h-12 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
          
          <h1 className={`text-2xl font-bold text-center mb-2 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <span className="text-gradient">Welcome to</span> MetaverseConvene
          </h1>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-metaverse-accent/30 to-transparent my-4"></div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-metaverse-text/70 h-4 w-4" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-metaverse-midnight/50 border-metaverse-text/10 focus:border-metaverse-accent/50 text-metaverse-text/70"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-metaverse-text/70 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-metaverse-midnight/50 border-metaverse-text/10 focus:border-metaverse-accent/50 text-metaverse-text/70"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2  hover:text-metaverse-text/70 transition-colors text-metaverse-text/70"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className={`pt-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all py-6 flex items-center justify-center"
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className={`text-center mt-6 text-metaverse-text/70 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-metaverse-accent hover:text-metaverse-purple transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;