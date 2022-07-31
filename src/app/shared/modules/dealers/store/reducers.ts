import { Action, createReducer, on } from "@ngrx/store";
import { DealersStateInterface } from "src/app/shared/modules/dealers/types/dealers-state.interface";
import {
  getDealersAction,
  getDealersFailureAction,
  getDealersSuccessAction
} from "src/app/shared/modules/dealers/store/get-dealers.action";

const initialState: DealersStateInterface = {
  isLoading: false,
  data: null,
  error: null
}

export const reducer = createReducer<DealersStateInterface, Action>(
  initialState,
  on(getDealersAction, (state): DealersStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getDealersSuccessAction, (state, action): DealersStateInterface => ({
    ...state,
    isLoading: false,
    data: action.dealers
  })),
  on(getDealersFailureAction, (state, action): DealersStateInterface => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
)
