import * as mod from "@axhxrx/date";

export class Animal
{
  name: string;
  age: number;
  species: string;
  
  born = mod.dateToIS08601WithTimeZoneOffset();

  constructor(name: string, age: number, species: string)
  {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  makeSound(): void
  {
    console.log(`${this.name} makes a sound.`);
  }

  move(): void
  {
    console.log(`${this.name} is moving.`);
  }
}
