import {environment} from "src/environments/environment";

export class CatalogHelpers {

  public static getProductImageSrc = (productImage: string | null): string => {
    if (productImage) {
      const trimmedProductImage = productImage.trim()
      if (trimmedProductImage) {
        return environment.baseProductImageSource + trimmedProductImage
      }
    }
    return this.getDefaultProductImage()
  }

  public static getDefaultProductImage = (): string => environment.defaultProductImage

  public static getNumberOfRatingStars = (rating: number | null): number => {
    // one star for interval 0-29
    // two stars for interval 30-49
    // three stars for interval 50-69
    // four stars for interval 70-89
    // five stars for interval 90-100
    // no stars for null
    if (rating === 0) return 1
    return rating ? Math.round((rating) / 20) : 0;
  }
}
