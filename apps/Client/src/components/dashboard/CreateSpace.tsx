import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { spaceState } from "../../store/spaceAtom";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  description: string;
};

interface Map {
  id: string;
  name: string;
  width: number;
  height: number;
  thumbnail: string;
}

const CreateSpace = () => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [selectedMap, setSelectedMap] = useState(maps[0]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const dimensions = `${selectedMap?.width}x${selectedMap?.height}`;
  const setSpaces = useSetRecoilState(spaceState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaps = async () => {
      const res = await axios.get(`${BACKEND_URL}/maps`);
      console.log(res.data);
      setMaps(res.data.maps);
      setSelectedMap(res.data.maps[0]);
    };
    fetchMaps();
  }, []);

  const handleCreateSpace = async () => {
    try {
      setLoading(true);

      const newSpace = await axios.post(
        `${BACKEND_URL}/spaces/`,
        {
          name: form.getValues("name"),
          dimensions,
          mapId: selectedMap.id,
          thumbnail: selectedMap.thumbnail,
        },
        {
          headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        }
      );
      setSpaces((prevSpaces) => [...prevSpaces, newSpace.data.space]);
      setLoading(false);
      form.reset();
      navigate(`/room/${newSpace.data.space.id}`);
      toast("Space created successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Space creation failed", error);
    }
  };
  useEffect(() => {
    console.log(maps[selected]);
  }, [selected]);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Create a New Space</CardTitle>
        <CardDescription>
          Spaces are virtual environments where your team can meet, collaborate, and communicate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Marketing Team"{...field}/>
                  </FormControl>
                  <FormDescription>
                    Choose a name that describes your team or project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A space for marketing team collaboration and planning" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe the purpose of this space
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center my-4 mx-8">
                {maps.map((map, index) => (
                  <div
                    key={map.id}
                    onClick={() => {
                      setSelected(index);
                      setSelectedMap(map);
                    }}
                    className={`cursor-pointer ${selected === index ? "border-2 border-green-700" : ""}`}
                  >
                    <img
                      src={map.thumbnail}
                      alt="Map thumbnail"
                      className="w-[600px] h-[400px] object-cover"
                    />
                  </div>
                ))}
            </div>
            {loading && (
              <div className="flex justify-center items-center h-full">
                <Button disabled={true}>
                  Creating
                  <LoaderCircle className="h-10 w-10 animate-spin text-white" />
                </Button>
              </div>  
            )}
            {!loading && (
              <Button type="submit" className="w-full" onClick={handleCreateSpace}>Create Space</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateSpace;
