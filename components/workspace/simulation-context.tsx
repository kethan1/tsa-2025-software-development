"use client"

import { createContext, useContext, useState, ReactNode, RefObject } from 'react'

interface SimulationContextType {
  currentYear: number
  setCurrentYear: (year: number) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  videoRef: RefObject<HTMLVideoElement> | null
  setVideoRef: (ref: RefObject<HTMLVideoElement> | null) => void
  videoUploaded: boolean
  setVideoUploaded: (uploaded: boolean) => void
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined)

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentYear, setCurrentYear] = useState(2025)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoRef, setVideoRef] = useState<RefObject<HTMLVideoElement> | null>(null)
  const [videoUploaded, setVideoUploaded] = useState(false)

  return (
    <SimulationContext.Provider value={{
      currentYear,
      setCurrentYear,
      isPlaying,
      setIsPlaying,
      videoRef,
      setVideoRef,
      videoUploaded,
      setVideoUploaded
    }}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  const context = useContext(SimulationContext)
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider')
  }
  return context
} 