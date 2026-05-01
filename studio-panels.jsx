// Studio — properties panel components

const { useState: useStateP, useMemo: useMemoP } = React;

// Icon helpers
const Ic = {
  play: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}><polygon points="6 4 20 12 6 20"/></svg>,
  pause: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  plus: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  upload: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  download: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  back: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  film: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  cog: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  bell: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  code: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  type: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  layout: (props) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
};

function Toggle({ value, onChange }) {
  return <div className={'st-toggle' + (value ? ' is-on' : '')} onClick={() => onChange(!value)}/>;
}
function Slider({ value, onChange, min = 0, max = 100, step = 1 }) {
  return <input type="range" className="st-slider" value={value} min={min} max={max} step={step} onChange={e => onChange(parseFloat(e.target.value))}/>;
}
function Segment({ value, options, onChange }) {
  return (
    <div className="st-segment">
      {options.map(o => (
        <div key={o.v} className={'st-seg' + (value === o.v ? ' is-active' : '')} onClick={() => onChange(o.v)}>{o.l}</div>
      ))}
    </div>
  );
}
function PositionPicker({ value, onChange }) {
  // 9 cells: TL TC TR ML MC MR BL BC BR
  const cells = ['TL','TC','TR','ML','MC','MR','BL','BC','BR'];
  const enabled = ['TL','TR','BL','BR'];
  return (
    <div className="st-position-grid">
      {cells.map(c => (
        <div
          key={c}
          className={'st-position-cell' + (value === c ? ' is-active' : '') + (!enabled.includes(c) ? ' disabled' : '')}
          onClick={() => enabled.includes(c) && onChange(c)}
        />
      ))}
    </div>
  );
}

// ---------- VISUAL EDITOR PANEL ----------
function VisualEditor({ settings, setSetting, platform }) {
  const colors = {
    kick: ['#53fc18', '#ff5733', '#33b5ff', '#ffaa33', '#cc66ff', '#ff66aa'],
    twitch: ['#9146ff', '#ff7f50', '#0084ff', '#00ff7f', '#ff1493', '#ffd700'],
    youtube: ['#0066cc', '#4caf50', '#9c27b0', '#ff5722', '#607d8b', '#e91e63'],
    tiktok: ['#fe2c55', '#25f4ee', '#ff5733', '#ffd700', '#ff66aa', '#9146ff'],
  }[platform] || ['#9fe870'];

  return (
    <>
      <div className="st-prop-group">
        <div className="st-prop-h">Position</div>
        <div className="st-prop-row" style={{alignItems:'flex-start'}}>
          <div className="st-prop-label">Anchor</div>
          <PositionPicker value={settings.position} onChange={v => setSetting('position', v)}/>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Width</div>
          <Slider value={settings.width} min={200} max={600} onChange={v => setSetting('width', v)}/>
          <div className="st-prop-val">{settings.width}px</div>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Height</div>
          <Slider value={settings.height} min={200} max={800} onChange={v => setSetting('height', v)}/>
          <div className="st-prop-val">{settings.height}px</div>
        </div>
      </div>

      <div className="st-prop-group">
        <div className="st-prop-h">Appearance</div>
        <div className="st-prop-row">
          <div className="st-prop-label">Background opacity</div>
          <Slider value={settings.opacity} min={0} max={100} onChange={v => setSetting('opacity', v)}/>
          <div className="st-prop-val">{settings.opacity}%</div>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Font size</div>
          <Slider value={settings.fontSize} min={10} max={22} onChange={v => setSetting('fontSize', v)}/>
          <div className="st-prop-val">{settings.fontSize}px</div>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Border radius</div>
          <Slider value={settings.radius} min={0} max={24} onChange={v => setSetting('radius', v)}/>
          <div className="st-prop-val">{settings.radius}px</div>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Message padding</div>
          <Slider value={settings.padding} min={2} max={16} onChange={v => setSetting('padding', v)}/>
          <div className="st-prop-val">{settings.padding}px</div>
        </div>
      </div>

      <div className="st-prop-group">
        <div className="st-prop-h">Behavior</div>
        <div className="st-prop-row">
          <div className="st-prop-label">Max visible</div>
          <Slider value={settings.maxMessages} min={5} max={50} onChange={v => setSetting('maxMessages', v)}/>
          <div className="st-prop-val">{settings.maxMessages}</div>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Message speed</div>
          <Slider value={settings.speed * 100} min={50} max={200} onChange={v => setSetting('speed', v / 100)}/>
          <div className="st-prop-val">{settings.speed.toFixed(1)}x</div>
        </div>
      </div>

      <div className="st-prop-group">
        <div className="st-prop-h">Toggles</div>
        {[
          ['showHeader', 'Header'],
          ['showLive', 'LIVE indicator'],
          ['showViewers', 'Viewer count'],
          ['showBadges', 'Badges'],
          ['showTimestamps', 'Timestamps'],
          ['showInput', 'Input box'],
          ['showWatermark', 'FAKEITT watermark'],
        ].map(([k, l]) => (
          <div className="st-prop-row" key={k}>
            <div className="st-prop-label">{l}</div>
            <Toggle value={settings[k]} onChange={v => setSetting(k, v)}/>
          </div>
        ))}
      </div>

      <div className="st-prop-group">
        <div className="st-prop-h">Username palette</div>
        <div className="st-color-grid">
          {colors.map((c, i) => <div key={i} className="st-color is-active" style={{background: c}}/>)}
        </div>
        <div style={{fontSize:11, color:'var(--st-text-3)', marginTop:8, lineHeight:1.5}}>Auto-assigned per username. Edit individuals from the chat panel.</div>
      </div>
    </>
  );
}

