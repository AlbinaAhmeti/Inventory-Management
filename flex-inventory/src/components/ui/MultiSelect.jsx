import { useEffect, useRef, useState } from "react";

export function MultiSelect({ label, options = [], value = [], onChange, placeholder = "Select", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isSelected = (opt) => value.includes(opt);
  const toggle = (opt) => {
    if (!onChange) return;
    onChange(isSelected(opt) ? value.filter(v => v !== opt) : [...value, opt]);
  };
  const remove = (opt, e) => { e.stopPropagation(); onChange?.(value.filter(v => v !== opt)); };

    const dotClass = (opt) => {
      const k = opt.toLowerCase();
      if (k.includes("sidewalk")) return "ms-dot sidewalk";
      if (k.includes("scaffold"))  return "ms-dot scaffold";
      if (k.includes("shoring"))   return "ms-dot shoring";
      return "ms-dot";
    };

    const optKey = (opt) => {
      const k = opt.toLowerCase();
      if (k.includes("sidewalk")) return "sidewalk";
      if (k.includes("scaffold"))  return "scaffold";
      if (k.includes("shoring"))   return "shoring";
      return "default";
    };

  return (
    <div className="grid" ref={ref}>
      {label && <label>{label}</label>}

      <div
        className={`ms ${open ? "open" : ""} ${className}`}
        role="button"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
      >
        <div className="ms-value">
          <span className="ms-placeholder">{placeholder}</span>
        </div>

        <svg className="ms-caret" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {open && (
          <div className="ms-menu" onClick={(e)=>e.stopPropagation()}>
            {options.map(opt => {
              const sel = isSelected(opt);
              return (
                <div
                  key={opt}
                  className={`ms-option ${optKey(opt)} ${sel ? "selected" : ""}`}  // ⟵ KËTU
                  onClick={() => toggle(opt)}
                >
                  <div className="ms-option-left">
                    <span className={dotClass(opt)} />
                    <span className="ms-option-text">{opt}</span>
                  </div>
                  {sel && <span className="ms-check">✓</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="ms-selected" onClick={(e)=>e.stopPropagation()}>
          {value.map(v => (
            <span key={v} className="ms-chip chip-out">
              <span className={dotClass(v)} />
              {v}
              <button className="ms-x square" aria-label="remove" onClick={(e)=>remove(v,e)}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
