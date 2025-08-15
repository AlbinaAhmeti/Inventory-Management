import React from 'react'

const map = { 'Completed':'green', 'In Progress':'mint', 'On Hold':'yellow'}

export default function Badge({ children, tone }) {
  const t = tone || map[children] || 'green'
  return <span className={`badge solid ${t}`}>{children}</span>  
}