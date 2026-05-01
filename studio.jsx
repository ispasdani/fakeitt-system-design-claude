// Studio — main app orchestrator
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS, useCallback: useCallbackS } = React;

const PLATFORM_DEFAULTS = {
  kick:    { width: 360, height: 480, position: 'BR', opacity: 78, fontSize: 14, radius: 6,  padding: 6, maxMessages: 50, speed: 1, showHeader: true, showLive: true, showViewers: true, showBadges: true, showTimestamps: false, showInput: true, showWatermark: true },
  twitch:  { width: 340, height: 480, position: 'BR', opacity: 92, fontSize: 13, radius: 4,  padding: 4, maxMessages: 50, speed: 1, showHeader: true, showLive: false, showViewers: false, showBadges: true, showTimestamps: false, showInput: true, showWatermark: true },
  youtube: { width: 360, height: 480, position: 'BR', opacity: 97, fontSize: 13, radius: 12, padding: 6, maxMessages: 30, speed: 1, showHeader: true, showLive: false, showViewers: false, showBadges: true, showTimestamps: false, showInput: true, showWatermark: true },
  tiktok:  { width: 320, height: 540, position: 'BR', opacity: 60, fontSize: 13, radius: 0,  padding: 8, maxMessages: 8,  speed: 1, showHeader: false, showLive: false, showViewers: false, showBadges: false, showTimestamps: false, showInput: false, showWatermark: false },
};

const PLATFORMS_S = [
  { id: 'kick', name: 'Kick', accent: '#53fc18' },
  { id: 'twitch', name: 'Twitch', accent: '#9146ff' },
  { id: 'youtube', name: 'YouTube', accent: '#ff0033' },
  { id: 'tiktok', name: 'TikTok', accent: '#fe2c55' },
];

const SCENES = [
  { id: 'main', name: 'Main Scene', shortcut: '⌘1', icon: '◉' },
  { id: 'gameonly', name: 'Game Only', shortcut: '⌘2', icon: '▣', live: true },
  { id: 'starting', name: 'Starting Screen', shortcut: '⌘3', icon: '⏵' },
  { id: 'break', name: 'Break Screen', shortcut: '⌘4', icon: '⏸' },
];

