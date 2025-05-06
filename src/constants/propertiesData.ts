export interface PropertyItem {
  id?: number
  type: string
  valueName: string
  value: number
  currency: string
  properties: {
    address?: string
    fastanumer?: string
    yearOfPurchase?: number
    registrationNumber?: string
  }
  submissionId?: number
  createdAt: string
  updatedAt: string
}

export const defaultPropertiesData: PropertyItem[] = [
  {
    type: "DomesticProperty",
    valueName: "Fasteignamat",
    value: 52000000,
    currency: "ISK",
    properties: {
      address: "Bláfjallagata 12",
      fastanumer: "210-9876"
    },
    createdAt: "2025-05-06T12:16:11.035Z",
    updatedAt: "2025-05-06T12:16:11.035Z"
  },
  {
    type: "Vehicle",
    valueName: "Kaupverð",
    value: 3100000,
    currency: "ISK",
    properties: {
      yearOfPurchase: 2021,
      registrationNumber: "KB-521"
    },
    createdAt: "2025-05-06T12:16:11.035Z",
    updatedAt: "2025-05-06T12:16:11.035Z"
  },
  {
    type: "Vehicle",
    valueName: "Kaupverð",
    value: 430000,
    currency: "ISK",
    properties: {
      yearOfPurchase: 2012,
      registrationNumber: "JU-329"
    },
    createdAt: "2025-05-06T12:16:11.035Z",
    updatedAt: "2025-05-06T12:16:11.035Z"
  }
]
