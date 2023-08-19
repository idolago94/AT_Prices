import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '@store/hooks'

export const PrefencesReducerName = "prefences"

export interface IPrefencesReducer {
    initialScreen: string
}

const INITIAL_STATE: IPrefencesReducer = {
    initialScreen: ""
}

const actions = {
    setInitialScreen: (state: IPrefencesReducer, action: PayloadAction<string>) => {
        state.initialScreen = action.payload
    }
}

export const PrefencesReducer = createSlice({
  name: PrefencesReducerName,
  initialState: INITIAL_STATE,
  reducers: actions
})

// Action creators are generated for each case reducer function
export const { setInitialScreen } = PrefencesReducer.actions

export default PrefencesReducer.reducer