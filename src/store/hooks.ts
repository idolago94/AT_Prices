import { AppDispatch, RootState } from "@store"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// General
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Prefences reducer
export const usePrefencesReducer = () => useAppSelector(state => state.prefences)
