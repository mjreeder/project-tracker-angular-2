import { ProjectTrackerAngular2Page } from './app.po';

describe('project-tracker-angular-2 App', function() {
  let page: ProjectTrackerAngular2Page;

  beforeEach(() => {
    page = new ProjectTrackerAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
