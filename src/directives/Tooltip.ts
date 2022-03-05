import { DirectiveBinding } from "vue";

interface IInput {
  abritesTooltip: string;
  abritesTooltipPosition: string;
  abritesTooltipDelay: number;
}

function tooltipState(el: Element) {
  const _tooltipStyles = `
    .abrites-tooltip-wrapper {
      display: block;
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
    }
    .abrites-tooltip {
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      padding: 5px 7px;
      margin: 0;
      width: auto;
      color: #fff;
      border-radius: 2px;
      font-size: 0.95rem;
      font-weight: 500;
      max-width: 220px;
      text-align: center;
      line-height: normal;
      box-sizing: border-box;
      background: rgba(51,52,57,0.95);
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.3);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      user-select: none;
      animation: hide 0.2s linear;
      overflow-wrap: break-word;
    }
    .abrites-tooltip.active {
      opacity: 0;
      animation-direction: alternate;
      animation: show 0.15s linear forwards;
    }
    .abrites-tooltip.repositioning {
      left: 0 important;
      top: 0 important;
    }
    @keyframes show {
      0% { visibility: hidden; opacity: 0; transform: scale(0.9) }
      100% { visibility: visible; opacity: 1; transform: scale(1) }
    }
    @keyframes hide {
      0% { visibility: visible; opacity: 1; transform: scale(1) }
      100% { visibility: hidden; opacity: 0; transform: scale(0.9) }
    }
  `;

  const _sourceElem: Element = el;

  const hTolerance = 5;
  const vTolerance = 5;

  let abritesTooltip: string;

  /// Defines the tooltip position relative to its source. Supported values are:
  /// `right`, `left`, `top`, `bottom`, `top-left`, `top-right`, `bottom-right`, `bottom-left`.
  let abritesTooltipPosition: string;

  let abritesTooltipDelay: number;

  let _isSourceElemTooltipActive = false;

  let _delayEventTimer: number;

  let _tooltip: HTMLElement;

  function tooltip(): HTMLElement {
    _tooltip ??= document.body.querySelector(".abrites-tooltip") as HTMLElement;

    if (_tooltip == null) {
      _tooltip = document.createElement("div");
      _tooltip.classList.add("abrites-tooltip");

      const wrapper = document.createElement("div");
      wrapper.classList.add("abrites-tooltip-wrapper");
      wrapper.append(_tooltip);

      document.body.append(wrapper);

      _injectTooltipStyles(wrapper);

      // global event
      document.addEventListener("scroll", onHideDelay, true);
    }

    return _tooltip;
  }

  function isTooltipActive(): boolean {
    return tooltip()?.classList.contains("active");
  }

  function showTooltip(): void {
    if (abritesTooltip?.length == 0 ?? true) {
      return;
    }

    clearTimer();

    tooltip().textContent = abritesTooltip ?? null;

    _repositionTooltip();

    tooltip().classList.add("active");

    _isSourceElemTooltipActive = true;
  }

  function hideTooltip(): void {
    clearTimer();

    tooltip().classList.remove("active");

    _isSourceElemTooltipActive = false;
  }

  // events handlers
  // ---
  const onShow = (e: Event): void => showTooltip();
  function onShowDelay(e: Event): void {
    clearTimer();

    _delayEventTimer = window.setTimeout(() => onShow(e), abritesTooltipDelay);
  }

  const onHide = (e: Event): void => hideTooltip();
  function onHideDelay(e: Event): void {
    clearTimer();

    _delayEventTimer = window.setTimeout(() => onHide(e), abritesTooltipDelay);
  }
  // ---

  function _injectTooltipStyles(parent?: HTMLElement): void {
    const style = document.createElement("style");
    style.hasAttribute || style.setAttribute("scoped", "");

    style.innerHTML = _tooltipStyles;

    parent?.append(style);
  }

  function _repositionTooltip(): void {
    if (_sourceElem == null) {
      return;
    }

    const rect = _sourceElem.getBoundingClientRect();

    tooltip().classList.add("repositioning");

    let top = 0;
    let left = 0;

    if (abritesTooltipPosition == "top") {
      top = rect.top - tooltip().offsetHeight - vTolerance;
      left = rect.left + rect.width / 2 - tooltip().offsetWidth / 2;
    } else if (abritesTooltipPosition == "top-left") {
      top = rect.top - tooltip().offsetHeight - vTolerance;
      left = rect.left;
    } else if (abritesTooltipPosition == "top-right") {
      top = rect.top - tooltip().offsetHeight - vTolerance;
      left = rect.right - tooltip().offsetWidth;
    } else if (abritesTooltipPosition == "left") {
      top = rect.top + rect.height / 2 - tooltip().offsetHeight / 2;
      left = rect.left - tooltip().offsetWidth - hTolerance;
    } else if (abritesTooltipPosition == "right") {
      top = rect.top + rect.height / 2 - tooltip().offsetHeight / 2;
      left = rect.right + hTolerance;
    } else if (abritesTooltipPosition == "bottom-right") {
      top = rect.bottom + vTolerance;
      left = rect.right - tooltip().offsetWidth;
    } else if (abritesTooltipPosition == "bottom-left") {
      top = rect.bottom + vTolerance;
      left = rect.left;
    } else {
      // bottom
      top = rect.bottom + vTolerance;
      left = rect.left + rect.width / 2 - tooltip().offsetWidth / 2;
    }

    // check window constraints
    if (left < 0) {
      left = 0;
    } else if (left + tooltip().offsetWidth > window.innerWidth) {
      left = window.innerWidth - tooltip().offsetWidth;
    }
    if (top < 0) {
      top = 0;
    } else if (top + tooltip().offsetHeight > window.innerHeight) {
      left = window.innerHeight - tooltip().offsetHeight;
    }

    tooltip().style.top = `${top}px`;
    tooltip().style.left = `${left}px`;

    tooltip().classList.remove("repositioning");
  }

  function getInput(args: IInput | string) {
    if (typeof args === "string") {
      abritesTooltip = args;
      return;
    } else {
      abritesTooltip = args.abritesTooltip;
      abritesTooltipPosition = args.abritesTooltipPosition ??= "bottom";
      abritesTooltipDelay = args.abritesTooltipDelay ??= 300;
    }
  }

  function clearTimer() {
    window.clearTimeout(_delayEventTimer);
  }
  return {
    onShowDelay,
    onHide,
    onHideDelay,
    _sourceElem,
    getInput,
    _isSourceElemTooltipActive,
    hideTooltip,
    clearTimer,
    tooltip,
  };
}

