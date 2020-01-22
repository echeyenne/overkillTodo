import { browser, by, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
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

  it('should close todo and add it at the end of the list', () => {
    const firstTodoIndex = 0;
    const lastTodoIndex = 4;

    const lastClosedTodoTitle = 'todo in memory 3';
    const closingTodoTitle = 'todo in memory 1';

    page.navigateTo();
    expect(page.getTodoListElement().isDisplayed()).toBeTruthy();

    expect(page.getTodoTitle(firstTodoIndex)).toBe(closingTodoTitle);
    expect(page.isTodoDone(firstTodoIndex)).toBeFalsy();

    expect(page.getTodoTitle(lastTodoIndex)).toBe(lastClosedTodoTitle);
    expect(page.isTodoDone(lastTodoIndex)).toBeTruthy();

    page.toggleTodo(firstTodoIndex);

    expect(page.getTodoTitle(firstTodoIndex)).not.toBe(closingTodoTitle);
    expect(page.getTodoTitle(lastTodoIndex)).toBe(closingTodoTitle);
    expect(page.isTodoDone(lastTodoIndex)).toBeTruthy();
  });

  it('should open todo and add it at the beginning of the list', () => {
    const firstTodoIndex = 0;
    const lastTodoIndex = 4;

    const firstTodoTitle = 'todo in memory 1';
    const openingTodoTitle = 'todo in memory 3';

    page.navigateTo();
    expect(page.getTodoListElement().isDisplayed()).toBeTruthy();

    expect(page.getTodoTitle(firstTodoIndex)).toBe(firstTodoTitle);
    expect(page.isTodoDone(firstTodoIndex)).toBeFalsy();

    expect(page.getTodoTitle(lastTodoIndex)).toBe(openingTodoTitle);
    expect(page.isTodoDone(lastTodoIndex)).toBeTruthy();

    page.toggleTodo(lastTodoIndex);

    expect(page.getTodoTitle(firstTodoIndex)).toBe(openingTodoTitle);
    expect(page.getTodoTitle(lastTodoIndex)).not.toBe(openingTodoTitle);
    expect(page.isTodoDone(firstTodoIndex)).toBeFalsy();
  });
});
