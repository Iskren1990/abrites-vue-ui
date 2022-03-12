import { Ref, ref, watchEffect } from "vue";

interface IDropdownProps {
  visible?: boolean;
  /// Whether to auto hide the dropdown on dropdown item's click.
  isContentSelectable?: boolean;
  /// Specifies that the dropdown is only progmatically operatable.
  manual?: boolean;
  /// Dropdown toggle handle.
  /// If is not set the component fallbacks to its first parent element.
  handle?: HTMLElement;
}

export class DropdownController {
  // Dropdown instances
  private static instances: DropdownController[] = [];
  id = Date.now();

  /// default handler
  /// component imput props
  /// reference to the current component display state

  constructor(
    public elRef: Ref<HTMLElement | undefined>,
    private props: IDropdownProps,
    public isVisible: Ref<boolean>
  ) {
    this.isManual = props.manual as boolean;
    DropdownController.instances.push(this);
  }

  private _handle: HTMLElement = document.createElement("div");
  get handle() {
    return this._handle;
  }
  set handle(el: HTMLElement) {
    // check if handle is selected, if not attach the handle to the parent element.
    if (!el && !this.elRef.value?.parentElement) return;
    this._handle = el || this.elRef.value?.parentElement;
  }

  // should the component be controlled programatically only
  private _isManual = ref<boolean>(false);
  get isManual() {
    return this._isManual.value;
  }
  set isManual(val) {
    this._isManual.value = val;
  }

  hide = () => {
    if (!this.isVisible.value) {
      return;
    }

    this.isVisible.value = false;

    if (this.handle.style.zIndex == "1001") {
      this.handle.style.zIndex = "";
    }
  };

  show = () => {
    if (this.isVisible.value) {
      return;
    }

    this._closeOtherDropdowns();

    this.isVisible.value = true;

    if (!this.handle.style.zIndex.length) {
      this.handle.style.zIndex = "1001";
    }
  };

  toggle = () => (this.isVisible.value ? this.hide() : this.show());

  contentClick = (e: Event) => {
    if (!this.props.isContentSelectable) {
      // force hide on dropdown item click
      e?.stopImmediatePropagation();
      this.hide();
    }
  };

  mount = () => {
    this.handle = this.props.handle as HTMLElement;
    watchEffect(() => {
      // set handle at runtime
      this.handle.removeEventListener("click", this.handleListener);
      this.handle = this.props.handle as HTMLElement;
      this.handle.addEventListener("click", this.handleListener);
    });

    this.isVisible.value = this.props.visible || false;
    this.handle.addEventListener("click", this.handleListener);
  };

  unmount = () => {
    // check if handle is selected, if not attach the handle to the parent element
    this.handle?.removeEventListener("click", this.handleListener);
  };

  handleListener = (e: Event) => {
    const isParent = this.elRef.value?.contains(e?.target as Node);

    if (this.props.isContentSelectable && isParent) {
      return;
    }

    e?.stopPropagation();
    e?.preventDefault();

    this.toggle();
  };

  /// Closes other active dropdowns
  private _closeOtherDropdowns() {
    DropdownController.instances
      .filter((inst) => inst._isNotParentTo(this) && inst.isVisible.value)
      .map((inst) => inst.hide());
  }

  private _isNotParentTo(other: DropdownController) {
    let current: HTMLElement | null | undefined = other.elRef.value;
    while (current && !current.isEqualNode(this.elRef.value as Node)) {
      current = current.parentElement;
    }
    return current == null;
  }
}
