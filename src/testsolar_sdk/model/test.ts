export class TestCase {
  Name: string;
  Attrs: Record<string, string>;

  constructor(name: string, attrs: Record<string, string>) {
    this.Name = name;
    this.Attrs = attrs;
  }
}
