import { Action, createReducer, on } from "@ngrx/store";
import { CategoryMenuStateInterface } from "src/app/catalog/category-menu/types/category-menu-state.interface";
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction
} from "src/app/catalog/category-menu/store/actions/get-categories.action";

const initialState: CategoryMenuStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

export const reducer = createReducer<CategoryMenuStateInterface, Action>(
  initialState,
  on(getCategoriesAction, (state): CategoryMenuStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getCategoriesSuccessAction, (state, action): CategoryMenuStateInterface => ({
    ...state,
    isLoading: false,
    data: action.categories
  })),
  on(getCategoriesFailureAction, (state, action): CategoryMenuStateInterface => ({
    ...state,
    isLoading: false
  }))
)
