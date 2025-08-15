import React from 'react'

export default function Modal({ title, open, onClose, children, footer }){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <header className="row" style={{justifyContent:'space-between'}}>
          <div>{title}</div>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </header>
        <div className="content">{children}</div>
        <div className="footer">{footer}</div>
      </div>
    </div>
  )
}