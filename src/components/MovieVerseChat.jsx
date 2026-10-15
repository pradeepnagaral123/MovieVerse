import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { streamMovieVerseChat, parseMovieBlock, resolveMovieCards, buildTmdbContext, isChatConfigured } from '../services/chat';

const STORAGE_KEY = 'cineVerse_chat_history';

const FAB_ROUTES = ['/home', '/tv', '/lists', '/profile'];

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  content:
    "Hey, I'm **MovieVerse AI**. Tell me a mood, a language, or a film — and I'll find something that fits. What are we watching tonight?",
  cards: [],
};

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [GREETING];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((m) => ({ ...m, streaming: false }));
    }
  } catch {
    // ignore corrupt storage
  }
  return [GREETING];
}

function stripPartialBlock(text) {
  const idx = text.indexOf('```movies');
  return idx === -1 ? text : text.slice(0, idx).trimEnd();
}

function renderInline(text, keyPrefix) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-bold text-on-surface">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(
        <code key={`${keyPrefix}-c${i}`} className="px-1.5 py-0.5 rounded bg-black/40 text-primary-fixed font-[JetBrains_Mono,monospace] text-[12px]">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
    i += 1;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBlocks(text, keyPrefix) {
  const lines = text.split('\n');
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (!list) return;
    const Tag = list.type;
    blocks.push(
      <Tag
        key={`${keyPrefix}-l${blocks.length}`}
        className={`${list.type === 'ol' ? 'list-decimal' : 'list-disc'} ml-4 space-y-1 marker:text-primary-container`}
      >
        {list.items.map((item, idx) => (
          <li key={`${keyPrefix}-li${idx}`} className="leading-relaxed">
            {renderInline(item, `${keyPrefix}-li${idx}`)}
          </li>
        ))}
      </Tag>
    );
    list = null;
  };

  lines.forEach((raw, index) => {
    const line = raw.replace(/\s+$/, '');
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
    const heading = line.match(/^\s*(#{1,4})\s+(.*)$/);

    if (bullet || numbered) {
      const type = bullet ? 'ul' : 'ol';
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      return;
    }

    flushList();

    if (!line.trim()) return;

    if (heading) {
      const level = heading[1].length;
      const size = level <= 2 ? 'text-[15px]' : 'text-[14px]';
      blocks.push(
        <p key={`${keyPrefix}-h${index}`} className={`${size} font-bold text-on-surface mt-1`}>
          {renderInline(heading[2], `${keyPrefix}-h${index}`)}
        </p>
      );
      return;
    }

    blocks.push(
      <p key={`${keyPrefix}-p${index}`} className="leading-relaxed">
        {renderInline(line, `${keyPrefix}-p${index}`)}
      </p>
    );
  });

  flushList();
  return blocks;
}

function MovieCard({ card, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={() => onOpen(card)}
      className="group text-left shrink-0 w-[130px] rounded-xl overflow-hidden bg-surface-container-high border border-white/10 hover:border-primary-container transition-colors cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imgError && card.poster ? (
          <img
            src={card.poster}
            alt={card.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant">movie</span>
          </div>
        )}
        {card.rating > 0 && (
          <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-primary-container text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-on-surface text-[10px] font-bold">{card.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-on-surface font-bold text-[12px] line-clamp-2 leading-tight group-hover:text-primary-container transition-colors">
          {card.title}
        </p>
        <p className="text-on-surface-variant text-[10px] mt-1">
          {card.year || ''}
          <span className="ml-1 uppercase tracking-wider">{card.type === 'tv' ? '· TV' : ''}</span>
        </p>
      </div>
    </button>
  );
}

function AssistantMeta() {
  return (
    <div className="flex items-center gap-1.5 mb-1.5 px-1">
      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center">
        <span className="material-symbols-outlined text-[13px] text-black">movie</span>
      </span>
      <span className="text-[11px] font-bold text-on-surface-variant tracking-wide">MovieVerse AI</span>
    </div>
  );
}

export default function MovieVerseChat() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // storage may be unavailable
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const discardHistory = () => {
    abortRef.current?.abort();
    setStreaming(false);
    setMessages([GREETING]);
  };

  const handleOpenCard = (card) => {
    navigate(card.type === 'tv' ? `/tv/${card.id}` : `/movie/${card.id}`);
    if (typeof window !== 'undefined' && window.innerWidth < 768) setOpen(false);
  };

  const sendMessage = useCallback(
    async (rawText) => {
      const content = String(rawText ?? input).trim();
      if (!content || streaming) return;

      setInput('');

      const apiHistory = messages
        .filter((m) => !m.error)
        .map((m) => ({ role: m.role, content: m.content }));

      const userMessage = { id: newId(), role: 'user', content };
      const assistantId = newId();
      const pending = { id: assistantId, role: 'assistant', content: '', streaming: true, cards: [] };

      setMessages((prev) => [...prev, userMessage, pending]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        let acc = '';
        const context = await buildTmdbContext(content);
        const requestHistory = [...apiHistory, { role: 'user', content, context }];

        for await (const delta of streamMovieVerseChat(requestHistory, { signal: controller.signal })) {
          acc += delta;
          const visible = stripPartialBlock(acc);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: visible, streaming: true } : m))
          );
        }

        const { text, movies } = parseMovieBlock(acc);
        const cards = await resolveMovieCards(movies);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: text || "I'm here — could you say a little more about what you're after?",
                  cards,
                  streaming: false,
                }
              : m
          )
        );
      } catch (err) {
        const aborted = err?.name === 'AbortError';
        const message = aborted
          ? '_Response stopped._'
          : err?.message === 'CHAT_NOT_CONFIGURED'
            ? 'MovieVerse AI is not configured yet. Add your Groq API key to the .env file to start chatting.'
            : `Sorry, I hit a snag reaching the cinema brain: ${err?.message || 'unknown error'}. Please try again.`;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: message, streaming: false, error: !aborted } : m
          )
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [input, messages, streaming]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const hasFab = FAB_ROUTES.includes(pathname);
  const launcherPosition = hasFab
    ? 'bottom-[calc(9.25rem+env(safe-area-inset-bottom,0px))] right-4 md:bottom-28 md:right-8'
    : 'bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-4 md:bottom-8 md:right-8';

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open MovieVerse AI chat"
          className={`fixed z-[80] ${launcherPosition} group flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-gradient-to-r from-primary-container to-[#ff5e00] text-on-primary-container shadow-[0_10px_30px_-6px_rgba(255,128,0,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <span className="text-[14px] font-black tracking-tight">Ask AI</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] md:inset-auto md:bottom-8 md:right-8 md:w-[404px] md:h-[640px] md:max-h-[calc(100vh-5rem)]">
          <div className="flex flex-col h-full bg-surface border border-white/10 md:rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="relative shrink-0 bg-gradient-to-r from-primary-container to-[#ff5e00] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="text-white font-black text-[17px] leading-tight truncate">MovieVerse AI</p>
                  <p className="text-white/80 text-[11px] leading-tight flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isChatConfigured() ? 'bg-white' : 'bg-red-300'}`} />
                    {streaming ? 'Thinking…' : 'Your cinema companion'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={discardHistory}
                  aria-label="Start a new chat"
                  title="New chat"
                  className="p-2 rounded-full text-white/90 hover:bg-black/20 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">refresh</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-2 rounded-full text-white/90 hover:bg-black/20 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 custom-scrollbar bg-background">
              {messages.map((m) => (
                <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  {m.role === 'user' ? (
                    <div className="max-w-[85%] bg-primary-container text-on-primary-container rounded-2xl rounded-br-md px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap break-words">
                      {m.content}
                    </div>
                  ) : (
                    <div className="max-w-full">
                      <AssistantMeta />
                      <div
                        className={`rounded-2xl rounded-tl-md px-3.5 py-3 text-[14px] text-on-surface-variant ${
                          m.error ? 'bg-error-container/30 border border-error/30 text-on-surface' : 'bg-surface-container-high'
                        }`}
                      >
                        {m.content ? (
                          <div className="space-y-2">{renderBlocks(m.content, m.id)}</div>
                        ) : (
                          <div className="flex items-center gap-1.5 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-bounce" />
                          </div>
                        )}
                        {m.streaming && m.content && (
                          <span className="inline-block w-1.5 h-4 align-middle bg-primary-container ml-0.5 animate-pulse" />
                        )}
                      </div>

                      {m.cards?.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-1.5 mb-2 px-1 text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[15px] text-primary-container">movie_filter</span>
                            {m.cards.length} {m.cards.length === 1 ? 'film' : 'films'} to open
                          </div>
                          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                            {m.cards.map((card) => (
                              <MovieCard key={card.key} card={card} onOpen={handleOpenCard} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="shrink-0 border-t border-white/10 bg-surface px-3 py-3 flex items-end gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for a film, a mood, or an ending…"
                className="flex-1 resize-none max-h-32 bg-surface-container-high border border-white/10 rounded-2xl px-4 py-3 text-[14px] leading-relaxed focus:outline-none focus:border-primary-container transition-colors placeholder:text-on-surface-variant/50"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  aria-label="Stop response"
                  className="shrink-0 w-11 h-11 rounded-full bg-surface-container-highest border border-white/10 text-on-surface flex items-center justify-center hover:border-error transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="shrink-0 w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">send</span>
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
