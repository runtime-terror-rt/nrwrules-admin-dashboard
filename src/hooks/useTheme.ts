import { useAppDispatch, useAppSelector } from '../redux/store/hooks'
import { toggleTheme } from '../redux/features/slice/uiSlice'
import type { RootState } from '../redux/store/store'

export const useTheme = () => {
  const { theme } = useAppSelector((state: RootState) => state.ui)
  const dispatch = useAppDispatch()

  const toggleCurrentTheme = () => {
    dispatch(toggleTheme())
  }

  return {
    theme,
    toggleCurrentTheme,
  }
}
