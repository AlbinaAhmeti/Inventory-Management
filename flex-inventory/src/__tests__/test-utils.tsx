import React from 'react'
import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '../store'

export function renderWithProviders(
  ui: ReactElement,
  { route = '/' } = {}
) {
  window.history.pushState({}, 'Test', route)
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider>{ui}</StoreProvider>
    </MemoryRouter>
  )
}