// IIFE
export default (function AbritesTooltip() {
  /// Example
  /// ```html
  /// <p v-abrites-tooltip="My tooltip content">Lorem ipsum</p>
  /// ```

  function mounted(el: Element, binding: DirectiveBinding): void {
    const ttState = tooltipState(el);
    ttState.getInput(binding.value);
    ttState._sourceElem = el;
    ttState._sourceElem?.addEventListener("focusin", ttState.onShowDelay);
    ttState._sourceElem?.addEventListener("mouseenter", ttState.onShowDelay);
    ttState._sourceElem?.addEventListener("focusout", ttState.onHide);
    ttState._sourceElem?.addEventListener("mouseleave", ttState.onHide);
    ttState._sourceElem?.addEventListener("mousedown", ttState.onHideDelay);
  }

  function unmounted(el: Element, binding: DirectiveBinding): void {
    const ttState = tooltipState(el);
    if (ttState._isSourceElemTooltipActive) {
      ttState.hideTooltip();
    }

    ttState.clearTimer();

    // cleanup binded element listeners
    ttState._sourceElem?.removeEventListener("focusin", ttState.onShowDelay);
    ttState._sourceElem?.removeEventListener("mouseenter", ttState.onShowDelay);
    ttState._sourceElem?.removeEventListener("focusout", ttState.onHide);
    ttState._sourceElem?.removeEventListener("mouseleave", ttState.onHide);
    ttState._sourceElem?.removeEventListener("mousedown", ttState.onHideDelay);

    // there is no need to remove the tooltip container
    // since it is more expensive to constantly create/delete it
    // and most likely there will be always an element that will reuse it
    // document.removeEventListener('scroll', onHideDelay, true);
    // tooltip?.remove();
  }

  return {
    name: "abrites-tooltip",
    directive: {
      mounted,
      unmounted,
    },
  };
})();
