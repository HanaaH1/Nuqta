import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CommunityPost({ post, onEarn }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(post.replies || []);
  const [sent, setSent] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSend = () => {
    if (!replyText.trim() || sent) return;
    setReplies(prev => [...prev, { author: 'You', time: 'just now', content: replyText }]);
    setReplyText('');
    setSent(true);
    onEarn?.(30, '💬 +30 BP — Support Sent');
    setTimeout(() => {
      setSent(false);
      setShowReply(false);
    }, 1800);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">
          {post.author[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{post.author}</p>
          <p className="text-[10px] text-muted-foreground">{post.time}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground/90 mt-3 leading-relaxed">{post.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Heart className={cn('w-4 h-4 transition-all', liked && 'fill-red-500 text-red-500')} />
          {likes}
        </button>
        <button
          onClick={() => setShowReply(!showReply)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {replies.length}
        </button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReply(!showReply)}
          className="ml-auto px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
        >
          Write a Response · +30 BP
        </motion.button>
      </div>

      {/* Reply input */}
      <AnimatePresence>
        {showReply && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex gap-2 items-end">
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Share your support or thoughts…"
                rows={2}
                className="flex-1 resize-none bg-secondary rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none leading-relaxed"
              />
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleSend}
                disabled={!replyText.trim() || sent}
                className="shrink-0 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40"
              >
                {sent ? '✓' : <Send className="w-4 h-4" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-primary/10">
          {replies.map((reply, i) => (
            <div key={i}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold text-secondary-foreground">
                  {reply.author[0]}
                </div>
                <p className="text-xs font-semibold text-foreground">{reply.author}</p>
                <p className="text-[10px] text-muted-foreground">{reply.time}</p>
              </div>
              <p className="text-xs text-foreground/80 mt-1.5 leading-relaxed ml-8">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}