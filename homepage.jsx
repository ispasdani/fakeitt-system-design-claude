// FAKEITT.COM — Homepage components

const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

const PLATFORMS = [
  { id: 'kick', name: 'Kick', accent: '#53fc18', dark: true, desc: 'Lime-green energy. The streamer-first one.', tagline: 'Look like a Kick streamer.' },
  { id: 'twitch', name: 'Twitch', accent: '#9146ff', dark: true, desc: 'Purple legacy. The default expectation.', tagline: 'The classic purple chat.' },
  { id: 'youtube', name: 'YouTube Live', accent: '#ff0033', dark: false, desc: 'Clean white chat. Top-chat sorting included.', tagline: 'Pretend you went live on YT.' },
  { id: 'tiktok', name: 'TikTok Live', accent: '#fe2c55', dark: true, desc: 'Bottom-up bubbles, gifts and roses.', tagline: 'Vertical, mobile, gifts on tap.' },
];

// Fake video bg for hero — animated gradient blobs simulating a game scene
function FakeGameBackground({ variant = 'gaming' }) {
  if (variant === 'tiktok') {
    return (
      <div style={{
        position:'absolute', inset:0,
        background: 'linear-gradient(180deg, #2d1b4e 0%, #4a1858 50%, #1a0d2e 100%)',
        overflow:'hidden'
      }}>
        <div style={{position:'absolute', top:'30%', left:'40%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, #fe2c55 0%, transparent 70%)', filter:'blur(40px)'}}/>
        <div style={{position:'absolute', top:'50%', left:'30%', width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, #25f4ee 0%, transparent 70%)', filter:'blur(40px)'}}/>
      </div>
    );
  }
  if (variant === 'youtube') {
    return (
      <div style={{
        position:'absolute', inset:0,
        background: 'linear-gradient(135deg, #1a3a5c 0%, #0f1f3a 50%, #2a1845 100%)',
        overflow:'hidden'
      }}>
        <div style={{position:'absolute', top:'20%', left:'25%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, #ff6b35 0%, transparent 70%)', filter:'blur(60px)'}}/>
        <div style={{position:'absolute', top:'60%', right:'20%', width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, #ffd700 0%, transparent 70%)', filter:'blur(50px)', opacity:0.5}}/>
      </div>
    );
  }
  return (
    <div style={{
      position:'absolute', inset:0,
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2540 40%, #2d1b4e 100%)',
      overflow:'hidden'
    }}>
      <div style={{position:'absolute', top:'10%', left:'30%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, #ff3b3b 0%, transparent 70%)', filter:'blur(60px)', opacity:0.6}}/>
      <div style={{position:'absolute', top:'40%', right:'10%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, #00d9ff 0%, transparent 70%)', filter:'blur(60px)', opacity:0.5}}/>
      <div style={{position:'absolute', bottom:'10%', left:'10%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, #9146ff 0%, transparent 70%)', filter:'blur(50px)', opacity:0.6}}/>
      {/* Fake game UI hint */}
      <div style={{position:'absolute', top:16, left:16, color:'#fff', fontFamily:'monospace', fontSize:11, opacity:0.6}}>
        <div style={{background:'rgba(255,0,0,0.7)', padding:'2px 8px', borderRadius:2, marginBottom:4, display:'inline-block'}}>● REC</div>
        <div>HP 78/100 · MP 42/60</div>
      </div>
      <div style={{position:'absolute', bottom:16, left:16, color:'#fff', fontFamily:'monospace', fontSize:10, opacity:0.7}}>
        <div>K/D 14/3 · 247 dmg</div>
      </div>
    </div>
  );
}

// ---------- NAV ----------
function NavBar() {
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <div className="brand">FAKEITT<span className="brand-dot"/></div>
        <div className="nav-links">
          <a className="nav-link is-active">Templates</a>
          <a className="nav-link">How it works</a>
          <a className="nav-link">Pricing</a>
          <a className="nav-link">Showcase</a>
          <a className="nav-link">FAQ</a>
        </div>
        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm">Sign in</button>
          <a href="studio.html" className="btn btn-primary btn-sm" style={{textDecoration:'none'}}>Open studio →</a>
        </div>
      </nav>
    </header>
  );
}

// ---------- HERO ----------
function Hero() {
  const [t] = useFakePlayback({ duration: 22, loop: true, playing: true });
  const messages = useScheduledMessages(SAMPLE_MESSAGES, t, 12);
  return (
    <section className="hero">
      <div>
        <div className="hero-eyebrow"><span className="dot"/>Live demo · always on</div>
        <h1 className="fk-display">
          Look <span className="strike">live</span>.<br/>
          Without<br/>
          going live.
        </h1>
        <p className="hero-sub">
          Drop in a video. Pick a streaming platform. Slap a fake chat over the top — with custom messages, alerts, and viewers timed to the second. Looks identical to Kick, Twitch, YouTube, or TikTok.
        </p>
        <div className="hero-ctas">
          <a href="studio.html" className="btn btn-primary btn-lg" style={{textDecoration:'none'}}>Start faking →</a>
          <button className="btn btn-ghost btn-lg">Watch the demo</button>
        </div>
        <div className="hero-trust" style={{marginTop:24}}>
          No download. Browser-only. Used by 240k+ creators.
        </div>
      </div>
      <div className="hero-preview">
        <FakeGameBackground variant="gaming"/>
        {/* Stream chrome */}
        <div style={{position:'absolute', top:14, left:14, display:'flex', gap:8, alignItems:'center', zIndex:3}}>
          <div style={{background:'#ff0000', color:'#fff', fontSize:10, fontWeight:800, padding:'3px 8px', borderRadius:2, letterSpacing:'0.05em'}}>● LIVE</div>
          <div style={{background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:10, fontWeight:600, padding:'3px 8px', borderRadius:2}}>👁 12,478</div>
        </div>
        <div style={{position:'absolute', top:14, right:14, color:'#fff', fontSize:11, fontWeight:700, fontFamily:'monospace', background:'rgba(0,0,0,0.5)', padding:'4px 8px', borderRadius:4, zIndex:3}}>
          00:32:51
        </div>
        {/* Chat overlay - kick style */}
        <div style={{position:'absolute', top:50, right:14, bottom:14, width:'38%', minWidth:240, zIndex:4}}>
          <KickChat messages={messages} options={{viewers:'12.4K', showInput: false}}/>
        </div>
      </div>
    </section>
  );
}

// ---------- TICKER ----------
function Ticker() {
  const items = ['kick.', 'twitch.', 'youtube live.', 'tiktok live.', 'discord.', 'facebook gaming.'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <div className="ticker-item" key={i}>
            <span className="accent">fake</span> {item}
            <span className="star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- TEMPLATE CAROUSEL ----------
function TemplateCarousel() {
  const [active, setActive] = useStateH(0);
  const platform = PLATFORMS[active];
  const [t] = useFakePlayback({ duration: 22, loop: true, playing: true });
  const messages = useScheduledMessages(SAMPLE_MESSAGES, t, 14);

  const stageRef = useRefH(null);

  const isVertical = platform.id === 'tiktok';

  return (
    <section className="section">
      <h2 className="fk-display section-h">Pick your<br/>fake reality.</h2>
      <p className="section-sub">Four pixel-perfect chat overlays. Switch any time. Each one looks identical to the real thing — your viewers will never know.</p>

      <div className="tpl-tabs">
        {PLATFORMS.map((p, i) => (
          <div key={p.id} className={'tpl-tab' + (active === i ? ' is-active' : '')} onClick={() => setActive(i)}>
            <span className="swatch" style={{background: p.accent}}/>
            {p.name}
          </div>
        ))}
      </div>

      <div className="tpl-stage" ref={stageRef} style={{ background: isVertical ? '#0a0a0a' : '#0e0f0c' }}>
        {/* Background "video" */}
        <FakeGameBackground variant={platform.id}/>

        {/* Stream chrome */}
        <div style={{position:'absolute', top:18, left:18, display:'flex', gap:10, alignItems:'center', zIndex:3}}>
          <div style={{background:'#ff0000', color:'#fff', fontSize:11, fontWeight:800, padding:'4px 10px', borderRadius:3, letterSpacing:'0.05em'}}>● LIVE</div>
          <div style={{background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:12, fontWeight:600, padding:'4px 10px', borderRadius:3}}>👁 24,891</div>
          <div style={{background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:3}}>{platform.name === 'TikTok Live' ? '@yourhandle' : 'Just Chatting'}</div>
        </div>
        <div style={{position:'absolute', top:18, right:18, color:'#fff', fontSize:13, fontWeight:700, fontFamily:'monospace', background:'rgba(0,0,0,0.5)', padding:'5px 10px', borderRadius:4, zIndex:3}}>
          02:14:08
        </div>

        {/* Chat overlay positioned per platform */}
        {isVertical ? (
          <div style={{position:'absolute', left: '50%', top: 0, bottom: 0, transform: 'translateX(-50%)', width: '32%', maxWidth: 320, zIndex: 4}}>
            <FakeGameBackground variant="tiktok"/>
            <div style={{position:'absolute', inset:0, zIndex:5}}>
              <ChatOverlay platform={platform.id} messages={messages}/>
            </div>
            <div style={{position:'absolute', top:14, left:14, right:14, display:'flex', justifyContent:'space-between', alignItems:'center', color:'#fff', zIndex:6}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <div style={{width:32, height:32, borderRadius:'50%', background:'#fe2c55'}}/>
                <div>
                  <div style={{fontSize:12, fontWeight:700}}>@yourhandle</div>
                  <div style={{fontSize:10, opacity:0.7}}>👁 24.8K</div>
                </div>
                <button style={{background:'#fe2c55', color:'#fff', border:0, padding:'4px 10px', borderRadius:4, fontSize:11, fontWeight:700}}>Follow</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{position:'absolute', top: 60, right: 18, bottom: 18, width: '32%', minWidth: 280, maxWidth: 360, zIndex: 4}}>
            <ChatOverlay platform={platform.id} messages={messages}/>
          </div>
        )}

        {/* Stream alert (subscriber alert) - shows briefly */}
        {(t > 4 && t < 7) && (
          <div style={{position:'absolute', bottom:30, left:30, background:'rgba(0,0,0,0.85)', color:'#fff', padding:'14px 20px', borderRadius:8, border:`2px solid ${platform.accent}`, zIndex:5, animation:'msgin 300ms ease', minWidth:280}}>
            <div style={{fontSize:11, color: platform.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em'}}>New {platform.id === 'youtube' ? 'Member' : platform.id === 'tiktok' ? 'Follower' : 'Subscriber'}</div>
            <div style={{fontSize:18, fontWeight:700, marginTop:2}}>VividVortex</div>
            <div style={{fontSize:13, opacity:0.85, marginTop:2}}>thanks for the {platform.id === 'tiktok' ? 'roses' : 'sub'} 💚</div>
          </div>
        )}

        {/* Carousel arrows */}
        <button className="tpl-arrow left" onClick={() => setActive((active - 1 + PLATFORMS.length) % PLATFORMS.length)} aria-label="Previous">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e0f0c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="tpl-arrow right" onClick={() => setActive((active + 1) % PLATFORMS.length)} aria-label="Next">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e0f0c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div className="tpl-stage-meta">
        <div>
          <div className="tpl-meta-name" style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{width:14, height:14, borderRadius:'50%', background: platform.accent, display:'inline-block'}}/>
            {platform.tagline}
          </div>
          <div className="tpl-meta-desc">{platform.desc}</div>
        </div>
        <div className="tpl-meta-actions">
          <button className="btn btn-ghost btn-md">Preview</button>
          <a href={`studio.html?platform=${platform.id}`} className="btn btn-primary btn-md" style={{textDecoration:'none'}}>Use this template →</a>
        </div>
      </div>
    </section>
  );
}

// ---------- HOW IT WORKS ----------
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Drop in your video.',
      body: 'Drag any clip — gameplay, vlog, music, whatever. We auto-detect 16:9 vs 9:16 so it lines up with the platform you\'re faking.',
      illust: 'upload',
    },
    {
      n: '02',
      title: 'Pick a platform.',
      body: 'Kick, Twitch, YouTube Live, or TikTok Live. Pixel-perfect chat overlays, badges, alerts, viewer counts — all of it.',
      illust: 'platforms',
    },
    {
      n: '03',
      title: 'Script the chat.',
      body: 'Type messages, pick a username and badge, drop them at exact timestamps. Add alerts, raids, gifted subs. Or write CSS and tweak everything.',
      illust: 'editor',
    },
  ];

  return (
    <section className="how">
      <div className="how-inner">
        <h2 className="fk-display section-h" style={{maxWidth: 900}}>Three steps.<br/>Zero broadcasting.</h2>
        <div className="how-grid">
          {steps.map(s => (
            <article key={s.n} className="how-step">
              <div className="how-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="how-illust">
                <HowIllust kind={s.illust}/>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIllust({ kind }) {
  if (kind === 'upload') {
    return (
      <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, background:'#fff', border:'2px dashed rgba(14,15,12,0.2)', borderRadius:16}}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#163300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <div style={{fontSize:13, fontWeight:700}}>Drop video here</div>
        <div style={{fontSize:11, color:'#868685', fontWeight:400}}>MP4, MOV, WebM · up to 1GB</div>
      </div>
    );
  }
  if (kind === 'platforms') {
    return (
      <div style={{position:'absolute', inset:0, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, padding:12}}>
        {PLATFORMS.map(p => (
          <div key={p.id} style={{background: p.dark ? '#0e0f0c' : '#fff', border:`2px solid ${p.accent}`, borderRadius:8, padding:10, display:'flex', flexDirection:'column', gap:6, justifyContent:'center'}}>
            <div style={{width:10, height:10, borderRadius:'50%', background: p.accent}}/>
            <div style={{fontSize:11, fontWeight:700, color: p.dark ? '#fff' : '#0e0f0c'}}>{p.name}</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'editor') {
    return (
      <div style={{position:'absolute', inset:0, background:'#0e0f0c', borderRadius:16, padding:12, display:'flex', flexDirection:'column', gap:6, fontFamily:'monospace', fontSize:10, color:'#cdffad'}}>
        <div style={{display:'flex', gap:6, alignItems:'center', color:'#868685'}}>
          <span style={{color:'#9fe870'}}>00:14.2</span>
          <span style={{color:'#fff'}}>@VividVortex</span>
          <span style={{color:'#cdffad'}}>just followed!</span>
        </div>
        <div style={{display:'flex', gap:6, alignItems:'center', color:'#868685'}}>
          <span style={{color:'#9fe870'}}>00:18.5</span>
          <span style={{color:'#fff'}}>@JJB44</span>
          <span style={{color:'#cdffad'}}>use your special</span>
        </div>
        <div style={{display:'flex', gap:6, alignItems:'center', color:'#868685'}}>
          <span style={{color:'#9fe870'}}>00:23.1</span>
          <span style={{color:'#e91e63'}}>[VIP] 6sidi</span>
          <span style={{color:'#cdffad'}}>thats fire 🔥</span>
        </div>
        <div style={{height:1, background:'#454745', margin:'4px 0'}}/>
        <div style={{display:'flex', gap:4}}>
          <span style={{background:'#9fe870', color:'#163300', padding:'2px 6px', borderRadius:3, fontWeight:700}}>+ msg</span>
          <span style={{background:'rgba(255,255,255,0.06)', color:'#fff', padding:'2px 6px', borderRadius:3}}>+ alert</span>
        </div>
      </div>
    );
  }
  return null;
}

// ---------- FEATURES ----------
function FeatureGrid() {
  return (
    <section className="section">
      <h2 className="fk-display section-h">Everything<br/>you can fake.</h2>
      <div className="feat-grid">
        <div className="feat dark span-2" style={{minHeight:280}}>
          <span className="feat-tag">Scripted chat</span>
          <h3>Time messages to the millisecond.</h3>
          <p>Add chat messages, mod warnings, system alerts, raids, and gifted subs at exact timestamps. Five badge types. Curated username palettes per platform.</p>
          <div style={{marginTop:'auto', display:'flex', gap:8, flexWrap:'wrap'}}>
            {['normal', 'mod', 'VIP', 'sub', 'system'].map(b => (
              <span key={b} style={{background:'rgba(159,232,112,0.15)', color:'#9fe870', padding:'4px 10px', borderRadius:9999, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em'}}>{b}</span>
            ))}
          </div>
        </div>
        <div className="feat green">
          <span className="feat-tag">Drag · drop · resize</span>
          <h3>Pixel-perfect overlay control.</h3>
          <p>Move the chat anywhere. Resize it, snap it, mirror it. Position presets for every platform.</p>
          <div style={{marginTop:'auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:6}}>
            <div style={{background:'rgba(22,51,0,0.15)', borderRadius:6, padding:8, fontSize:11, fontWeight:600, textAlign:'center'}}>↗ TR</div>
            <div style={{background:'#163300', color:'#9fe870', borderRadius:6, padding:8, fontSize:11, fontWeight:600, textAlign:'center'}}>↘ BR ●</div>
            <div style={{background:'rgba(22,51,0,0.15)', borderRadius:6, padding:8, fontSize:11, fontWeight:600, textAlign:'center'}}>↖ TL</div>
            <div style={{background:'rgba(22,51,0,0.15)', borderRadius:6, padding:8, fontSize:11, fontWeight:600, textAlign:'center'}}>↙ BL</div>
          </div>
        </div>
        <div className="feat">
          <span className="feat-tag">Aspect ratios</span>
          <h3>16:9 or 9:16.<br/>We auto-detect.</h3>
          <p>Horizontal for Twitch and YouTube, vertical for TikTok. Same video, two formats, one click.</p>
          <div style={{marginTop:'auto', display:'flex', gap:8, alignItems:'flex-end'}}>
            <div style={{width:80, height:45, background:'#0e0f0c', borderRadius:4, position:'relative'}}><div style={{position:'absolute', bottom:4, right:4, color:'#9fe870', fontSize:9, fontWeight:800}}>16:9</div></div>
            <div style={{width:30, height:54, background:'#0e0f0c', borderRadius:4, position:'relative'}}><div style={{position:'absolute', bottom:4, right:4, color:'#fe2c55', fontSize:8, fontWeight:800}}>9:16</div></div>
          </div>
        </div>
        <div className="feat">
          <span className="feat-tag">CSS escape hatch</span>
          <h3>Write your own CSS.</h3>
          <p>Target <code style={{background:'rgba(0,0,0,0.06)', padding:'1px 4px', borderRadius:3, fontSize:13}}>.kick-chat</code>, <code style={{background:'rgba(0,0,0,0.06)', padding:'1px 4px', borderRadius:3, fontSize:13}}>.chat-message</code>, the lot. Total control, zero limits.</p>
          <pre style={{marginTop:'auto', background:'#0e0f0c', color:'#9fe870', padding:10, borderRadius:8, fontSize:11, lineHeight:1.4, fontFamily:'monospace', overflow:'hidden'}}>{`.chat-username {
  text-shadow: 0 0 8px;
  font-weight: 900;
}`}</pre>
        </div>
        <div className="feat span-2">
          <span className="feat-tag">Customization panel</span>
          <h3>Every dial, every slider.</h3>
          <p>Background opacity. Font size. Border radius. Padding. Max visible messages. Message speed. Toggle the header, badges, timestamps, live indicator, viewer count, watermark — independently.</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:'auto'}}>
            {[
              ['Opacity', '0.78'],
              ['Font size', '14px'],
              ['Width', '380px'],
              ['Radius', '6px'],
              ['Padding', '8px'],
              ['Max msgs', '50'],
            ].map(([k, v]) => (
              <div key={k} style={{background:'rgba(14,15,12,0.04)', padding:'10px 12px', borderRadius:10}}>
                <div style={{fontSize:11, color:'#868685', fontWeight:600}}>{k}</div>
                <div style={{fontSize:18, fontWeight:700, fontFamily:'var(--font-display)', letterSpacing:'-0.02em'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- PRICING ----------
function Pricing() {
  const tiers = [
    {
      name: 'Free',
      tag: 'Just messing around',
      price: '0',
      per: '/forever',
      featured: false,
      features: ['1 export per day', '720p max', 'Watermark', 'All 4 platform overlays', 'Basic chat editor', 'Community support'],
      foot: 'No card needed.',
      cta: 'Start free',
    },
    {
      name: 'Pro',
      tag: 'Most people',
      price: '12',
      per: '/month',
      featured: true,
      features: ['Unlimited exports', '4K · 60fps', 'No watermark', 'Custom CSS', 'Alert library (200+)', 'Project saving', 'Priority support'],
      foot: 'Cancel anytime.',
      cta: 'Go Pro →',
    },
    {
      name: 'Studio',
      tag: 'Agencies & teams',
      price: '49',
      per: '/month',
      featured: false,
      features: ['Everything in Pro', '5 seats', 'Brand kit', 'White-label exports', 'API access', 'Custom platforms', 'Dedicated support'],
      foot: 'Volume discounts.',
      cta: 'Get Studio',
    },
  ];

  return (
    <section className="section">
      <h2 className="fk-display section-h">Pricing<br/>without nonsense.</h2>
      <p className="section-sub">Real prices. Shown upfront. No surprise upgrades, no "contact sales" theatre.</p>
      <div className="price-grid">
        {tiers.map(t => (
          <div key={t.name} className={'price-card' + (t.featured ? ' featured' : '')}>
            <div>
              <div className="price-tag">{t.tag}</div>
              <div className="price-name">{t.name}</div>
            </div>
            <div className="price-amt">${t.price}<span className="per">{t.per}</span></div>
            <ul className="price-list">
              {t.features.map(f => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className={'btn btn-lg ' + (t.featured ? 'btn-primary' : 'btn-ghost')}>{t.cta}</button>
            <div className="price-foot">{t.foot}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- BIG CTA ----------
function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <h2 className="fk-display">Fake it.<br/>Then maybe make it.</h2>
        <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start'}}>
          <p>Build a streamer brand without ever opening OBS. Test thumbnails, practice on-camera, prank your friends — whatever you're up to.</p>
          <a href="studio.html" className="btn btn-dark btn-lg" style={{textDecoration:'none'}}>Open the studio →</a>
        </div>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  const cols = [
    ['Product', ['Studio', 'Templates', 'Pricing', 'Changelog']],
    ['Templates', ['Kick', 'Twitch', 'YouTube Live', 'TikTok Live']],
    ['Company', ['About', 'Manifesto', 'Careers', 'Press']],
    ['Resources', ['Help centre', 'CSS reference', 'Showcase', 'Status']],
  ];
  return (
    <footer className="foot">
      <div className="foot-top">
        <div>
          <div className="brand brand-on-dark" style={{color:'#fff', fontSize:30}}>FAKEITT<span className="brand-dot"/></div>
          <p style={{color:'#868685', fontSize:14, marginTop:16, maxWidth:280, fontWeight:400}}>Look live without going live. A creator tool, not a deception.</p>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}>
            <div className="foot-h">{h}</div>
            {links.map(l => <a key={l} className="foot-link">{l}</a>)}
          </div>
        ))}
      </div>
      <div className="foot-bot">
        <div>© 2026 FAKEITT.COM</div>
        <div style={{display:'flex', gap:18}}>
          <a style={{color:'#868685'}}>Privacy</a>
          <a style={{color:'#868685'}}>Terms</a>
          <a style={{color:'#868685'}}>Cookies</a>
        </div>
      </div>
      <div style={{maxWidth: 1280, margin:'24px auto 0'}} className="foot-disclaim">
        Not affiliated with Kick, Twitch, YouTube, TikTok, Discord, or Facebook. All trademarks belong to their respective owners. FAKEITT.COM is a creative tool for content creators — please don't use it to deceive people in harmful ways. We trust you.
      </div>
    </footer>
  );
}

Object.assign(window, {
  NavBar, Hero, Ticker, TemplateCarousel, HowItWorks,
  FeatureGrid, Pricing, CtaBanner, Footer, PLATFORMS, FakeGameBackground,
});
