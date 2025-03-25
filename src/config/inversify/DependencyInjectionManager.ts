import { Container } from 'inversify';

//singleton design
export default class DependencyInjectionManager {
  private readonly container: Container;
  private static instance: DependencyInjectionManager;

  private constructor() {
    this.container = new Container();
  }

  static getInstance(): DependencyInjectionManager {
    if (!this.instance) {
      this.instance = new DependencyInjectionManager();
    }
    return this.instance;
  }

  getContainer(): Container {
    return this.container;
  }
}
