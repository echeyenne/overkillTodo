import { browser, by, element, WebElementPromise } from 'protractor';

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

  getTodoElement(index: number) {
    return this.getTodoElements().get(index);
  }

  getTodoCheckboxInput(index: number) {
    return this.getTodoElement(index).element(by.tagName('input'));
  }

  getTodoCheckbox(index: number) {
    return this.getTodoElement(index).element(by.tagName('mat-checkbox'));
  }

  toggleTodo(index: number) {
    return this.getTodoCheckbox(index).click();
  }

  getTodoTitle(index: number) {
    return this.getTodoElement(index).getText();
  }

  isTodoDone(index: number) {
    return this.getTodoCheckboxInput(index).getAttribute('checked');
  }
}
