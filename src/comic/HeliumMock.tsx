/**
 * Coded product previews of Helium, one per step of the client flow.
 *
 * These are illustrations of the flow, drawn in markup so they stay sharp and
 * match the page. Names, scores and dates are sample data. Swap any step for a
 * real screenshot by replacing its body with an <img>.
 */

export const STEPS = [
  { title: "Send a mandate", body: "Brief the role on Helium in a few minutes: scope, level, budget and who it reports to." },
  { title: "Applications in 48 hours", body: "Pre vetted professionals apply within 48 hours. Send your assignment to the ones you like in one click." },
  { title: "Review the work", body: "Compare assignments, portfolios and our notes side by side, with 20+ data points on every profile." },
  { title: "Bring in your team", body: "Add co founders and team leads. Everyone reviews, comments and votes in the same place." },
  { title: "Hire", body: "Make the offer. We handle the close, and you pay only once the hire is done." },
];

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="hm">
      <div className="hm-bar" aria-hidden="true">
        <span /><span /><span />
        <p>helium · {label}</p>
      </div>
      <div className="hm-body">{children}</div>
    </div>
  );
}

const Avatar = ({ i, size = 30 }: { i: number; size?: number }) => (
  <span className={`hm-av a${i % 5}`} style={{ width: size, height: size }} aria-hidden="true" />
);

function Mandate() {
  return (
    <Frame label="new mandate">
      <p className="hm-h">New mandate</p>
      <div className="hm-grid2">
        <div className="hm-field"><span>Role</span><b>Head of Content</b></div>
        <div className="hm-field"><span>Reports to</span><b>Chief Marketing Officer</b></div>
        <div className="hm-field"><span>Experience</span><b>7 to 10 years</b></div>
        <div className="hm-field"><span>Budget</span><b>₹ 38 to 45 LPA</b></div>
      </div>
      <div className="hm-field wide"><span>What this person will own</span>
        <b className="soft">YouTube and Instagram slate, a team of six, monthly content P&amp;L</b>
      </div>
      <div className="hm-chips">
        <i>Long form</i><i>Team lead</i><i>Brand storytelling</i><i>Mumbai or remote</i>
      </div>
      <div className="hm-actions"><span className="hm-btn">Send mandate</span><small>Shortlist promised in 72 hours</small></div>
    </Frame>
  );
}

