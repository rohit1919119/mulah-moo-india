/**
 * Upcoming Backstage Creators Club rooms, shown as photo posters on /bcc.
 *
 * The photos are mood images of spaces, with no people in them, from Unsplash
 * (free to use under the Unsplash licence), served from Unsplash's own image
 * CDN at the size each card needs. They set the feel of each format and each
 * carries a small photographer credit. Swap `photo` for a real venue
 * or event photo once a room has one.
 *
 * Edit UPCOMING to add, move or retire a room. `formCity` must match one of
 * the request form's cities so "Request a seat" can preselect it.
 */

export type Upcoming = {
  city: string;
  formCity: string;
  month: string;
  year: string;
  format: string;
  who: string[];
  accent: string;
  photo: { src: string; by: string; user: string; pos?: string };
};

export const UPCOMING: Upcoming[] = [
  {
    city: "Delhi", formCity: "Delhi NCR", month: "October", year: "2026", format: "Afternoon meetup", accent: "#F5C542",
    who: ["Video editors", "Designers", "Motion graphic designers"],
    photo: { src: "https://images.unsplash.com/photo-1633944241961-e511ab23455f", by: "micheile henderson", user: "micheile", pos: "50% 40%" },
  },
  {
    city: "Bangalore", formCity: "Bengaluru", month: "November", year: "2026", format: "House party", accent: "#FFB86B",
    who: ["YouTube professionals", "Content heads", "Brand YouTube leads", "YouTube creators", "YouTube strategists"],
    photo: { src: "https://images.unsplash.com/photo-1493859923015-f05bc8960fa0", by: "James Fitzgerald", user: "reallygoodjames", pos: "50% 40%" },
  },
  {
    city: "Delhi", formCity: "Delhi NCR", month: "December", year: "2026", format: "Evening meetup", accent: "#C9B6FF",
    who: ["Brand managers", "D2C brand leads", "Marketing leads", "D2C content leads"],
    photo: { src: "https://images.unsplash.com/photo-1759038086846-c97a8adfce98", by: "Neon Wang", user: "neonwangphotography", pos: "50% 50%" },
  },
  {
    city: "Mumbai", formCity: "Mumbai", month: "December", year: "2026", format: "Dinner", accent: "#FF9B85",
    who: ["Content producers", "Creative producers", "Post producers", "Content studio leads", "Micro drama professionals"],
    photo: { src: "https://images.unsplash.com/photo-1688437307687-fe226bddfab1", by: "Zac Cain", user: "zaccain", pos: "50% 45%" },
  },
];

const UTM = "?utm_source=mulahmoo&utm_medium=referral";
const img = (src: string, w: number) => `${src}?w=${w}&h=${Math.round(w * 1.4)}&fit=crop&crop=entropy&auto=format&q=78`;

