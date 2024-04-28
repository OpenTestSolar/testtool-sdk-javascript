export class TestCase {
  private _name: string;
  private _attrs: Record<string, string>;

  constructor(name: string, attrs: Record<string, string>) {
    this._name = name;
    this._attrs = attrs;
  }

  toJSON(): object {
    return {
      Name: this._name,
      Attributes: this._attrs,
    };
  }

  static fromJSON(json: any): TestCase {
    return new TestCase(json.Name, json.Attributes);
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get attrs(): Record<string, string> {
    return this._attrs;
  }

  set attrs(value: Record<string, string>) {
    this._attrs = value;
  }
}
