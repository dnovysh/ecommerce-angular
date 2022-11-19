import { ElementRef } from "@angular/core";
import { Password } from "primeng/password";
import { Checkbox } from "primeng/checkbox";

export class FocusNode {
  key: string
  element: ElementRef | Password | Checkbox
  prev: FocusNode
  next: FocusNode

  constructor(key: string, element: ElementRef | Password | Checkbox) {
    this.key = key
    this.element = element
  }

  setPrev(prev: FocusNode): FocusNode {
    this.prev = prev
    return this
  }

  setNext(next: FocusNode): FocusNode {
    this.next = next
    return this
  }
}
