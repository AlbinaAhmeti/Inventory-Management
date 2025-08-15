import { useEffect, useState } from 'react'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import React from 'react'
import { useDispatch } from '../store'

export default function EditItemModal({ open, onClose, jobsiteId, category, item }){
  const [form,setForm] = useState(item || {})
  const dispatch = useDispatch()

  useEffect(()=> setForm(item || {}),[item])

  const save = () => {
    if(!form?.id) return onClose()
    dispatch({
      type:'UPDATE_ITEM',
      payload:{ jobsiteId, category, item:{ ...form, quantity:Number(form.quantity||0) } }
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Title"
      footer={
          <Button className="btn-split success" onClick={save}>
            <span className="btn-label">Save Changes</span>
            <span className="btn-seg" aria-hidden>✓</span>
          </Button>
      }
    >
      {item && (
        <div className="modal-form">
          <div className="muted info-line" style={{gridColumn:'1 / -1'}}>
            <span className="info-dot blue" />
            Informative piece of text that can be used regarding this modal.
          </div>

          <div className="grid">
            <label>Item</label>
            <Input
              className="soft select-like"
              placeholder="Search & Select item"
              value={form.code||''}
              onChange={e=>setForm(f=>({...f, code:e.target.value}))}
            />
          </div>

          <div className="grid">
            <label>Quantity</label>
            <Input
              className="soft"
              type="number"
              placeholder="Set Quantity"
              value={form.quantity ?? ''}
              onChange={e=>setForm(f=>({...f, quantity:e.target.value}))}
            />
          </div>

          <div className="grid full">
            <label>Description</label>
            <textarea
              className="input soft textarea"
              rows={5}
              placeholder="Type the description..."
              value={form.description||''}
              onChange={e=>setForm(f=>({...f, description:e.target.value}))}
            />
          </div>

          <div className="grid full">
            <label>Notes</label>
            <textarea
              className="input soft textarea"
              rows={4}
              placeholder="Type a note..."
              value={form.notes||''}
              onChange={e=>setForm(f=>({...f, notes:e.target.value}))}
            />
          </div>
        </div>
      )}
    </Modal>
  )
}
