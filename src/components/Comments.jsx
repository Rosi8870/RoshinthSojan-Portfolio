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

export default function Comments() {
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
    <section id="comments" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-extrabold"
        >
          Feedback & Reviews
        </motion.h2>

        {/* FORM */}
        <form
          onSubmit={submitComment}
          className="
            mx-auto 
            max-w-3xl 
            rounded-3xl 
            border border-white/10 
            bg-white/5 
            p-10 
            backdrop-blur-xl
          "
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="
                rounded-xl 
                border border-white/10 
                bg-black/50 
                px-5 
                py-4 
                text-sm 
                outline-none 
                focus:border-cyan-400
              "
            />

            <div className="flex items-center gap-1 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  onClick={() => setRating(n)}
                  className={`h-6 w-6 cursor-pointer ${
                    n <= rating
                      ? "fill-cyan-400 text-cyan-400"
                      : "text-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* BIG TEXTAREA */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            placeholder="Write your feedback..."
            className="
              mt-6
              w-full
              resize-none
              rounded-2xl
              border border-white/10
              bg-black/50
              px-6
              py-5
              text-base
              leading-relaxed
              outline-none
              focus:border-cyan-400
              md:rows-10
            "
          />

          <div className="mt-8 flex justify-center">
            <button
              disabled={loading}
              className="
                rounded-full 
                bg-gradient-to-r 
                from-cyan-400 
                to-blue-500 
                px-10 
                py-4 
                text-sm 
                font-semibold 
                text-slate-900
              "
            >
              {loading ? "Posting..." : "Submit Feedback"}
            </button>
          </div>
        </form>

        {/* DIVIDER */}
        <div className="my-24 flex justify-center">
          <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        </div>

        {/* COMMENTS GRID */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-8
            place-items-center
          "
        >
          {comments.map((c) => {
            const liked = localStorage.getItem(`liked_comment_${c.id}`);

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="
                  w-full 
                  max-w-sm 
                  flex 
                  h-full 
                  flex-col 
                  justify-between 
                  rounded-2xl 
                  border border-white/10 
                  bg-white/5 
                  p-6 
                  backdrop-blur-xl
                  transition 
                  hover:border-cyan-400/40
                "
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{c.userName}</p>
                    <div className="flex">
                      {[...Array(c.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-cyan-400 text-cyan-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-white/70">
                    {c.content}
                  </p>
                </div>

                <button
                  disabled={liked}
                  onClick={() => likeComment(c)}
                  className={`mt-6 flex items-center gap-2 text-xs ${
                    liked
                      ? "text-cyan-400"
                      : "text-white/50 hover:text-cyan-400"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {c.likes || 0}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
