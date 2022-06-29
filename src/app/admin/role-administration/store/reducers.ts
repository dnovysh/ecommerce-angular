import { Action, createReducer, on } from "@ngrx/store";
import { RoleStateInterface } from "src/app/admin/role-administration/types/role-state.interface";
import {
  getRolesAction,
  getRolesFailureAction,
  getRolesSuccessAction
} from "src/app/admin/role-administration/store/get-roles.action";


const initialState: RoleStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

export const reducer = createReducer<RoleStateInterface, Action>(
  initialState,
  on(getRolesAction, (state): RoleStateInterface => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getRolesSuccessAction, (state, action): RoleStateInterface => ({
    ...state,
    isLoading: false,
    data: action.roles
  })),
  on(getRolesFailureAction, (state, action): RoleStateInterface => ({
    ...state,
    isLoading: false,
    error: action.error,
    data: null
  }))
)
