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
}
