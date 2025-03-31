import { Users, Video, Clock, ArrowRight, Trash2, LoaderCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies  from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { avatarState, userState } from "../../store/userAtom";
import { spaceState } from "../../store/spaceAtom";
import { toast } from "sonner";

const UserSpaces = () => {
  const setUser = useSetRecoilState(userState);
  const setAvatar = useSetRecoilState(avatarState);
  const [spaces, setSpaces] = useRecoilState<{ id: string; name: string; thumbnail: string }[]>(spaceState);
  const [loading, setLoading] = useState(true);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [selectedSpaceid, setSelectedSpaceid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const token = Cookies.get("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/user/metadata`, {
          headers: { authorization: token },
        });
        const res2 = await axios.get(`${BACKEND_URL}/spaces/all`, {
          headers: { authorization: token },
        });
        setSpaces(res2.data.spaces);
        console.log("spaces", res2.data.spaces);    
        setUser(res.data.user);
        console.log("user", res.data.user);
        setAvatar(res.data.avatar);
      } catch (error) {
        toast("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [navigate, setAvatar, setUser]);

  const HandleOpenDelete = (spaceId: string) => {
    setSelectedSpaceid(spaceId);
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setDeleteModal(false);
    setSelectedSpaceid("");
  };

  const handleDelete = async (spaceId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/spaces/${spaceId}`, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });
      setSpaces(spaces.filter((s) => s.id !== spaceId));
      toast("Space deleted successfully");
      setDeleteModal(false);
      setSelectedSpaceid("");
    } catch (error) {
      toast("Error deleting");
    }
  };


  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {spaces.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-200 mb-4">You haven't joined any spaces yet</h3>
          <p className="text-gray-400 mb-6">Create a new space or join an existing one to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <Card key={space.id} className="glass-card overflow-hidden hover:border-primary/30 transition-colors">
              <CardHeader>
                <div onClick={() => HandleOpenDelete(space.id.toString())} className="bg-red-500 p-2 rounded-sm absolute top-2 right-2 cursor-pointer">
                  <Trash2 className="h-4 w-4 text-white cursor-pointer"/>
                </div>
                <CardTitle className="text-xl">{space.name}</CardTitle>
                <CardDescription>ADD DETAILS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>ADD DETAILS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>ADD DETAILS</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>ADD DETAILS</span>
                </div>
                <img
                  src={space.thumbnail}
                  alt={space.name}
                  className="w-full h-50 object-cover rounded-lg"
                />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2 hover:bg-primary/10" onClick={() => navigate(`/room/${space.id}`)}>
                  Enter Space <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {DeleteModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
          <div
            className="fixed top-1/2 left-1/2 w-[500px] h-[150px] flex flex-col justify-center items-center gap-2 shadow-lg rounded-xl z-30"
            style={{
              backgroundColor: "rgb(40, 45, 78)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="text-xl font-semibold">
              Are you sure you want to delete this Space?
            </p>
            <div className="w-[50%] flex justify-between items-center mt-4">
              <Button
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(selectedSpaceid)}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSpaces;
