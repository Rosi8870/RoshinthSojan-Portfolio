import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Star, ThumbsUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Comments() {
  const { theme } = useTheme();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, "portfolio-comments"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchComments();
  }, []);

  /* ================= SUBMIT COMMENT ================= */
  const submitComment = async (e) => {
    e.preventDefault();
    if (!name || !content) return;

    setLoading(true);

    const ref = await addDoc(collection(db, "portfolio-comments"), {
      userName: name,
      content,
      rating,
      likes: 0,
      createdAt: serverTimestamp(),
    });

    setComments((prev) => [
      { id: ref.id, userName: name, content, rating, likes: 0 },
      ...prev,
    ]);

    setName("");
    setContent("");
    setRating(5);
    setLoading(false);
  };

  /* ================= LIKE (ONE PER USER) ================= */
  const likeComment = async (c) => {
    const key = `liked_comment_${c.id}`;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, "true");

    await updateDoc(doc(db, "portfolio-comments", c.id), {
      likes: (c.likes || 0) + 1,
    });

    setComments((prev) =>
      prev.map((x) =>
        x.id === c.id ? { ...x, likes: (x.likes || 0) + 1 } : x
      )
    );
  };

  return (
    <section id="comments" className={`relative py-32 overflow-hidden ${
      theme === 'editorial' ? 'bg-[#f2efe9] text-[#111111] editorial-border border-x-0 border-b-0' 
      : theme === 'zen' ? 'bg-transparent text-black border-t border-black/10'
      : theme === 'neumorphic' ? 'bg-transparent text-[#31344b] border-t-0'
      : theme === 'retro' ? 'bg-transparent text-black border-t-2 border-black font-mono'
      : 'bg-transparent text-white border-t border-white/10'
    }`}>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* HEADER */}
        <div className={`mb-20 flex flex-col md:flex-row md:items-end justify-between pb-10 ${
          theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-b-2 border-[#111111]' 
          : theme === 'neumorphic' ? '' 
          : 'border-b border-white/20'
        }`}>
          <div>
            <span className={`text-xs font-bold tracking-widest uppercase mb-4 block ${
              theme === 'editorial' ? 'text-[#ff5733]' 
              : theme === 'zen' ? 'text-black/50'
              : theme === 'neumorphic' ? 'text-[#8a96a3]'
              : theme === 'retro' ? 'text-black bg-[#c0c0c0] inline-block px-2'
              : 'text-purple-400'
            }`}>Chapter 05</span>
            <h2 className={`text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] m-0 ${
              theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40'
            }`}>
              Feedback
            </h2>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitComment}
          className={`mx-auto max-w-3xl p-8 sm:p-12 mb-32 relative ${
            theme === 'editorial' 
              ? 'bg-[#ffcc00] editorial-border editorial-shadow' 
              : theme === 'zen'
              ? 'bg-transparent border border-black/10'
              : theme === 'neumorphic'
              ? 'neu-flat rounded-[2rem]'
              : theme === 'retro'
              ? 'win95-window'
              : 'bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl'
          }`}
        >
          {/* Label */}
          <div className={`absolute top-[-20px] px-4 py-2 ${
            theme === 'editorial'
              ? 'left-8 bg-[#3b82f6] text-white editorial-border rotate-[-2deg]'
              : theme === 'zen'
              ? 'left-8 bg-white/80 backdrop-blur-md border border-black/10 text-black'
              : theme === 'neumorphic'
              ? 'left-8 neu-flat rounded-full text-[#31344b]'
              : theme === 'retro'
              ? 'left-8 win95-titlebar'
              : 'left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl'
          }`}>
             <p className={`font-serif italic font-bold text-lg ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? '' : 'text-white'}`}>Leave a Mark</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-8 mt-4">
            <div className="flex flex-col">
              <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'text-[#111111]' : theme === 'neumorphic' ? 'text-[#8a96a3]' : 'text-white/60'}`}>Name / Alias</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-3 outline-none transition-shadow ${
                  theme === 'editorial'
                    ? 'bg-white editorial-border text-[#111111] focus:shadow-[4px_4px_0px_#111111]'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/20 text-black focus:border-black'
                    : theme === 'neumorphic'
                    ? 'neu-pressed rounded-xl text-[#31344b] border-none'
                    : theme === 'retro'
                    ? 'bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white text-black focus:border-black'
                    : 'bg-white/5 border border-white/10 rounded-xl text-white focus:bg-white/10 focus:border-white/30 backdrop-blur-md'
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'text-[#111111]' : theme === 'neumorphic' ? 'text-[#8a96a3]' : 'text-white/60'}`}>Rating</label>
              <div className="flex items-center gap-2 h-full">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    onClick={() => setRating(n)}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      n <= rating
                        ? theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? "fill-[#31344b] text-[#31344b]" : "fill-white text-white"
                        : theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? "text-[#31344b]/20 hover:text-[#31344b]/50" : "text-white/20 hover:text-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-10">
            <label className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'text-[#111111]' : theme === 'neumorphic' ? 'text-[#8a96a3]' : 'text-white/60'}`}>Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
              className={`w-full resize-none px-4 py-3 outline-none transition-shadow ${
                theme === 'editorial'
                  ? 'bg-white editorial-border text-[#111111] focus:shadow-[4px_4px_0px_#111111]'
                  : theme === 'zen'
                  ? 'bg-transparent border border-black/20 text-black focus:border-black'
                  : theme === 'neumorphic'
                  ? 'neu-pressed rounded-xl text-[#31344b] border-none'
                  : theme === 'retro'
                  ? 'bg-white border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white text-black focus:border-black'
                  : 'bg-white/5 border border-white/10 rounded-xl text-white focus:bg-white/10 focus:border-white/30 backdrop-blur-md'
              }`}
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              className={`px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 ${
                theme === 'editorial'
                  ? 'bg-[#111111] text-white hover:bg-[#3b82f6] editorial-border border-white'
                  : theme === 'zen'
                  ? 'bg-transparent border border-black/20 text-black hover:bg-black hover:text-white'
                  : theme === 'neumorphic'
                  ? 'neu-flat active:neu-pressed rounded-full text-[#31344b]'
                  : theme === 'retro'
                  ? 'win95-button text-black'
                  : 'bg-white text-slate-900 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              }`}
            >
              {loading ? "Processing..." : "Publish Review"}
            </button>
          </div>
        </form>

        {/* COMMENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comments.map((c, i) => {
            const liked = localStorage.getItem(`liked_comment_${c.id}`);

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col justify-between p-8 transition-all duration-500 hover:-translate-y-2 ${
                  theme === 'editorial'
                    ? 'bg-white editorial-border editorial-shadow'
                    : theme === 'zen'
                    ? 'bg-transparent border border-black/10'
                    : theme === 'neumorphic'
                    ? 'neu-flat rounded-[2rem]'
                    : theme === 'retro'
                    ? 'win95-window hover:-translate-y-0'
                    : 'bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl hover:bg-white/10'
                }`}
              >
                <div>
                  <div className={`flex items-center justify-between mb-6 pb-4 ${
                    theme === 'editorial' || theme === 'zen' || theme === 'retro' ? 'border-b-2 border-[#111111]' : theme === 'neumorphic' ? '' : 'border-b border-white/10'
                  }`}>
                    <p className={`font-serif font-bold text-xl ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'text-[#31344b]' : 'text-white'}`}>{c.userName}</p>
                    <div className="flex gap-1">
                      {[...Array(c.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${theme === 'editorial' || theme === 'zen' || theme === 'neumorphic' || theme === 'retro' ? 'fill-[#ffcc00] text-[#ffcc00]' : 'fill-white text-white'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className={`text-base leading-relaxed mb-8 ${
                    theme === 'editorial' ? 'font-medium text-[#111111]/80' 
                    : theme === 'zen' ? 'font-light text-black/70'
                    : theme === 'neumorphic' ? 'font-medium text-[#8a96a3]'
                    : theme === 'retro' ? 'font-bold text-black'
                    : 'font-light text-white/70'
                  }`}>
                    "{c.content}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto">
                   <button
                    disabled={liked}
                    onClick={() => likeComment(c)}
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                      liked
                        ? theme === 'editorial' || theme === 'zen' ? "text-[#3b82f6]" : theme === 'neumorphic' ? 'text-[#3b82f6]' : theme === 'retro' ? 'text-black' : "text-white"
                        : theme === 'editorial' || theme === 'zen' ? "text-[#111111]/40 hover:text-[#111111]" : theme === 'neumorphic' ? 'text-[#8a96a3] hover:text-[#31344b]' : theme === 'retro' ? 'text-black/50 hover:text-black' : "text-white/30 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    {c.likes || 0}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
