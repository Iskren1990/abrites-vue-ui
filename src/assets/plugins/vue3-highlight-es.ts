import hljs from "highlight.js";
import { App } from "vue";

function HighlightJs(app: App) {
  app.directive("highlightjs", function (el: HTMLElement, binding): void {
    const codeNodes = el.querySelectorAll("code").forEach((codeNode) => {
      if (typeof binding.value === "string") {
        codeNode.textContent = binding.value;
      }
      hljs.highlightElement(codeNode);
    });
  });
}

export default HighlightJs;
