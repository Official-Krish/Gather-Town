import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const JoinSpace = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  
  const handleJoinByCode = () => {
    if (inviteCode) {
      navigate(`/room/${inviteCode}`);
      toast.success("Joined space successfully!");
      setInviteCode("");
    } else {
      toast.error("Please enter an invite code");
    }
  };

  
  return (
    <div className="space-y-8">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Join with Invite Code</CardTitle>
          <CardDescription>
            Enter an invitation code to join a private space
          </CardDescription>
          <div className="flex items-center justify-center mb-4">
            <img
              width={200}
              height={200}
              src="https://dynamic-assets.gather.town/v2/sprite-profile/avatar-gV7nljNpXAGHgAEnbBWv.3ZnyOry7q9szgHCU1URo.GOIono5TlL1mMHqoryfb.R-mO0WjmRySf-DdFAMmb.qXZsUMXd6wr2ICupUTcz.png?d=."
              alt=""
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleJoinByCode} className="flex gap-4">
            <Input
              placeholder="Enter invite Link"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" onClick={()=> handleJoinByCode}>Join</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinSpace;
