import React from 'react'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './test-utils'

// MOCKs (shpjeguar më lart)
vi.mock('../data/seed', () => {
  const jobsites = [
    {
      id: 'job-1',
      name: '262 3rd Avenue, New York, NY',
      status: 'Completed',
      categories: ['Sidewalk Shed', 'Scaffold', 'Shoring'],
    },
    {
      id: 'job-2',
      name: '14 Wall St, New York, NY',
      status: 'On Hold',
      categories: ['Sidewalk Shed', 'Scaffold', 'Shoring'],
    },
  ]
  const inventory = {
    'job-1': { 'Sidewalk Shed': [], 'Scaffold': [], 'Shoring': [] },
    'job-2': { 'Sidewalk Shed': [], 'Scaffold': [], 'Shoring': [] },
  }
  return { seedData: () => ({ jobsites, inventory }) }
})

vi.mock('../lib/storage', () => ({
  load: () => null,
  save: () => {},
}))

describe('App basic', () => {
  it('renders stats and table headers', () => {
    renderWithProviders(<App />)

    // titujt e tabelës
    expect(screen.getByText(/Jobsite Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Status/i)).toBeInTheDocument()

    // badge/status words
    expect(screen.getByText(/Completed/i)).toBeInTheDocument()
    expect(screen.getByText(/On Hold/i)).toBeInTheDocument()

    // njëri prej emrave
    expect(screen.getByText(/262 3rd Avenue/i)).toBeInTheDocument()
  })

  it('can filter with the search input', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    const input = screen.getByPlaceholderText(/Search a driver/i)
    await user.type(input, 'Wall St')

    expect(screen.queryByText(/262 3rd Avenue/i)).not.toBeInTheDocument()
    expect(screen.getByText(/14 Wall St/i)).toBeInTheDocument()
  })
})
