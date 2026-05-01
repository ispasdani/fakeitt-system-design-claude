// Chat overlay components — pixel replicas of platform chats
// Loaded as <script type="text/babel">. Exposed on window.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// Curated palettes per platform — username colors
const KICK_PALETTE = ['#53fc18', '#ff5733', '#33b5ff', '#ffaa33', '#cc66ff', '#ff66aa', '#66ffaa', '#ffcc33'];
const TWITCH_PALETTE = ['#9146ff', '#ff7f50', '#0084ff', '#1e90ff', '#00ff7f', '#ff1493', '#ffd700', '#ff6347'];
const YT_PALETTE = ['#0066cc', '#4caf50', '#9c27b0', '#ff5722', '#607d8b', '#e91e63'];
const TT_PALETTE = ['#fe2c55', '#25f4ee', '#ff5733', '#ffd700', '#ff66aa'];

const colorFor = (name, palette) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
};

// Sample script messages used by demos when nothing is provided
const SAMPLE_MESSAGES = [
  { t: 0.5, user: 'icyfrostypants', text: 'just realized if you subtract 3 from the left and 2 from the right the score is 6-7, chills', kind: 'normal' },
  { t: 1.6, user: 'khhdcrdb!3', text: 'thinking back why would he ever go back to the scene that did him so dirty', kind: 'normal' },
  { t: 2.7, user: 'wafle0_0', text: 'try dodging the left when he swings', kind: 'mod' },
  { t: 3.8, user: 'VividVortex', text: 'just followed! love your content', kind: 'sub' },
  { t: 4.6, user: 'JJB44', text: 'use your special attack!', kind: 'normal' },
  { t: 5.4, user: '6sidi', text: 'thats fire 🔥', kind: 'vip' },
  { t: 6.2, user: 'Chatbot', text: 'welcome to the stream! type !commands for bot commands', kind: 'system' },
  { t: 7.4, user: 'gunko999', text: 'HOLD', kind: 'normal' },
  { t: 8.5, user: 'kesilchen', text: '"ETC" — legend yae', kind: 'normal' },
  { t: 9.3, user: 'saeyaaaa', text: 'cause he has so much potential still', kind: 'sub' },
  { t: 10.4, user: 'nvrmindVAL', text: 'like what could\'ve been man', kind: 'normal' },
  { t: 11.5, user: 'lucasx27', text: 'GG MATE keep it coming', kind: 'normal' },
  { t: 12.4, user: 'prysmcat', text: 'who else watching at 3am', kind: 'normal' },
  { t: 13.6, user: 'Chatbot', text: 'NinjaBytez gifted 5 subs!', kind: 'system' },
  { t: 14.5, user: 'NinjaBytez', text: 'love this team', kind: 'vip' },
  { t: 15.7, user: 'rookey', text: 'watching from tokyo 🌏', kind: 'normal' },
  { t: 16.6, user: 'CraftyController', text: 'POG', kind: 'mod' },
  { t: 17.5, user: 'meepmerp5', text: 'first time catching live', kind: 'sub' },
  { t: 18.6, user: 'flameflick', text: 'someone clip that pls', kind: 'normal' },
  { t: 19.7, user: 'breadbox.', text: 'on god that was clean', kind: 'normal' },
];

// ---------- KICK ----------
function KickChat({ messages = [], options = {} }) {
  const {
    title = 'Stream Chat',
    viewers = '12.4K',
    showHeader = true,
    showLive = true,
    showBadges = true,
    showTimestamps = false,
    showInput = true,
  } = options;
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="ov-kick" style={{ width: '100%', height: '100%' }}>
      {showHeader && (
        <div className="kc-head">
          <div className="kc-title">{title}</div>
          <div style={{display:'flex', gap: 10, alignItems:'center'}}>
            {showLive && <div className="kc-live"><span className="dot"/>LIVE</div>}
            <div className="kc-viewers">👁 {viewers}</div>
          </div>
        </div>
      )}
      <div className="kc-body" ref={bodyRef}>
        {messages.map((m, i) => {
          if (m.kind === 'system') return <div className="kc-system" key={i}>🟢 {m.text}</div>;
          const color = m.color || colorFor(m.user, KICK_PALETTE);
          return (
            <div className="kc-msg" key={i}>
              {showBadges && m.kind === 'mod' && <span className="kc-badge mod">M</span>}
              {showBadges && m.kind === 'vip' && <span className="kc-badge vip">V</span>}
              {showBadges && m.kind === 'sub' && <span className="kc-badge sub">S</span>}
              {showBadges && m.kind === 'verified' && <span className="kc-badge verified">✓</span>}
              <span className="kc-user" style={{ color }}>{m.user}</span>
              <span className="kc-text">{m.text}</span>
            </div>
          );
        })}
      </div>
      {showInput && (
        <div className="kc-foot">
          <input className="kc-input" placeholder="Send a message" readOnly />
          <button className="kc-send">Chat</button>
        </div>
      )}
    </div>
  );
}

