import { MediaState } from "../../lib/types";
import { motion } from "framer-motion";
import { LogOut, MessageCircle, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Bottomprops {
  user: { name: string; username: string };
  toggleLocalAudio: () => void;
  localMediaState: MediaState;
  toggleLocalVideo: () => void;
  handleshowChat: () => void;
}
const Bottom = ({
  toggleLocalAudio,
  localMediaState,
  toggleLocalVideo,
  handleshowChat,
}: Bottomprops) => {

  const navigate = useNavigate();
  
  return (

    <div className="fixed bottom-0 left-0 right-0 z-10">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1A2333] p-4 border-t border-cyan-900/30 w-full"
      >
        <div className="flex justify-center items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLocalAudio}
            className={`p-3 rounded-full ${
              localMediaState.audio ? 'bg-cyan-500/20' : 'bg-red-500/20'
            }`}
          >
            {localMediaState.audio ? <Mic size={20} /> : <MicOff size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLocalVideo}
            className={`p-3 rounded-full ${
              localMediaState.video ? 'bg-cyan-500/20' : 'bg-red-500/20'
            }`}
          >
            {localMediaState.video ? <Video size={20} /> : <VideoOff size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleshowChat}
            className="p-3 rounded-full bg-cyan-500/20"
          >
            <MessageCircle size={20} />
          </motion.button>
          <div className="flex justify-end items-center space-x-4 pr-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="p-3 rounded-full bg-cyan-500/20"
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Bottom;