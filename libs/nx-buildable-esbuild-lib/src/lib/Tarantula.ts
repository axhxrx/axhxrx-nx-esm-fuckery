import { Animal } from './Animal.ts';

export class Tarantula extends Animal
{
  constructor(name: string, age: number)
  {
    super(name, age, 'Tarantula');
  }

  override makeSound(): void
  {
    console.log(`${this.name} hisses.`);
  }

  override move(): void
  {
    console.log(`${this.name} crawls.`);
  }
}
