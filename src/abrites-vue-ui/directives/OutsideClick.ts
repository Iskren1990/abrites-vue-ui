import { DirectiveBinding, VNode } from "vue";

function callbackHandlerRef(
  el: HTMLElement,
  binding: DirectiveBinding<() => unknown>
) {
  return function outsideClickEvent(event: MouseEvent) {
    if (!el.contains(event.target as HTMLElement)) {
      binding.value();
    }
  };
}

let reff: (event: MouseEvent) => void;

// IIFE
export default (function AbritesOutsideClick() {
  /// Example
  /// ```html
  /// <div v-abrites-outside-click="callbackFn" />
  /// ```

  function mounted(
    el: HTMLElement,
    binding: DirectiveBinding<() => unknown>
  ): void {
    reff = callbackHandlerRef(el, binding);
    document.addEventListener("mousedown", reff);
    document.addEventListener("click", reff);
  }

  function unmounted(el: HTMLElement) {
    document.removeEventListener("mousedown", reff);
    document.removeEventListener("click", reff);
  }

  return {
    name: "abrites-outside-click",
    directive: {
      mounted,
      unmounted,
    },
  };
})();
