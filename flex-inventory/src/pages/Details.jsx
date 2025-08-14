import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Table from "../components/Table";
import React from 'react'
import EditItemModal from "../modals/EditItemModal";
import { useStore } from "../store";
import BoxImg from "../assets/box.png";

const CATS = ["Sidewalk Shed", "Scaffold", "Shoring"];

export default function Details() {
  const { id } = useParams();
  const store = useStore();
  const job = store.jobsites.find((j) => j.id === id);
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);

  const rows = useMemo(() => {
    if (!category) return [];
    const arr = store.inventory[id]?.[category] || [];
    return arr.filter((r) =>
      [r.code, r.description, r.notes]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase())
    );
  }, [store, id, category, q]);

  const columns = [
    { key: "nr", title: "Nr." },
    { key: "code", title: "Item" },
    { key: "quantity", title: "Quantity" },
    { key: "description", title: "Description" },
    { key: "notes", title: "Notes" },
  ];

    const toneFor = (c) => {
      const k = c.toLowerCase()
      if (k.includes('sidewalk')) return 'sidewalk'
      if (k.includes('scaffold')) return 'scaffold'
      if (k.includes('shoring'))  return 'shoring'
      return 'default'
    }

  return (
    <div className="container row " style={{ alignItems: "flex-start" }}>
      <div className="sidebar card fill " style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 10 }}>
          {job?.name || "Unknown Jobsite"}
        </div>
        <div className="grid">
          {CATS.map((c) => {
            const tone = toneFor(c);            
            const isActive = category === c;   

            return (
              <Button
                key={c}
                className={`cat-btn ${tone} ${isActive ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            );
          })}

        </div>
          <div className="back-row">
            <Link to="/" className="link-reset">
              <Button className="back-btn">
                Go Back <span className="back-icon">←</span>
              </Button>
            </Link>
          </div>
      </div>

      <div className="card" style={{ flex: 1, padding: 16 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>{category || "Data Grid"}</div>
          <Input
            placeholder="Search an item"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ maxWidth: 320 }}
          />
        </div>
        {!category ? (
          <div className="empty">
            <img src={BoxImg} alt="" className="box-illustration" />
            <div>
              <div style={{ textAlign: "center", fontWeight: 700 }}>
                No Service Selected
              </div>
              <div style={{ textAlign: "center", color: "#64748b" }}>
                Please select a service on your left to proceed.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <Table
              columns={columns}
              rows={rows}
              onCellDblClick={(row) => setEditing(row)}
            />
          </div>
        )}
      </div>

      <EditItemModal
        open={!!editing}
        onClose={() => setEditing(null)}
        jobsiteId={id}
        category={category}
        item={editing}
      />
    </div>
  );
}
