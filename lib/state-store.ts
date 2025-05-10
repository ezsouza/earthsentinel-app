"use client"

import { create } from "zustand"

interface StateStore {
  selectedState: string
  setSelectedState: (state: string) => void
}

export const useStateStore = create<StateStore>((set) => ({
  selectedState: "all",
  setSelectedState: (state) => set({ selectedState: state }),
}))
