import { useContext } from 'react'
import { SheetContext } from './sheet-context'

export function useSheetRef() {
  return useContext(SheetContext)
}
