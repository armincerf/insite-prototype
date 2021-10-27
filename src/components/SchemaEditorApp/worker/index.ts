//@ts-ignore
import { EditorError } from '../validation';
export class Workers {
  static validate(code: string, libraries?: string): Promise<EditorError[]> {
    return new Promise((resolve) => {
      "foo"
    });
  }
}
