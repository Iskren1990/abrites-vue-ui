import { DirectiveBinding } from "vue";

function outsideClickEvent(el: ElementWithBinding) {
  return (event: MouseEvent) => {
    if (
      !el.contains(event.target as HTMLElement) &&
      typeof el.callback == "function" &&
      typeof el.callback() == "function"
    ) {
      el.callback()();
    }
  };
}

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
    document.addEventListener("click", outsideClickEvent(el));
  }

  function unmounted(el: ElementWithBinding) {
    document.removeEventListener("click", outsideClickEvent(el));
  }

  return {
    name: "abrites-outside-click",
    directive: {
      mounted,
      unmounted,
    },
  };
})();
