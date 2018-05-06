
import { Container, ContainerInstance } from 'typedi';

declare global {
  namespace NodeJS {
    interface Global {
      container: Container;
    }
  }
}