export function BccUpcoming({ onRequest }: { onRequest: (u: Upcoming) => void }) {
  return (
    <section className="bc-up" id="upcoming">
      <div className="pm-wrap">
        <h2 className="pm-h" data-r>The next <em>rooms.</em></h2>
        <div className="bc-upgrid" data-r>
          {UPCOMING.map((u) => (
            <article key={`${u.city}-${u.month}`} className="bc-poster" style={{ "--acc": u.accent } as React.CSSProperties}>
              <img
                src={img(u.photo.src, 640)}
                srcSet={`${img(u.photo.src, 480)} 480w, ${img(u.photo.src, 760)} 760w, ${img(u.photo.src, 1100)} 1100w`}
                sizes="(max-width:640px) 92vw, (max-width:1180px) 46vw, 300px"
                alt=""
                loading="lazy"
                style={{ objectPosition: u.photo.pos }}
              />
              <div className="veil" aria-hidden="true" />
              <div className="top">
                <span className="when">{u.month} {u.year}</span>
                <span className="fmt">{u.format}</span>
              </div>
              <div className="body">
                <h3>{u.city}</h3>
                <ul aria-label="Who the room is for">
                  {u.who.map((w) => <li key={w}>{w}</li>)}
                </ul>
                <button type="button" className="go" onClick={() => onRequest(u)}>
                  Request a seat <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
              <a className="credit" href={`https://unsplash.com/@${u.photo.user}${UTM}`} target="_blank" rel="noopener noreferrer">
                Photo: {u.photo.by}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const UP_CSS = `
.bc-up{ background:var(--deeper); color:#fff; padding:180px 0; position:relative; overflow:hidden; }
.bc-up .pm-h em{ color:#C9B6FF; }
.bc-upgrid{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:18px; }
.bc-poster{ position:relative; display:flex; flex-direction:column; justify-content:space-between; min-height:600px; padding:22px;
  border-radius:28px; overflow:hidden; isolation:isolate; color:#fff; background:#1d1238;
  box-shadow:0 0 0 1px rgba(255,255,255,.08); transition:transform .6s cubic-bezier(.2,.9,.25,1), box-shadow .6s; }
.bc-poster > img{ position:absolute; inset:0; z-index:-2; width:100%; height:100%; object-fit:cover; transform:scale(1.02);
  transition:transform 1.4s cubic-bezier(.2,.9,.25,1); }
.bc-poster .veil{ position:absolute; inset:0; z-index:-1;
  background:linear-gradient(180deg, rgba(14,8,32,.55) 0%, rgba(14,8,32,0) 22%, rgba(14,8,32,0) 38%, rgba(14,8,32,.78) 66%, rgba(14,8,32,.96) 100%); }
.bc-poster:hover{ transform:translateY(-10px); box-shadow:0 0 0 1px rgba(255,255,255,.14), 0 40px 80px -30px rgba(0,0,0,.7); }
.bc-poster:hover > img{ transform:scale(1.08); }
.bc-poster .top{ display:flex; flex-direction:column; align-items:flex-start; gap:10px; }
.bc-poster .when{ font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--acc); text-shadow:0 1px 10px rgba(0,0,0,.4); }
.bc-poster .fmt{ font-size:12.5px; font-weight:600; padding:7px 12px; border-radius:999px; background:rgba(14,8,32,.45);
  border:1px solid rgba(255,255,255,.22); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); }
.bc-poster .body{ display:flex; flex-direction:column; gap:14px; }
.bc-poster h3{ font-family:var(--display); font-weight:var(--dw); font-size:clamp(46px,4.2vw,64px); line-height:.92; letter-spacing:-.025em; }
.bc-poster ul{ list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:6px; }
.bc-poster li{ font-size:12.5px; font-weight:500; padding:6px 10px; border-radius:999px; line-height:1.2;
  background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.14); }
.bc-poster .go{ align-self:flex-start; margin-top:6px; display:inline-flex; gap:8px; align-items:center; border:0; cursor:pointer;
  font:600 14.5px var(--ui); color:#140A2B; background:var(--acc); padding:12px 18px; border-radius:999px; transition:gap .3s, filter .3s; }
.bc-poster .go:hover{ gap:14px; filter:brightness(1.06); }
.bc-poster .go:focus-visible{ outline:2px solid #fff; outline-offset:3px; }
.bc-poster .credit{ position:absolute; right:16px; top:20px; font-size:10.5px; color:rgba(255,255,255,.6); text-decoration:none;
  writing-mode:vertical-rl; transform:rotate(180deg); letter-spacing:.04em; }
.bc-poster .credit:hover{ color:#fff; }

@media (max-width:1180px){ .bc-upgrid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:640px){ .bc-upgrid{ grid-template-columns:1fr; } .bc-poster{ min-height:560px; } .bc-up{ padding:110px 0; } }
@media (prefers-reduced-motion:reduce){ .bc-poster, .bc-poster *{ transition:none !important; } }
`;
