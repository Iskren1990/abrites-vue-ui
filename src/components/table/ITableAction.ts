export interface ITableAction {
  // TableAction(
  //   this.label, {
  //   this.icon,
  //   this.trigger,
  //   this.visible,
  //   this.disabled,
  //   this.cssClass = 'light',
  // });

  /// Button label (or tooltip if [icon] is set)
  label: string;

  /// Icon ligature name of the action (see https://shanfan.github.io/material-icons-cheatsheet/).
  icon?: string;

  /// Additional css class name(s) to add to the action button.
  /// Predefined: .accent, .danger, .success, .warning, .light
  cssClass?: string;

  /// Callback to execute on action button click/tap.
  trigger?: (item: Record<string, never>) => void;

  /// Whether to disable the action button for the specified data item.
  disabled?: (item: Record<string, never>) => boolean;

  /// Whether to show/hide the action button for the specified data item.
  /// If not set, the action button is always visible.
  visible?: (item: Record<string, never>) => boolean;
}
