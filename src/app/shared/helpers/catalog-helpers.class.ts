import {InventoryStatusEnum} from "src/app/shared/types/catalog/inventory-status.enum";
import {ProductInterface} from "src/app/shared/types/catalog/product.interface";

export class CatalogHelpers {

  public static getProductsWithCalculatedInventoryStatus(products: ProductInterface[] | null)
    : ProductInterface[] | null {
    if (products === null) {
      return null
    }
    return products.map((product) => this.getProductWithCalculatedInventoryStatus(product))
  }

  public static getProductWithCalculatedInventoryStatus(product: ProductInterface): ProductInterface {
    return {
      ...product,
      inventoryStatus: this.getInventoryStatus(product.unitsInStock)
    }
  }

  private static getInventoryStatus(unitsInStock: bigint): string {
    if (unitsInStock > BigInt(3)) {
      return InventoryStatusEnum.IN_STOCK
    } else if (unitsInStock > BigInt(0)) {
      return InventoryStatusEnum.LOW_STOCK
    }
    return InventoryStatusEnum.OUT_OF_STOCK
  }

}
