import { useEffect, useState } from 'react'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { MultiSelect } from '../components/ui/MultiSelect'
import { v4 as uuid } from 'uuid'
import { useDispatch } from '../store'
import React from 'react'

const STATUSES = ['Completed', 'On Hold', 'In Progress']
const CATS = ['Sidewalk Shed', 'Scaffold', 'Shoring']

export default function CreateJobsiteModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [cats, setCats] = useState([])
  const dispatch = useDispatch()

  const reset = () => {
    setName('')
    setStatus('')
    setCats([])
  }

  const handleClose = () => {
    reset()
    onClose?.()
  }

  useEffect(() => {
    if (!open) reset()
  }, [open])

  const submit = () => {
    if (!name || !status || cats.length === 0)
      return alert('Name, Status dhe Category janë të detyrueshme!')

    const payload = { id: uuid(), name, status, categories: cats }
    dispatch({ type: 'ADD_JOBSITE', payload })

    reset()
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Title"
      footer={
        <>
          <Button variant="outline"  className="cancel" onClick={handleClose}>Cancel Changes</Button>
          <Button onClick={submit}>Save Changes</Button>
        </>
      }
    >
      <div className="muted info-line nudge">
        <span className="info-dot" />
        Informative piece of text that can be used regarding this modal.
      </div>
      <div className="form-grid">
        <div className="grid full">
          <label>Name</label>
          <Input placeholder="Type the jobsite name" value={name}
            onChange={e => setName(e.target.value)} />
        </div>

        <div className="grid ms-cell">
          <MultiSelect label="Category Included" options={CATS}
            value={cats} onChange={setCats} />
        </div>

        <div className="grid">
          <Select label="Status" options={STATUSES}
            value={status} onChange={setStatus} />
        </div>
      </div>
    </Modal>
  )
}
