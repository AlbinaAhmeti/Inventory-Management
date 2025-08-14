const KEY = 'flex_inventory_state_v1'
export const save = (state) => {
  try{ localStorage.setItem(KEY, JSON.stringify(state)) }catch{ /* why: avoid crash in private mode */ }
}
export const load = () => {
  try{ const v = localStorage.getItem(KEY); return v? JSON.parse(v): null }catch{ return null }
}