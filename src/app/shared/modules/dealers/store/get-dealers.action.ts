import { createAction, props } from "@ngrx/store";
import { DealerInterface } from "src/app/shared/modules/identity/types/dealer.interface";
import { ActionTypes } from "src/app/shared/modules/dealers/store/action.types";
import { ApiErrorInterface } from "src/app/shared/types/error/api-error.interface";


export const getDealersAction = createAction(
  ActionTypes.GET_DEALERS
)

export const getDealersSuccessAction = createAction(
  ActionTypes.GET_DEALERS_SUCCESS,
  props<{ dealers: DealerInterface[] }>()
)

export const getDealersFailureAction = createAction(
  ActionTypes.GET_DEALERS_FAILURE,
  props<{ error: ApiErrorInterface | null }>()
)
