import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 0,
}
const babyCareModalSlice = createSlice({
    name: "babyCareModal",
    initialState,
    reducers: {
        nextBabyCareStep: (state: typeof initialState) => {
            state.step += 1;
        },
        prevBabyCareStep: (state: typeof initialState) => {
            state.step -= 1;
        },
        resetBabyCareStep: (state: typeof initialState) => {
            state.step = 0;
        },
    },
})

export const { nextBabyCareStep, prevBabyCareStep, resetBabyCareStep } = babyCareModalSlice.actions
export default babyCareModalSlice.reducer
