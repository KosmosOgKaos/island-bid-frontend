import { Information } from './Information'
import { DataCollection } from './DataCollection'
import { Income } from './Income'
import { Properties } from './Properties'
import { Debts } from './Debts'
import { Overview } from './Overview'
import { Done } from './Done'

export const formSteps = [
  {
    id: 'dataCollection',
    title: 'Gagnaöflun',
    next: 'information',
    component: DataCollection,
  },
  {
    id: 'information',
    title: 'Upplýsingar',
    prev: 'dataCollection',
    next: 'income',
    component: Information,
  },
  {
    id: 'income',
    title: 'Tekjur',
    prev: 'information',
    next: 'assets',
    component: Income,
  },
  {
    id: 'assets',
    title: 'Eignir',
    prev: 'income',
    next: 'debts',
    component: Properties,
  },
  {
    id: 'debts',
    title: 'Skuldir',
    prev: 'assets',
    next: 'overview',
    component: Debts,
  },
  {
    id: 'overview',
    title: 'Yfirlit',
    prev: 'assets',
    next: 'done',
    component: Overview,
  },
  {
    id: 'done',
    component: Done,
  },
]
