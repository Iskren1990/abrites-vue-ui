interface IAccordionPanelState {
  isExpanded: boolean;
  isDisabled: boolean;
  isNoninteractive: boolean;
  animationSpeed: number;
  scrollIntoView: boolean | undefined;
  toggleIcon: () => string;
  canInteract: () => boolean;
  disable: () => void;
  enable: () => void;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}

interface IAccordionParentController {
  addChildState: (state: IAccordionPanelState) => number;
}

export { IAccordionPanelState, IAccordionParentController };
