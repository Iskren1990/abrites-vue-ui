import hljs from "highlight.js";
import { App } from "vue";

function HighlightJs(app: App) {
  app.directive("highlightjs", function (el, binding) {
    const codeNodes = el.querySelectorAll("code");

    for (let i = 0; i < codeNodes.length; i++) {
      const codeNode = codeNodes[i];

      if (typeof binding.value === "string") {
        codeNode.textContent = binding.value;
      }

      hljs.highlightElement(codeNode);
    }
  });
}

export default HighlightJs;
