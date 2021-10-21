import { Foo } from './foo';
import { Bar } from './bar';

export function handler() {
  const foo = new Foo();
  foo.message('hogeeeee');

  const bar = new Bar('barbar');
  bar.message();
  bar.message();
  bar.message();
}
