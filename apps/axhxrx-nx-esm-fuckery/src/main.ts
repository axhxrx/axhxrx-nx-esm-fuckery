import { Animal } from '@local/nx-buildable-esbuild-lib'
  import * as mod from "@axhxrx/date";


    const a = new Animal('Bob', 10, 'humans');

console.log('Hello Bob', a, a.born);

console.log(mod.dateToIS08601WithTimeZoneOffset());