import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([
    {
      text: "Hello",
    },
  ]);
  const user = useSelector((store) => store.user);
  

  //?As soon as the page loads I want to connect to the backend Server
  useEffect(() => {
    //?This socket here will be an object.I will use this socket object to emit the events.
    const socket = createSocketConnection();
    //?userId => id of the loggedIn User.
    //?targetUserId => id of that user whom the loggedIn User wants to chat with.Basically in the emit i pass whome are the 2 persons who want to chat with each other.
    socket.emit("join", { userId, targetUserId });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#020817] text-white overflow-y-auto pt-20 pb-12 flex flex-col items-center justify-center p-4 font-sans">
      {/* Animated Dot Grid Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#ffffff33_1.5px,#020817_1.5px)] bg-size-[20px_20px]"
        style={{
          animation: "pulseGrid 30s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      {/* Enhanced Ambient Glow Effect */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-95 bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes pulseGrid {
          0%, 100% {
            background-size: 18px 18px;
            opacity: 0.35;
          }
          50% {
            background-size: 26px 26px;
            opacity: 0.85;
          }
        }
      `}</style>

      {/* Pure Central Chat UI Container (Increased Width & Height) */}
      <div className="relative z-10 w-full max-w-4xl h-[82vh] min-h-100 bg-[#070d1e]/85 border border-slate-800/80 hover:border-indigo-500/30 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 flex flex-col overflow-hidden transition-all duration-300 mt-4">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#091026]/90 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative"></div>
            <div>
              <div className="flex items-center gap-2"></div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-['JetBrains_Mono']"></p>
            </div>
          </div>

          <span className="text-[10px] px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-['JetBrains_Mono'] tracking-wide">
            Chat
          </span>
        </div>

        {/* Chat Messages UI Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="text-center my-1"></div>

          {/* Incoming Message UI Container */}

          {/* Outgoing Message UI Container */}
          <div className="flex flex-col items-end"></div>
        </div>

        {/* Chat Input Footer UI */}
        <div className="p-4 border-t border-slate-800/80 bg-[#091026]/90 flex items-center gap-3 backdrop-blur-xl">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition shadow-inner"
          />
          <button
            type="button"
            className="px-5 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-500 hover:opacity-95 text-white font-semibold text-xs transition active:scale-95 flex items-center gap-2 font-['JetBrains_Mono'] shadow-lg shadow-indigo-600/25"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
