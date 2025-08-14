export default function Table({ columns, rows, onCellDblClick }){
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(c=> <th key={c.key}>{c.title}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row)=> (
          <tr key={row.id}>
            {columns.map(col=> (
              <td key={col.key} onDoubleClick={()=> onCellDblClick?.(row, col.key)}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}