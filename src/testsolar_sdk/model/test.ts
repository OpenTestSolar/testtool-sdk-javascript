export class TestCase {
  Name: string;
  Attributes: Record<string, string>;

  constructor(name: string, attributes: Record<string, string>) {
    this.Name = name;
    this.Attributes = attributes;
  }
}
