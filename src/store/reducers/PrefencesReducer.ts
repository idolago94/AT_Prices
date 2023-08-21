import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductsMap } from '../../types/Product';

export const PrefencesReducerName = "prefences"

export interface IPrefencesReducer {
    initialScreen: string;
    products: ProductsMap
}



const INITIAL_STATE: IPrefencesReducer = {
    initialScreen: "",
    products: {
        firstProduct: {
            name: "first product"
        }
    }
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