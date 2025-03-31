import CreateSpace from "../components/dashboard/CreateSpace";
import JoinSpace from "../components/dashboard/JoinSpace";
import UserSpaces from "../components/dashboard/UserSpaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-metaverse-dark-blue mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">My Spaces</h1>
          <p className="text-metaverse-muted">Create, join and manage your virtual spaces</p>
        </div>
        
        <Tabs defaultValue="my-spaces" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-metaverse-midnight/50 backdrop-blur-sm">
            <TabsTrigger value="my-spaces" className="data-[state=active]:bg-metaverse-blue/20 data-[state=active]:text-metaverse-accent">My Spaces</TabsTrigger>
            <TabsTrigger value="create-space" className="data-[state=active]:bg-metaverse-blue/20 data-[state=active]:text-metaverse-accent">Create Space</TabsTrigger>
            <TabsTrigger value="join-space" className="data-[state=active]:bg-metaverse-blue/20 data-[state=active]:text-metaverse-accent">Join Space</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-spaces" className="mt-0">
            <UserSpaces />
          </TabsContent>
          
          <TabsContent value="create-space" className="mt-0">
            <CreateSpace />
          </TabsContent>
          
          <TabsContent value="join-space" className="mt-0">
            <JoinSpace />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
