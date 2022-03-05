export default class MenuItemModel {
  /// if no [label] or [icon] are provided the menu item is considered a separator
  public label?: string;
  public icon?: string;
  public url: string;
  public children: MenuItemModel[];

  constructor({ label, icon, url = "", children = [] }: NamedParams) {
    this.label = label;
    this.icon = icon;
    this.url = url;
    this.children = children;
  }

  get isSeparator(): boolean {
    return this.label == null && this.icon == null;
  }

  get isLink(): boolean {
    return this.url.length > 0;
  }

  get hasChildren(): boolean {
    return this.children.length > 0;
  }
}

interface NamedParams {
  label?: string;
  icon?: string;
  url?: string;
  children?: MenuItemModel[];
}