// ---------- TWITCH ----------
function TwitchChat({ messages = [], options = {} }) {
  const {
    title = 'STREAM CHAT',
    showHeader = true,
    showBadges = true,
    showInput = true,
  } = options;
  const bodyRef = useRef(null);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages]);

  return (
    <div className="ov-twitch" style={{ width: '100%', height: '100%' }}>
      {showHeader && (
        <div className="tw-head">
          <div className="tw-title">{title}</div>
          <svg className="tw-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M3 5h14v2H3zM3 9h14v2H3zM3 13h14v2H3z"/></svg>
        </div>
      )}
      <div className="tw-body" ref={bodyRef}>
        {messages.map((m, i) => {
          if (m.kind === 'system') return <div className="tw-system" key={i}>{m.user || 'System'}: {m.text}</div>;
          const color = m.color || colorFor(m.user, TWITCH_PALETTE);
          return (
            <div className="tw-msg" key={i}>
              {showBadges && m.kind === 'mod' && <span className="tw-badge mod">⚔</span>}
              {showBadges && m.kind === 'vip' && <span className="tw-badge vip">♦</span>}
              {showBadges && m.kind === 'sub' && <span className="tw-badge sub">★</span>}
              {showBadges && m.kind === 'broadcaster' && <span className="tw-badge broadcaster">📹</span>}
              <span className="tw-user" style={{ color }}>{m.user}</span>
              <span className="tw-text">{m.text}</span>
            </div>
          );
        })}
      </div>
      {showInput && (
        <div className="tw-foot">
          <input className="tw-input" placeholder="Send a message" readOnly />
        </div>
      )}
    </div>
  );
}

// ---------- YOUTUBE ----------
function YoutubeChat({ messages = [], options = {} }) {
  const { title = 'Live chat', showHeader = true, showInput = true } = options;
  const bodyRef = useRef(null);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages]);

  return (
    <div className="ov-youtube" style={{ width: '100%', height: '100%' }}>
      {showHeader && (
        <div className="yt-head">
          <div className="yt-title">{title}</div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#606060"><circle cx="12" cy="6" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="18" r="2"/></svg>
        </div>
      )}
      <div className="yt-tabs">
        <div className="yt-tab is-active">Top chat</div>
        <div className="yt-tab">Live chat</div>
      </div>
      <div className="yt-body" ref={bodyRef}>
        {messages.map((m, i) => {
          if (m.kind === 'system') return <div className="yt-system" key={i}>{m.text}</div>;
          if (m.kind === 'superchat') {
            const color = m.color || '#1976d2';
            return (
              <div className="yt-superchat" key={i} style={{ background: color }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 4}}>
                  <strong>{m.user}</strong>
                  <span className="yt-amount">${m.amount || '5.00'}</span>
                </div>
                <div style={{fontSize: 12}}>{m.text}</div>
              </div>
            );
          }
          const color = m.color || colorFor(m.user, YT_PALETTE);
          const initial = m.user.charAt(0).toUpperCase();
          return (
            <div className="yt-msg" key={i}>
              <div className="yt-avatar" style={{ background: color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:11 }}>{initial}</div>
              <div className="yt-content">
                {m.kind === 'mod' && <span className="yt-badge mod">MOD</span>}
                {m.kind === 'sub' && <span className="yt-badge member">MEMBER</span>}
                {m.kind === 'vip' && <span className="yt-badge owner">OWNER</span>}
                <span className="yt-user" style={{ color }}>{m.user}</span>
                <span className="yt-text">{m.text}</span>
              </div>
            </div>
          );
        })}
      </div>
      {showInput && (
        <div className="yt-foot">
          <div className="yt-foot-avatar"/>
          <input className="yt-input" placeholder="Say something…" readOnly />
        </div>
      )}
    </div>
  );
}

// ---------- TIKTOK ----------
function TiktokChat({ messages = [], options = {} }) {
  const bodyRef = useRef(null);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages]);
  return (
    <div className="ov-tiktok" style={{ width: '100%', height: '100%' }}>
      <div className="tt-body" ref={bodyRef}>
        {messages.slice(-8).map((m, i) => {
          if (m.kind === 'system') return <div className="tt-system" key={i}>🎉 {m.text}</div>;
          if (m.kind === 'gift') {
            return (
              <div className="tt-msg tt-gift" key={i}>
                <span style={{fontSize:18}}>🎁</span>
                <div className="tt-text-wrap">
                  <span className="tt-user" style={{color:'rgba(255,255,255,0.85)'}}>{m.user}</span>
                  <span className="tt-text">sent {m.text || 'a Rose'}</span>
                </div>
              </div>
            );
          }
          const color = m.color || colorFor(m.user, TT_PALETTE);
          return (
            <div className="tt-msg" key={i}>
              <div className="tt-avatar" style={{background: color}}/>
              <div className="tt-text-wrap">
                <span className="tt-user">{m.user}</span>
                <span className="tt-text">{m.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Universal renderer ----------
function ChatOverlay({ platform, messages, options }) {
  if (platform === 'twitch') return <TwitchChat messages={messages} options={options} />;
  if (platform === 'youtube') return <YoutubeChat messages={messages} options={options} />;
  if (platform === 'tiktok') return <TiktokChat messages={messages} options={options} />;
  return <KickChat messages={messages} options={options} />;
}

// ---------- Hook: scheduled messages by playback time ----------
function useScheduledMessages(allMessages, currentTime, max = 50) {
  return useMemo(() => {
    return allMessages.filter(m => m.t <= currentTime).slice(-max);
  }, [allMessages, currentTime, max]);
}

// ---------- Hook: looping fake playback time ----------
function useFakePlayback({ duration = 22, loop = true, playing = true, speed = 1 } = {}) {
  const [t, setT] = useState(0);
  const rafRef = useRef();
  const lastRef = useRef();
  useEffect(() => {
    if (!playing) { lastRef.current = null; return; }
    const tick = (now) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000 * speed;
      lastRef.current = now;
      setT(prev => {
        const next = prev + dt;
        if (next >= duration) return loop ? 0 : duration;
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); lastRef.current = null; };
  }, [playing, duration, loop, speed]);
  return [t, setT];
}

Object.assign(window, {
  KickChat, TwitchChat, YoutubeChat, TiktokChat, ChatOverlay,
  SAMPLE_MESSAGES, useScheduledMessages, useFakePlayback,
  colorFor, KICK_PALETTE, TWITCH_PALETTE, YT_PALETTE, TT_PALETTE,
});
