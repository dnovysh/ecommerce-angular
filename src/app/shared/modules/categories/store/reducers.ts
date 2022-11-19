import { Action, createReducer, on } from "@ngrx/store";
import { CategoriesStateInterface } from "src/app/shared/modules/categories/types/categories-state.interface";
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction
} from "src/app/shared/modules/categories/store/get-categories.action";

const initialState: CategoriesStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

export const reducer = createReducer<CategoriesStateInterface, Action>(
  initialState,
  on(getCategoriesAction, (state): CategoriesStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getCategoriesSuccessAction, (state, action): CategoriesStateInterface => ({
    ...state,
    isLoading: false,
    data: action.categories
  })),
  on(getCategoriesFailureAction, (state, action): CategoriesStateInterface => ({
    ...state,
    isLoading: false
  }))
)
