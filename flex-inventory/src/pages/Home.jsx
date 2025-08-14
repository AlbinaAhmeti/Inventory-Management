import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import React from 'react'
import Badge from '../components/ui/Badge'
import CreateJobsiteModal from '../modals/CreateJobsiteModal'
import { useStore } from '../store'

export default function Home(){
  const { jobsites } = useStore()
  const [open,setOpen]=useState(false)
  const [q,setQ]=useState('')

  const filtered = useMemo(()=> jobsites.filter(j=> j.name.toLowerCase().includes(q.toLowerCase())),[jobsites,q])
  const counts = useMemo(()=> ({
    onRold: jobsites.filter(j=>j.status==='On Hold').length,
    completed: jobsites.filter(j=>j.status==='Completed').length,
    onHold: jobsites.filter(j=>j.status==='On Hold').length,
  }),[jobsites])

  return (
    <div className="container grid" style={{gap:18}}>
      <div className="rowbox">
        <div className="row" style={{gap:14}}>
        <div className="stat yellow">{counts.onRold} On Rold</div>
        <div className="stat green">{counts.completed} Completed</div>
        <div className="stat red">{counts.onHold} On Hold</div>
      </div>
      </div>

      <div className="card" style={{padding:16}}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div className="head-left">
            <div style={{ fontWeight:700 }}>Title</div>
            <div className="muted info-line">
              <span className="info-dot" />
              Informative piece of text that can be used regarding this modal.
            </div>
          </div>

          <div className="row" style={{ gap: 8 }}>
            <Input
              className="input search"           
              placeholder="Search a driver"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <Button onClick={() => setOpen(true)}>Create +</Button>
          </div>
          
        </div>
        <div style={{marginTop:12}}>
          <table className="table">
            <thead>
              <tr>
                <th>Jobsite Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id}>
                  <td><Link className="link" to={`/job/${j.id}`}>{j.name}</Link></td>
                  <td>
                    <Badge>{j.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateJobsiteModal open={open} onClose={()=>setOpen(false)} />
    </div>
  )
}
