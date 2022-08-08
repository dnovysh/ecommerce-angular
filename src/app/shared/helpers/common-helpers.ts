import { ParamMap, Params } from "@angular/router";
import { SortMeta } from "primeng/api";

export class CommonHelpers {
  public static parseIntParameter(value: string | null): number | null {
    if (value === null) {
      return null
    }
    const parsed = parseInt(value);
    if (isNaN(parsed)) {
      return null
    }
    return parsed
  }

  public static getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

  public static parseUrl(relativeUrl: string): ParsedUrl {
    const parseFailed = {
      successfullyParsed: false,
      pathname: '/',
      queryParams: null
    }
    if (relativeUrl === undefined || relativeUrl === null || relativeUrl.trim() === '') {
      return parseFailed
    }
    try {
      let queryParams: Params | null = null
      const fullUrl = new URL(relativeUrl, location.origin)
      fullUrl.searchParams.forEach(((value, key) => {
        queryParams = { ...queryParams, [key]: value }
      }))
      return {
        successfullyParsed: true,
        pathname: fullUrl.pathname,
        queryParams: queryParams
      }
    } catch (e) {
      console.log(CommonHelpers.getErrorMessage(e))
      return parseFailed
    }
  }
}

export function convertParamMapToParams(paramMap: ParamMap | null, excludeKeys?: string[]): Params {
  const params: Params = {}
  if (paramMap === undefined || paramMap === null) {
    return params
  }
  for (const key of paramMap.keys) {
    if (excludeKeys && excludeKeys.includes(key)) continue
    const values = paramMap.getAll(key)
    if (values.length > 1) {
      params[key] = values
    } else {
      params[key] = paramMap.get(key)
    }
  }
  return params
}

export function convertSortMetaToQueryString(sortMeta: SortMeta): string {
  if (sortMeta.order < 0) {
    return sortMeta.field + ',desc'
  }
  return sortMeta.field
}

export interface ParsedUrl {
  successfullyParsed: boolean
  pathname: string
  queryParams: Params | null
}
