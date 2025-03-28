import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight, User, Lock, UserCircle } from "lucide-react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

// Assuming this will be set up in a config file
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Avatar {
  id: string | number;
  imageUrl: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"User" | "Admin">("User");
  const [avatarId, setAvatarId] = useState<string | number | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      console.log(token);
      if (token) {
        navigate("/dashboard");
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/avatars`);
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Failed to fetch avatars:", error);
        toast("Could not load avatars. Please try again later.");
      }
      
      setIsLoaded(true);
    };
    
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, {
        name,
        username,
        password,
        AvatarId: avatarId,
        role: type,
      });
      
      toast("Account created successfully!");
      Cookies.set("token", res.data.token, { expires: 7 });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast(error.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-metaverse-dark-blue text-metaverse-text flex justify-center items-center hero-gradient overflow-hidden pt-6">
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
            <img
            className=" animate-bounce"
            width={40}
            height={40}
            src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_19_dancing.png?alt=media&token=03c3e96f-9148-42f9-a667-e8aeeba6d558"
            alt=""
          />
          <img
            className=" animate-bounce"
            width={40}
            height={40}
            src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_29_dancing.png?alt=media&token=507cc40a-a280-4f83-9600-69836b64522b"
            alt=""
          />
          <img
            className=" animate-bounce"
            width={40}
            height={40}
            src="https://cdn.gather.town/v0/b/gather-town.appspot.com/o/images%2Favatars%2Favatar_32_dancing.png?alt=media&token=e7d9d5fa-b7bd-41d5-966e-817f147b63d7"
            alt=""
          />
          </div>
          
          <h1 className={`text-2xl font-bold text-center mb-2 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <span className="text-gradient">Join</span> MetaverseConvene
          </h1>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-metaverse-accent/30 to-transparent my-4"></div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-metaverse-midnight/50 border-metaverse-text/10 focus:border-metaverse-accent/50 text-black"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Username</label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40 h-4 w-4" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-metaverse-midnight/50 border-metaverse-text/10 focus:border-metaverse-accent/50 text-black"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-metaverse-midnight/50 border-metaverse-text/10 focus:border-metaverse-accent/50 text-black"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-metaverse-text/40 hover:text-metaverse-text/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-black" /> : <Eye className="h-4 w-4 text-black" />}
                </button>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <label className="text-sm text-metaverse-text/70 mb-1 block">Choose Avatar</label>
              <div className="gap-2 mt-2 flex justify-center items-center">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setAvatarId(avatar.id)}
                    className={`relative cursor-pointer transition-all duration-200 ${avatar.id === avatarId ? 'transform scale-110' : ''}`}
                  >
                    <div className={`absolute inset-0 rounded-lg ${avatar.id === avatarId ? '' : ''}`} style={{ padding: '2px' }}></div>
                    <img
                      src={avatar.imageUrl}
                      alt="Avatar"
                      className={`w-full h-auto aspect-square object-cover rounded-lg ${avatar.id === avatarId ? 'border-2 border-metaverse-accent' : 'border border-metaverse-text/10'} bg-metaverse-midnight/30 hover:border-metaverse-text/30 transition-all`}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`pt-4 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all py-6 flex items-center justify-center"
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className={`text-center mt-6 text-metaverse-text/70 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signIn")}
              className="text-metaverse-accent hover:text-metaverse-purple transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;