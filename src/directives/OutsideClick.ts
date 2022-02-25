import { DirectiveBinding } from "vue";

class ClickHandler {
  private _outsideClickStarted = false;
  private el;

  get id() {
    return this.el.id;
  }

  init(el: ElementWithBinding) {
    this.el = el;
    document.addEventListener("mousedown", this.outsideClickStarted.bind(this));
    document.addEventListener("click", this.outsideClickEvent.bind(this));
  }

  destroy() {
    document.removeEventListener(
      "mousedown",
      this.outsideClickEvent.bind(this)
    );
    document.removeEventListener("click", this.outsideClickStarted.bind(this));
  }

  outsideClickStarted(e: Event) {
    if (!this.el.contains(e.target as Node)) {
      this._outsideClickStarted = true;
    }
  }

  outsideClickEvent(event: MouseEvent) {
    if (this.el == null || !this._outsideClickStarted) {
      this._outsideClickStarted = false; // reset
      return;
    }
    if (
      !this.el.contains(event.target as Node) &&
      typeof this.el.callback == "function" &&
      typeof this.el.callback() == "function"
    ) {
      console.log("clicked");

      this.el.callback()();
    }
    this._outsideClickStarted = false; // reset
  }
}

let instances: (void | ClickHandler)[] = [];

interface ElementWithBinding extends HTMLElement {
  callback: () => () => unknown;
}

// IIFE
export default (function AbritesOutsideClick() {
  /// Example
  /// ```html
  /// <div v-abrites-outside-click="callbackFn" />
  /// ```

  function mounted(
    el: ElementWithBinding,
    binding: DirectiveBinding<() => () => unknown>
  ): void {
    el.callback = binding.value;
    el.id = instances.length.toString();
    const instance = new ClickHandler();

    instances[el.id] = instance;
    instance.init(el);
  }

  function unmounted(el) {
    instances = instances.filter((inst: ClickHandler) =>
      inst.id == el.id ? inst.destroy() : inst
    );
  }

  return {
    name: "abrites-outside-click",
    directive: {
      mounted,
      unmounted,
    },
  };
})();
