import { nxBuildableEsbuildLib } from './nx-buildable-esbuild-lib.ts';
import { Animal } from './Animal.ts';

describe('nxBuildableEsbuildLib', () => {
  it('should work', () => {
    expect(nxBuildableEsbuildLib()).toEqual('nx-buildable-esbuild-lib');
  });

  it('should work in apps', () => {
    const a = new Animal('Bob', 10, 'humans');
    expect(a.name).toEqual('Bob');
    expect(a.born).not.toBeUndefined();
    // expect(a.born).toEqual('2022-01-27T15:49:01.000Z');
  });
});
