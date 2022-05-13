import { FocusNode } from "src/app/shared/helpers/focus/focus-node";
import { Password } from "primeng/password";
import { Checkbox } from "primeng/checkbox";

export class FocusNodes {
  private readonly nodes: Map<string, FocusNode>
  private focusedNode: FocusNode

  constructor(nodeArrayCycle: FocusNode[]) {
    if (nodeArrayCycle === undefined || nodeArrayCycle === null || nodeArrayCycle.length < 2) {
      return
    }
    nodeArrayCycle[0]
      .setPrev(nodeArrayCycle[nodeArrayCycle.length - 1]).setNext(nodeArrayCycle[1])
    nodeArrayCycle[nodeArrayCycle.length - 1]
      .setPrev(nodeArrayCycle[nodeArrayCycle.length - 2]).setNext(nodeArrayCycle[0])
    for (let i = 1; i <= nodeArrayCycle.length - 2; i++) {
      nodeArrayCycle[i].setPrev(nodeArrayCycle[i - 1]).setNext(nodeArrayCycle[i + 1])
    }
    this.nodes = new Map<string, FocusNode>()
    nodeArrayCycle.forEach((value) => this.nodes.set(value.key, value))
  }

  add(focusNode: FocusNode): FocusNodes {
    this.nodes.set(focusNode.key, focusNode)
    return this
  }

  getFocusedNodeKey(): string {
    return this.focusedNode?.key;
  }

  focusPrev(): void {
    if (this.focusedNode?.prev) {
      this.focus(this.focusedNode.prev)
    }
  }

  focusNext(): void {
    if (this.focusedNode?.next) {
      this.focus(this.focusedNode.next)
    }
  }

  setFocusedNodeByKey(key: string): void {
    const node = this.nodes.get(key)
    if (node && this.focusedNode?.key !== node.key) {
      this.focusedNode = node
    }
  }

  focusByKey(key: string): void {
    this.focus(this.nodes.get(key))
  }

  private focus(node: FocusNode | undefined): void {
    if (!node?.element) {
      return
    }
    const element = node.element
    setTimeout(() => {
      if (element instanceof Password) {
        element.input.nativeElement.focus()
      } else if (element instanceof Checkbox) {
        element.focus()
      } else {
        element.nativeElement.focus()
      }
      this.focusedNode = node
    }, 0)
  }
}
