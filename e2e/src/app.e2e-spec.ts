import { browser, by, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Overkill Todo App');
  });

  it('should display todo list', () => {
    page.navigateTo();
    expect(page.getTodoListElement().isDisplayed()).toBeTruthy();
    expect(page.getTodoListElement().findElement(by.id('todoListTitle')).getText()).toEqual('Todos');
    expect(page.getTodoElements().count()).toBe(5);
    // Considering todo list component is tested, this test is light
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
