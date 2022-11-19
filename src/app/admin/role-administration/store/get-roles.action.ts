import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "src/app/admin/role-administration/store/action.types";
import { RoleInterface } from "src/app/admin/role-administration/types/role.interface";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const getRolesAction = createAction(
  ActionTypes.GET_ROLES
)

export const getRolesSuccessAction = createAction(
  ActionTypes.GET_ROLES_SUCCESS,
  props<{ roles: RoleInterface[] }>()
)

export const getRolesFailureAction = createAction(
  ActionTypes.GET_ROLES_FAILURE,
  props<{ error: ApiErrorInterface }>()
)
