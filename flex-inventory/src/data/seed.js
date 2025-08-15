import { v4 as uuid } from 'uuid'

const categories = ['Sidewalk Shed', 'Scaffold', 'Shoring']
const statuses = ['Completed', 'On Hold', 'In Progress']

const makeItems = () => Array.from({ length: 11 }).map((_, i) => ({
  id: uuid(),
  nr: i + 1,
  code: ['G42295', 'M721', 'M94796', 'S25907', 'A68446', 'F3786', 'R69895', 'A26959', 'A41878', 'A37244', 'M89319'][i] || `X${1000 + i}`,
  quantity: Math.floor(Math.random() * 90) + 10,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}))

export const seedData = () => {
  const jobsites = Array.from({ length: 15 }).map((_, i) => ({
    id: uuid(),
    name: [
      '1420 Avenue J, Brooklyn, NY 11230, USA',
      '231 7th Ave, Brooklyn, NY 11215, USA',
      '900 Nostrand Ave, Brooklyn, NY 11225, USA',
      '88 Bedford Ave, Brooklyn, NY 11249, USA',
      '305 86th St, Brooklyn, NY 11209, USA',
      '1718 65th St, Brooklyn, NY 11204, USA',
      '2100 Flatbush Ave, Brooklyn, NY 11234, USA',
      '1235 Atlantic Ave, Brooklyn, NY 11216, USA',
      '84-15 37th Ave, Jackson Heights, NY 11372, USA',
      '41-17 Main St, Flushing, NY 11355, USA',
      '30-02 31st St, Astoria, NY 11102, USA',
      '21-01 44th Dr, Long Island City, NY 11101, USA',
      '102-12 Atlantic Ave, Richmond Hill, NY 11418, USA',
      '135-20 Roosevelt Ave, Flushing, NY 11354, USA',
      '118-35 Queens Blvd, Forest Hills, NY 11375, USA'
    ][i] || `Jobsite ${i + 1}`,
    status: statuses[[1, 2, 0][i % 3]],
    categories
  }))

  const inventory = {}
  for (const j of jobsites) {
    inventory[j.id] = {
      'Sidewalk Shed': makeItems(),
      'Scaffold': makeItems(),
      'Shoring': makeItems()
    }
  }
  return { jobsites, inventory }
}
