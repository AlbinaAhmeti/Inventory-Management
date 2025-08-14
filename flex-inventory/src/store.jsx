import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { load, save } from './lib/storage'
import { seedData } from './data/seed'

const StoreCtx = createContext(null)
const DispatchCtx = createContext(()=>{})

const initial = (() => load() || seedData())()

function reducer(state, action){
  switch(action.type){
    case 'ADD_JOBSITE': {
      const jobsites = [action.payload, ...state.jobsites]
      const inventory = { ...state.inventory, [action.payload.id]: {
        'Sidewalk Shed': [], 'Scaffold': [], 'Shoring': []
      }}
      return { jobsites, inventory }
    }
    case 'UPDATE_ITEM': {
      const { jobsiteId, category, item } = action.payload
      const items = state.inventory[jobsiteId][category].map(it=> it.id===item.id? item: it)
      return { ...state, inventory: { ...state.inventory, [jobsiteId]: { ...state.inventory[jobsiteId], [category]: items } } }
    }
    case 'ADD_ITEM': {
      const { jobsiteId, category, item } = action.payload
      const items = [item, ...state.inventory[jobsiteId][category]]
      return { ...state, inventory: { ...state.inventory, [jobsiteId]: { ...state.inventory[jobsiteId], [category]: items } } }
    }
    default: return state
  }
}

export function StoreProvider({children}){
  const [state, dispatch] = useReducer(reducer, initial)
  useEffect(()=>{ save(state) },[state])
  const store = useMemo(()=>state,[state])
  return (
    <DispatchCtx.Provider value={dispatch}>
      <StoreCtx.Provider value={store}>{children}</StoreCtx.Provider>
    </DispatchCtx.Provider>
  )
}
export const useStore = () => useContext(StoreCtx)
export const useDispatch = () => useContext(DispatchCtx)