function StudioApp() {
  const [platform, setPlatform] = useStateS('kick');
  const [scene, setScene] = useStateS('gameonly');
  const [tab, setTab] = useStateS('visual'); // visual | css | message
  const [aspect, setAspect] = useStateS('16:9');
  const [duration] = useStateS(45);
  const [playing, setPlaying] = useStateS(true);
  const [t, setT] = useFakePlayback({ duration, loop: true, playing });

  // Settings per platform
  const [allSettings, setAllSettings] = useStateS(() => ({...PLATFORM_DEFAULTS}));
  const settings = allSettings[platform];
  const setSetting = (key, val) => setAllSettings(s => ({...s, [platform]: {...s[platform], [key]: val}}));

  // Messages (script)
  const [messages, setMessages] = useStateS(() => SAMPLE_MESSAGES.map((m, i) => ({...m, id: 'm' + i})));
  const [selectedId, setSelectedId] = useStateS(null);
  const selected = messages.find(m => m.id === selectedId);

  const updateMessage = (m) => setMessages(ms => ms.map(x => x.id === m.id ? m : x));
  const deleteMessage = (id) => { setMessages(ms => ms.filter(x => x.id !== id)); setSelectedId(null); };
  const addMessage = () => {
    const id = 'm' + Date.now();
    const newMsg = { id, t, user: 'newviewer', text: 'great stream!', kind: 'normal' };
    setMessages(ms => [...ms, newMsg].sort((a,b) => a.t - b.t));
    setSelectedId(id);
    setTab('message');
  };

  // CSS editor
  const [css, setCss] = useStateS('/* Custom CSS — applied live */\n.chat-username {\n  font-weight: 800;\n}\n');

  // Visible messages
  const visibleMessages = useMemoS(() => {
    return messages
      .filter(m => m.t <= t)
      .slice(-settings.maxMessages);
  }, [messages, t, settings.maxMessages]);

  // Stage sizing
  const stageRef = useRefS(null);
  const [stageSize, setStageSize] = useStateS({ w: 800, h: 450 });
  useEffectS(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      const isVertical = aspect === '9:16';
      const ratio = isVertical ? 9/16 : 16/9;
      const padding = 80;
      let w = cr.width - padding;
      let h = cr.height - padding;
      if (w / h > ratio) w = h * ratio;
      else h = w / ratio;
      setStageSize({ w: Math.floor(w), h: Math.floor(h) });
    });
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [aspect]);

  // Position the chat overlay based on anchor + width/height
  const overlayPos = useMemoS(() => {
    const margin = 16;
    const w = Math.min(settings.width, stageSize.w - margin*2);
    const h = Math.min(settings.height, stageSize.h - margin*2 - 60);
    const top = settings.position[0] === 'T' ? margin + 50 : stageSize.h - h - margin;
    const left = settings.position[1] === 'L' ? margin : stageSize.w - w - margin;
    return { top, left, width: w, height: h };
  }, [settings.position, settings.width, settings.height, stageSize]);

  // Drag state
  const [drag, setDrag] = useStateS(null);
  const onDragStart = (e) => {
    e.preventDefault();
    setDrag({ x: e.clientX, y: e.clientY, top: overlayPos.top, left: overlayPos.left });
    setSelectedId(null);
  };
  useEffectS(() => {
    if (!drag) return;
    const onMove = (e) => {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      const newLeft = Math.max(8, Math.min(stageSize.w - overlayPos.width - 8, drag.left + dx));
      const newTop = Math.max(8, Math.min(stageSize.h - overlayPos.height - 8, drag.top + dy));
      // Compute closest anchor
      const isLeft = newLeft < stageSize.w / 2 - overlayPos.width / 2;
      const isTop = newTop < stageSize.h / 2 - overlayPos.height / 2;
      const newPos = (isTop ? 'T' : 'B') + (isLeft ? 'L' : 'R');
      if (newPos !== settings.position) setSetting('position', newPos);
    };
    const onUp = () => setDrag(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [drag, stageSize, overlayPos, settings.position]);

  // Background "video" — animated placeholder
  const BgVid = () => <FakeGameBackground variant={aspect === '9:16' ? 'tiktok' : 'gaming'}/>;

  // Active alert
  const activeAlert = useMemoS(() => {
    return messages.find(m => m.kind === 'system' && m.t <= t && m.t > t - 2.5);
  }, [messages, t]);

  // Handle timeline click
  const onTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setT(pct * duration);
  };

  // Helper: time format
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    const ms = Math.floor((s % 1) * 100);
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}.${ms.toString().padStart(2,'0')}`;
  };

  // Build the chat overlay based on settings
  const overlayStyle = {
    width: '100%', height: '100%',
    fontSize: settings.fontSize,
    borderRadius: settings.radius,
  };
  const overlayOptions = {
    showHeader: settings.showHeader,
    showLive: settings.showLive,
    showBadges: settings.showBadges,
    showInput: settings.showInput,
    viewers: '12.4K',
  };

  return (
    <div className="st-app">
      {/* Custom CSS injected live */}
      <style>{css}</style>

      {/* TOP BAR */}
      <div className="st-topbar">
        <a href="index.html" className="st-iconbtn" title="Back" style={{textDecoration:'none'}}><Ic.back/></a>
        <div className="brand" style={{color:'#fff', fontSize:18}}>FAKEITT<span className="brand-dot" style={{background:'#9fe870'}}/></div>
        <input className="st-project-name" defaultValue="Untitled stream — Valorant playthrough"/>
        <div className="st-pill"><span className="dot"/>Auto-saved · 2s ago</div>
        <div className="st-topbar-meta">
          <div className="st-pill" style={{color:'var(--st-accent)'}}>{aspect} · {Math.round(stageSize.w)}×{Math.round(stageSize.h)}</div>
          <button className="st-btn st-btn-ghost"><Ic.upload/> Replace video</button>
          <button className="st-btn st-btn-primary"><Ic.download/> Export</button>
        </div>
      </div>

      {/* LEFT */}
      <aside className="st-left">
        <div className="st-section">
          <div className="st-section-h">Platform</div>
          <div className="st-platform-grid">
            {PLATFORMS_S.map(p => (
              <div key={p.id} className={'st-platform' + (platform === p.id ? ' is-active' : '')} onClick={() => setPlatform(p.id)}>
                <span className="swatch" style={{background: p.accent}}/>
                {p.name}
              </div>
            ))}
          </div>
        </div>

        <div className="st-section">
          <div className="st-section-h">
            <span>Aspect ratio</span>
            <span style={{fontSize:9, color:'var(--st-accent)', fontWeight:700}}>AUTO-DETECTED</span>
          </div>
          <Segment
            value={aspect}
            options={[{v:'16:9', l:'16:9 Horizontal'}, {v:'9:16', l:'9:16 Vertical'}]}
            onChange={setAspect}
          />
        </div>

        <div className="st-section">
          <div className="st-section-h">
            <span>Scenes</span>
            <Ic.plus className="add"/>
          </div>
          <div className="st-scenes">
            {SCENES.map(s => (
              <div key={s.id} className={'st-scene' + (scene === s.id ? ' is-active' : '')} onClick={() => setScene(s.id)}>
                <span className="icon">{s.icon}</span>
                <span>{s.name}</span>
                {s.live && <span style={{background:'var(--st-accent)', color:'var(--st-accent-fg)', fontSize:9, padding:'1px 6px', borderRadius:3, fontWeight:800}}>LIVE</span>}
                <span className="meta">{s.shortcut}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="st-section" style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div className="st-section-h">
            <span>Chat script ({messages.length})</span>
            <Ic.plus className="add" onClick={addMessage}/>
          </div>
          <div className="st-message-list" style={{flex:1, overflowY:'auto'}}>
            {messages.sort((a,b)=>a.t-b.t).map(m => {
              const isActive = m.t <= t && m.t > t - 1.5;
              const isSelected = selectedId === m.id;
              return (
                <div
                  key={m.id}
                  className={'st-msg-row' + (isSelected ? ' is-selected' : '') + (isActive ? ' is-active' : '')}
                  onClick={() => { setSelectedId(m.id); setTab('message'); }}
                >
                  <div className="st-msg-time">{m.t.toFixed(1)}s</div>
                  <div className="st-msg-content">
                    <div className="st-msg-user" style={{color: m.kind === 'system' ? 'var(--st-accent)' : colorFor(m.user, KICK_PALETTE)}}>
                      {m.kind !== 'normal' && m.kind !== 'system' && <span className={'st-msg-kind ' + m.kind}>{m.kind}</span>}
                      {m.kind === 'system' && <span className="st-msg-kind system">SYS</span>}
                      {m.user}
                    </div>
                    <div className="st-msg-text">{m.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* STAGE */}
      <div className="st-stage" ref={stageRef}>
        <div className="st-stage-toolbar">
          <button className="st-iconbtn is-active" title="Cursor"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-7 1-3 7z"/></svg></button>
          <button className="st-iconbtn" title="Add overlay"><Ic.plus/></button>
          <button className="st-iconbtn" title="Add alert"><Ic.bell/></button>
          <button className="st-iconbtn" title="Add text"><Ic.type/></button>
          <button className="st-iconbtn" title="Layouts"><Ic.layout/></button>
        </div>

        <div className="st-canvas" style={{ width: stageSize.w, height: stageSize.h }}>
          <div className="st-canvas-vid">
            <BgVid/>
          </div>

          {/* Stream chrome */}
          <div className="st-canvas-chrome">
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <div style={{background:'#ff0000', color:'#fff', fontSize:11, fontWeight:800, padding:'3px 8px', borderRadius:3, letterSpacing:'0.05em'}}>● LIVE</div>
              <div style={{background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:3}}>👁 {(12000 + Math.floor(t * 100)).toLocaleString()}</div>
            </div>
            <div style={{color:'#fff', fontSize:11, fontWeight:700, fontFamily:'monospace', background:'rgba(0,0,0,0.5)', padding:'3px 8px', borderRadius:3}}>
              {fmt(t)}
            </div>
          </div>

          {/* Chat overlay - draggable */}
          <div
            className={'st-overlay-handle' + (drag !== null ? ' is-selected' : '')}
            style={{
              top: overlayPos.top,
              left: overlayPos.left,
              width: overlayPos.width,
              height: overlayPos.height,
              opacity: settings.opacity / 100,
            }}
            onMouseDown={onDragStart}
          >
            <div style={{ width:'100%', height:'100%', pointerEvents:'none' }}>
              <ChatOverlay platform={platform} messages={visibleMessages} options={overlayOptions}/>
            </div>
            <div className="resize"/>
          </div>

          {/* Active alert */}
          {activeAlert && (
            <div className="st-alert" style={{
              bottom: 30, left: 30,
              border: `2px solid ${PLATFORMS_S.find(p => p.id === platform).accent}`,
              minWidth: 240,
            }}>
              <div style={{fontSize:10, color: PLATFORMS_S.find(p => p.id === platform).accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em'}}>System alert</div>
              <div style={{fontSize:14, fontWeight:600, marginTop:2}}>{activeAlert.text}</div>
            </div>
          )}

          {/* Watermark */}
          {settings.showWatermark && (
            <div style={{position:'absolute', bottom:8, left:8, fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'monospace', fontWeight:700, letterSpacing:'0.04em', zIndex:6}}>
              FAKEITT.COM
            </div>
          )}
        </div>

        <div className="st-stage-zoom">
          <span>FIT</span>
          <span style={{color:'var(--st-text)'}}>· 100%</span>
        </div>
      </div>

      {/* RIGHT */}
      <aside className="st-right">
        <div className="st-tabs">
          <div className={'st-tab' + (tab === 'visual' ? ' is-active' : '')} onClick={() => setTab('visual')}>Visual</div>
          <div className={'st-tab' + (tab === 'css' ? ' is-active' : '')} onClick={() => setTab('css')}>CSS</div>
          <div className={'st-tab' + (tab === 'message' ? ' is-active' : '')} onClick={() => setTab('message')}>Message</div>
        </div>
        <div style={{flex:1, overflowY:'auto'}}>
          {tab === 'visual' && <VisualEditor settings={settings} setSetting={setSetting} platform={platform}/>}
          {tab === 'css' && <CSSEditor css={css} setCss={setCss}/>}
          {tab === 'message' && (
            <MessageEditor
              message={selected}
              onChange={updateMessage}
              onDelete={() => deleteMessage(selectedId)}
              currentTime={t}
            />
          )}
        </div>
      </aside>

      {/* TIMELINE */}
      <div className="st-timeline">
        <div className="st-tl-controls">
          <button className="st-iconbtn" onClick={() => setPlaying(p => !p)} style={{color:'var(--st-accent)'}}>
            {playing ? <Ic.pause/> : <Ic.play/>}
          </button>
          <div className="st-tl-time">{fmt(t)} <span className="total">/ {fmt(duration)}</span></div>
          <div style={{flex:1}}/>
          <button className="st-btn st-btn-ghost" onClick={addMessage}><Ic.plus/> Add at playhead</button>
          <div className="st-pill" style={{color:'var(--st-accent)'}}>● Recording</div>
        </div>
        <div style={{position:'relative', flex:1, display:'flex', alignItems:'center'}}>
          <div className="st-tl-track" onClick={onTimelineClick}>
            <div className="st-tl-progress" style={{width: `${(t/duration)*100}%`}}/>
            {messages.map(m => (
              <div
                key={m.id}
                className={'st-tl-marker kind-' + (m.kind === 'normal' ? 'user' : m.kind) + (selectedId === m.id ? ' is-selected' : '')}
                style={{ left: `${(m.t/duration)*100}%` }}
                title={`${m.t.toFixed(1)}s · ${m.user}: ${m.text}`}
                onClick={(e) => { e.stopPropagation(); setSelectedId(m.id); setTab('message'); }}
              />
            ))}
            <div className="st-tl-playhead" style={{left: `${(t/duration)*100}%`}}/>
          </div>
        </div>
        <div className="st-tl-ruler">
          <span>0:00</span><span>0:09</span><span>0:18</span><span>0:27</span><span>0:36</span><span>0:45</span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<StudioApp />);
