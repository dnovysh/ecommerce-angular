import { createAction } from "@ngrx/store";

export enum NoOperationActionType {
  NO_OPERATION = '[App] No operation'
}

export const noOperationAction = createAction(
  NoOperationActionType.NO_OPERATION
)
