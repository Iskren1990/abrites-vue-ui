export class PaginationData {
  public page;
  public pageSize?;
  constructor(page: number, pageSize: number) {
    this.page = page > 0 ? page : 1;
    this.pageSize = pageSize;
  }

  static stringDelimiter = "~";

  static fromString(val: string, defaultPage = 1, defaultPageSize = 15) {
    const parts = val?.split(PaginationData.stringDelimiter);

    if (parts == null || parts.length != 2) {
      return new PaginationData(defaultPage, defaultPageSize);
    }

    return new PaginationData(
      Number(parts[1].trim()) || defaultPage,
      Number(parts[0].trim()) || defaultPageSize
    );
  }

  toString() {
    return `${this.pageSize}${PaginationData.stringDelimiter}${this.page}`;
  }

  get isValid() {
    return this.page > 0 && this.pageSize > 0;
  }

  isEqual(other) {
    return (
      this == other ||
      (other instanceof PaginationData &&
        this.page == other.page &&
        this.pageSize == other.pageSize)
    );
  }
}
