import { useEffect, useState } from "react";
import { Logo } from "@/comic/Logo";

/**
 * Shown while /moo-talent waits on its loader, which fetches live briefs from the
 * Google Sheet and can take a couple of seconds on a cold hit.
 *
 * The counter is eased rather than linear and deliberately never reaches 100 on
 * its own: the route resolving is what ends this screen, so a bar that parked at
 * 100% while still waiting would read as broken.
 */
export function CreativeLoader() {
  const [pct, setPct] = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      // decelerate as it approaches the ceiling, so it always looks alive
      setPct((p) => (p >= 96 ? 96 : p + Math.max(1, Math.round((96 - p) * 0.09))));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="v4load">
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />
      <div className="ld-rays" />
      <div className="ld-in">
        <div className="ld-logo"><Logo height={26} /></div>

        <h1 className="ld-title">
          Go <span className="ld-mark">creative</span>
        </h1>

        <div className="ld-bar">
          <div className="ld-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="ld-row">
          <span className="ld-word">Opening the brief board</span>
          <span className="ld-pct">{pct}%</span>
        </div>
      </div>
    </div>
  );
}

const LOADER_CSS = `
.v4load{
  position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center;
  background:#FFFCF7; color:#1A1614; overflow:hidden; padding:24px;
  font-family:'DM Sans',system-ui,sans-serif;
}
.v4load .ld-rays{
  position:absolute; left:50%; top:50%; width:230vmax; height:230vmax; transform:translate(-50%,-50%);
  background:repeating-conic-gradient(from 0deg at 50% 50%, #F1E7FF 0deg 7deg, #FFFCF7 7deg 14deg);
  animation:ldspin 34s linear infinite; opacity:.85;
}
@keyframes ldspin{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
.v4load .ld-in{ position:relative; z-index:2; width:min(560px,100%); text-align:center; }
.v4load .ld-logo{ display:flex; justify-content:center; margin-bottom:34px; }
.v4load .ld-title{
  font-family:'Fraunces',Georgia,serif; font-variation-settings:'SOFT' 60,'WONK' 1;
  font-weight:800; letter-spacing:-0.035em; line-height:1; font-size:clamp(46px,10vw,96px);
}
.v4load .ld-mark{ position:relative; display:inline-block; }
/* the marker sweeps in rather than sitting there, so the screen has one moment of motion */
.v4load .ld-mark::before{
  content:''; position:absolute; left:-10px; right:-10px; top:16%; bottom:8%; background:#F5C542;
  transform:rotate(-1.6deg) skewX(-9deg); z-index:-1; border-radius:4px 14px 6px 12px;
  transform-origin:left center; animation:ldsweep .5s cubic-bezier(.22,1,.36,1) both;
}
@keyframes ldsweep{ from{ transform:rotate(-1.6deg) skewX(-9deg) scaleX(0); } to{ transform:rotate(-1.6deg) skewX(-9deg) scaleX(1); } }
.v4load .ld-bar{
  margin-top:40px; height:20px; border:3.5px solid #1A1614; border-radius:999px;
  background:#FFFCF7; overflow:hidden; box-shadow:5px 5px 0 #1A1614;
}
.v4load .ld-fill{
  height:100%; background:#8856F2; border-right:3.5px solid #1A1614;
  background-image:repeating-linear-gradient(45deg, rgba(255,255,255,.34) 0 8px, transparent 8px 16px);
  transition:width .22s ease-out;
}
.v4load .ld-row{
  margin-top:16px; display:flex; align-items:center; justify-content:space-between; gap:16px;
  font-size:12.5px; font-weight:700; text-transform:uppercase; letter-spacing:1.6px;
}
.v4load .ld-word{ color:#5B5147; }
.v4load .ld-pct{ font-variant-numeric:tabular-nums; }
@media (prefers-reduced-motion:reduce){
  .v4load .ld-rays{ animation:none; }
  .v4load .ld-mark::before{ animation:none; }
}
`;