// ---------- CSS EDITOR PANEL ----------
function CSSEditor({ css, setCss }) {
  return (
    <>
      <div className="st-prop-group">
        <div className="st-prop-h" style={{display:'flex', justifyContent:'space-between'}}>
          <span>Custom CSS</span>
          <span style={{color:'var(--st-accent)', fontSize:10, fontWeight:700}}>● LIVE</span>
        </div>
        <div style={{fontSize:11, color:'var(--st-text-3)', marginBottom:10, lineHeight:1.5}}>
          Override any overlay style. Targets: <code style={{color:'var(--st-accent)'}}>.kick-chat</code>, <code style={{color:'var(--st-accent)'}}>.chat-header</code>, <code style={{color:'var(--st-accent)'}}>.chat-message</code>, <code style={{color:'var(--st-accent)'}}>.chat-username</code>, <code style={{color:'var(--st-accent)'}}>.chat-text</code>
        </div>
        <textarea
          className="st-css-editor"
          value={css}
          onChange={e => setCss(e.target.value)}
          spellCheck={false}
        />
      </div>
      <div className="st-prop-group">
        <div className="st-prop-h">Snippets</div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          {[
            ['Glow usernames', `.chat-username {\n  text-shadow: 0 0 8px currentColor;\n}`],
            ['Bigger messages', `.chat-message {\n  font-size: 16px;\n  padding: 6px 10px;\n}`],
            ['Hide header', `.chat-header {\n  display: none;\n}`],
            ['Solid background', `.kick-chat {\n  background: #000 !important;\n  border: 0;\n}`],
          ].map(([label, snippet]) => (
            <button key={label} className="st-btn st-btn-ghost" style={{justifyContent:'space-between'}} onClick={() => setCss(css + '\n\n' + snippet)}>
              <span>{label}</span>
              <span style={{color:'var(--st-text-3)', fontSize:11}}>+ insert</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ---------- MESSAGE EDITOR ----------
function MessageEditor({ message, onChange, onDelete, currentTime, onSetTime }) {
  if (!message) {
    return (
      <div className="st-prop-group">
        <div style={{textAlign:'center', padding:'40px 20px', color:'var(--st-text-3)', fontSize:13, lineHeight:1.5}}>
          Select a message from the timeline or chat list to edit it.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="st-prop-group">
        <div className="st-prop-h" style={{display:'flex', justifyContent:'space-between'}}>
          <span>Edit message</span>
          <span className="st-iconbtn" style={{color:'var(--st-danger)', width:'auto', padding:'0 8px', fontSize:11}} onClick={onDelete}>delete</span>
        </div>
        <div className="st-prop-row">
          <div className="st-prop-label">Timestamp</div>
          <input className="st-input" value={message.t.toFixed(2)} onChange={e => onChange({...message, t: parseFloat(e.target.value) || 0})}/>
        </div>
        <div className="st-prop-row">
          <button className="st-btn st-btn-ghost" style={{width:'100%', fontSize:11}} onClick={() => onChange({...message, t: currentTime})}>
            Set to playhead ({currentTime.toFixed(2)}s)
          </button>
        </div>
      </div>
      <div className="st-prop-group">
        <div className="st-prop-h">User</div>
        <input className="st-input" style={{width:'100%', marginBottom:8}} value={message.user} onChange={e => onChange({...message, user: e.target.value})}/>
        <div className="st-prop-row">
          <div className="st-prop-label">Type</div>
          <Segment
            value={message.kind}
            options={[
              {v:'normal', l:'User'},
              {v:'mod', l:'Mod'},
              {v:'vip', l:'VIP'},
              {v:'sub', l:'Sub'},
              {v:'system', l:'Sys'},
            ]}
            onChange={v => onChange({...message, kind: v})}
          />
        </div>
      </div>
      <div className="st-prop-group">
        <div className="st-prop-h">Message</div>
        <textarea className="st-textarea" value={message.text} onChange={e => onChange({...message, text: e.target.value})}/>
      </div>
    </>
  );
}

Object.assign(window, { VisualEditor, CSSEditor, MessageEditor, Toggle, Slider, Segment, PositionPicker, Ic });
