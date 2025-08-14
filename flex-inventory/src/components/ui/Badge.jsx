const map = { 'Completed':'green', 'In Progress':'mint', 'On Hold':'red', 'On Road':'yellow' }

export default function Badge({ children, tone }) {
  const t = tone || map[children] || 'green'
  return <span className={`badge solid ${t}`}>{children}</span>  
}