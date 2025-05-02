import { Step2 } from './Step2'
import { DataCollection } from './DataCollection'
import { Step3 } from './Step3'
import { Step4 } from './Step4'

export const formSteps = [
  {
    id: 'step1',
    title: 'Skref 1',
    next: 'step2',
    component: DataCollection,
  },
  {
    id: 'step2',
    title: 'Skref 2',
    prev: 'step1',
    next: 'step3',
    component: Step2,
  },
  {
    id: 'step3',
    title: 'Skref 3',
    prev: 'step2',
    next: 'step4',
    component: Step3,
  },
  {
    id: 'step4',
    title: 'Skref 4',
    prev: 'step3',
    component: Step4,
  },
]

