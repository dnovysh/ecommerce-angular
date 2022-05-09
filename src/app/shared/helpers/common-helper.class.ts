import { Params } from "@angular/router";

export class CommonHelperClass {
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
      console.log(CommonHelperClass.getErrorMessage(e))
      return parseFailed
    }
  }
}

export interface ParsedUrl {
  successfullyParsed: boolean
  pathname: string
  queryParams: Params | null
}