function Applications() {
  const rows = [
    { n: "Applicant 01", t: "Content Lead, D2C brand · 8 yrs", s: 94, st: "Assignment sent" },
    { n: "Applicant 02", t: "Head of Video, studio · 7 yrs", s: 91, st: "Assignment sent" },
    { n: "Applicant 03", t: "Senior Strategist, media · 9 yrs", s: 88, st: "New" },
    { n: "Applicant 04", t: "Content Manager, fintech · 7 yrs", s: 83, st: "New" },
  ];
  return (
    <Frame label="applications">
      <div className="hm-row between">
        <p className="hm-h">Head of Content · 18 applications</p>
        <span className="hm-pill sun">Received in 41 hrs</span>
      </div>
      <div className="hm-list">
        {rows.map((r, i) => (
          <div className="hm-item" key={r.n}>
            <Avatar i={i} />
            <div className="hm-grow"><b>{r.n}</b><small>{r.t}</small></div>
            <span className="hm-score">{r.s}</span>
            <span className={r.st === "New" ? "hm-pill" : "hm-pill ok"}>{r.st}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Review() {
  const points = ["Team size led: 6", "Owned a ₹2 Cr content budget", "Grew a channel 0 to 400K", "Tracked by us for 16 months", "Notice period: 60 days", "Wants: P&L ownership"];
  return (
    <Frame label="review">
      <div className="hm-row">
        <Avatar i={1} size={44} />
        <div className="hm-grow"><b className="lg">Applicant 02</b><small>Head of Video at a creator studio · 7 yrs</small></div>
        <span className="hm-pill ok">Shortlisted</span>
      </div>
      <div className="hm-grid2 tight">
        <div className="hm-meter"><span>Assignment</span><b>9.1</b><i style={{ width: "91%" }} /></div>
        <div className="hm-meter"><span>Portfolio</span><b>8.7</b><i style={{ width: "87%" }} /></div>
      </div>
      <p className="hm-sub">From our notes · 23 data points</p>
      <div className="hm-chips dense">{points.map((p) => <i key={p}>{p}</i>)}</div>
    </Frame>
  );
}

function Team() {
  return (
    <Frame label="team review">
      <div className="hm-row between">
        <p className="hm-h">Reviewers</p>
        <div className="hm-stack"><Avatar i={2} /><Avatar i={3} /><Avatar i={4} /><span className="hm-add">+</span></div>
      </div>
      <div className="hm-thread">
        <div className="hm-msg"><Avatar i={2} size={26} /><p><b>Founder</b> Strong storyteller. Assignment nailed the brief.</p></div>
        <div className="hm-msg"><Avatar i={3} size={26} /><p><b>CMO</b> Has run a team our size. Let&rsquo;s meet this week.</p></div>
        <div className="hm-msg"><Avatar i={4} size={26} /><p><b>Brand Lead</b> Agree. Second choice is Applicant 01.</p></div>
      </div>
      <div className="hm-votes"><span>Votes</span><b>3 of 3 yes</b><i><em style={{ width: "100%" }} /></i></div>
    </Frame>
  );
}

function Hired() {
  return (
    <Frame label="hired">
      <div className="hm-hired">
        <span className="hm-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p className="hm-h center">Offer accepted</p>
        <small>Head of Content · joins on the 1st</small>
      </div>
      <div className="hm-timeline">
        <div className="done"><i /><span>Mandate</span><small>Day 0</small></div>
        <div className="done"><i /><span>Shortlist</span><small>Day 3</small></div>
        <div className="done"><i /><span>Offer</span><small>Day 22</small></div>
        <div><i /><span>Placed</span><small>Day 25</small></div>
      </div>
      <div className="hm-grid2 tight">
        <div className="hm-field"><span>Fee tranche 1</span><b>On hiring</b></div>
        <div className="hm-field"><span>Fee tranche 2</span><b>On placement</b></div>
      </div>
    </Frame>
  );
}

export const MOCKS = [Mandate, Applications, Review, Team, Hired];

export const HM_CSS = `
.hm{ border-radius:18px; background:#FFFFFF; border:1px solid rgba(26,22,20,.10);
  box-shadow:0 30px 60px -20px rgba(36,18,71,.35), 0 2px 6px rgba(36,18,71,.06); overflow:hidden; color:#1A1614; }
.hm-bar{ display:flex; align-items:center; gap:7px; padding:12px 16px; background:#F6F3EE; border-bottom:1px solid rgba(26,22,20,.08); }
.hm-bar span{ width:10px; height:10px; border-radius:50%; background:#DCD5CA; }
.hm-bar p{ margin:0 0 0 10px !important; font-size:12px; color:#6B6258; letter-spacing:.02em; }
.hm-body{ padding:22px; display:flex; flex-direction:column; gap:14px; min-height:330px; }
.hm-h{ margin:0 !important; font-weight:700; font-size:16px; }
.hm-h.center{ text-align:center; }
.hm-sub{ margin:0 !important; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#6A2FD4; }
.hm-row{ display:flex; align-items:center; gap:12px; }
.hm-row.between{ justify-content:space-between; }
.hm-grow{ flex:1; min-width:0; display:flex; flex-direction:column; }
.hm-grow b{ font-size:14px; } .hm-grow b.lg{ font-size:17px; }
.hm-grow small{ font-size:12px; color:#6B6258; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.hm-grid2{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.hm-grid2.tight{ gap:8px; }
.hm-field{ border:1px solid rgba(26,22,20,.10); border-radius:12px; padding:10px 12px; display:flex; flex-direction:column; gap:2px; background:#FCFAF7; }
.hm-field span{ font-size:11px; color:#6B6258; }
.hm-field b{ font-size:14px; } .hm-field b.soft{ font-weight:500; font-size:13px; }
.hm-field.wide{ grid-column:1 / -1; }
.hm-chips{ display:flex; flex-wrap:wrap; gap:6px; }
.hm-chips i{ font-style:normal; font-size:12px; padding:5px 10px; border-radius:999px; background:#F1E7FF; color:#4A1FA8; font-weight:600; }
.hm-chips.dense i{ background:#F6F3EE; color:#3B342E; font-weight:500; }
.hm-actions{ display:flex; align-items:center; gap:12px; margin-top:auto; }
.hm-actions small{ font-size:12px; color:#6B6258; }
.hm-btn{ background:#241247; color:#fff; font-size:13px; font-weight:700; padding:10px 16px; border-radius:999px; }
.hm-pill{ font-size:11px; font-weight:700; padding:5px 10px; border-radius:999px; background:#F1E7FF; color:#4A1FA8; white-space:nowrap; }
.hm-pill.ok{ background:#E4F4EA; color:#1C6B45; }
.hm-pill.sun{ background:#FFF1C7; color:#6B4E00; }
.hm-list{ display:flex; flex-direction:column; gap:8px; }
.hm-item{ display:flex; align-items:center; gap:12px; padding:10px 12px; border:1px solid rgba(26,22,20,.08); border-radius:12px; }
.hm-score{ font-weight:700; font-size:14px; color:#6A2FD4; width:30px; text-align:right; }
.hm-av{ display:inline-block; flex:none; border-radius:50%; border:2px solid #fff; }
.hm-av.a0{ background:linear-gradient(135deg,#C9AEFF,#8856F2); }
.hm-av.a1{ background:linear-gradient(135deg,#FFE08A,#F5C542); }
.hm-av.a2{ background:linear-gradient(135deg,#B9A5E8,#3D2378); }
.hm-av.a3{ background:linear-gradient(135deg,#E3D6FF,#A98BFF); }
.hm-av.a4{ background:linear-gradient(135deg,#F7E3B0,#C99A1E); }
.hm-meter{ border:1px solid rgba(26,22,20,.10); border-radius:12px; padding:10px 12px; display:grid; grid-template-columns:1fr auto; gap:6px; align-items:center; }
.hm-meter span{ font-size:11px; color:#6B6258; } .hm-meter b{ font-size:16px; }
.hm-meter i{ grid-column:1 / -1; display:block; height:5px; border-radius:5px; background:linear-gradient(90deg,#8856F2,#C9AEFF); }
.hm-stack{ display:flex; } .hm-stack .hm-av{ margin-left:-8px; }
.hm-add{ width:30px; height:30px; margin-left:-8px; border-radius:50%; border:1.5px dashed #8856F2; color:#6A2FD4; display:inline-flex; align-items:center; justify-content:center; font-weight:700; background:#fff; }
.hm-thread{ display:flex; flex-direction:column; gap:10px; }
.hm-msg{ display:flex; gap:10px; align-items:flex-start; }
.hm-msg p{ margin:0 !important; font-size:13px; line-height:1.45; background:#F6F3EE; padding:9px 12px; border-radius:4px 12px 12px 12px; }
.hm-msg p b{ display:block; font-size:11px; color:#6A2FD4; margin-bottom:2px; }
.hm-votes{ display:grid; grid-template-columns:auto 1fr; gap:6px 12px; align-items:center; margin-top:auto; }
.hm-votes span{ font-size:12px; color:#6B6258; } .hm-votes b{ font-size:13px; justify-self:end; }
.hm-votes i{ grid-column:1 / -1; height:6px; border-radius:6px; background:#F1E7FF; display:block; }
.hm-votes em{ display:block; height:100%; border-radius:6px; background:#1C6B45; }
.hm-hired{ display:flex; flex-direction:column; align-items:center; gap:6px; padding:8px 0 4px; }
.hm-hired small{ font-size:12.5px; color:#6B6258; }
.hm-tick{ width:54px; height:54px; border-radius:50%; background:#F5C542; color:#241247; display:inline-flex; align-items:center; justify-content:center; }
.hm-timeline{ display:grid; grid-template-columns:repeat(4,1fr); position:relative; margin:6px 0 4px; }
.hm-timeline::before{ content:''; position:absolute; left:12%; right:12%; top:6px; height:2px; background:#E3D6FF; }
.hm-timeline div{ display:flex; flex-direction:column; align-items:center; gap:4px; position:relative; }
.hm-timeline i{ width:14px; height:14px; border-radius:50%; background:#fff; border:2px solid #C9AEFF; }
.hm-timeline .done i{ background:#8856F2; border-color:#8856F2; }
.hm-timeline span{ font-size:12px; font-weight:700; } .hm-timeline small{ font-size:11px; color:#6B6258; }
@media (max-width:520px){ .hm-body{ padding:16px; min-height:0; } .hm-grid2{ grid-template-columns:1fr; } }
`;
