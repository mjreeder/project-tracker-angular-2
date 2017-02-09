import { ProjectTrackerAngularTwoPage } from './app.po';

describe('project-tracker-angular-two App', function() {
  let page: ProjectTrackerAngularTwoPage;

  beforeEach(() => {
    page = new ProjectTrackerAngularTwoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
