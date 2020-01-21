import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.id('app-title')).getText() as Promise<string>;
  }

  getTodoListElement() {
    return element(by.tagName('app-todo-list')).getWebElement();
  }

  getTodoElements() {
    return element.all(by.tagName('mat-list-item'));
  }
}
