import { useEffect, useRef, useState } from "react";

export function Select({ label, options = [], value = "", onChange, placeholder = "Select one" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const keyFor = (o = "") => {
    const k = o.toLowerCase();
    if (k.includes("complete")) return "completed";
    if (k.includes("progress")) return "progress";
    if (k.includes("hold"))     return "hold";
    return "default";
  };

  const current = value ? options.find(o => o === value) : null;

  return (
    <div className="grid" ref={ref}>
      {label && <label>{label}</label>}

      <div className={`ss ${open ? "open" : ""}`} role="button" tabIndex={0} onClick={() => setOpen(o=>!o)}>
        <div className="ss-value">
          {current ? (
            <>
              <span className={`ss-dot ${keyFor(current)}`} />
              <span>{current}</span>
            </>
          ) : (
            <span className="ss-placeholder">{placeholder}</span>
          )}
        </div>

        <svg className="ss-caret" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {open && (
          <div className="ss-menu" onClick={(e)=>e.stopPropagation()}>
            {options.map(opt => {
              const k = keyFor(opt);
              const selected = value === opt;
              return (
                <div
                  key={opt}
                  className={`ss-option ${k} ${selected ? "selected" : ""}`}
                  onClick={() => { onChange?.(opt); setOpen(false); }}
                >
                  <div className="ss-left">
                    <span className={`ss-dot ${k}`} />
                    <span className="ss-text">{opt}</span>
                  </div>
                  {selected && <span className="ss-check">✓</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
