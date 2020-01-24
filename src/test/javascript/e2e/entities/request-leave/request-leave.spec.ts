import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RequestLeaveComponentsPage, RequestLeaveDeleteDialog, RequestLeaveUpdatePage } from './request-leave.page-object';

const expect = chai.expect;

describe('RequestLeave e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let requestLeaveComponentsPage: RequestLeaveComponentsPage;
  let requestLeaveUpdatePage: RequestLeaveUpdatePage;
  let requestLeaveDeleteDialog: RequestLeaveDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RequestLeaves', async () => {
    await navBarPage.goToEntity('request-leave');
    requestLeaveComponentsPage = new RequestLeaveComponentsPage();
    await browser.wait(ec.visibilityOf(requestLeaveComponentsPage.title), 5000);
    expect(await requestLeaveComponentsPage.getTitle()).to.eq('wineaApp.requestLeave.home.title');
  });

  it('should load create RequestLeave page', async () => {
    await requestLeaveComponentsPage.clickOnCreateButton();
    requestLeaveUpdatePage = new RequestLeaveUpdatePage();
    expect(await requestLeaveUpdatePage.getPageTitle()).to.eq('wineaApp.requestLeave.home.createOrEditLabel');
    await requestLeaveUpdatePage.cancel();
  });

  it('should create and save RequestLeaves', async () => {
    const nbButtonsBeforeCreate = await requestLeaveComponentsPage.countDeleteButtons();

    await requestLeaveComponentsPage.clickOnCreateButton();
    await promise.all([
      requestLeaveUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      requestLeaveUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      requestLeaveUpdatePage.setEmployeeidInput('5'),
      requestLeaveUpdatePage.setAcceptedLeaveInput('5'),
      requestLeaveUpdatePage.employeeSelectLastOption()
    ]);
    expect(await requestLeaveUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await requestLeaveUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    expect(await requestLeaveUpdatePage.getEmployeeidInput()).to.eq('5', 'Expected employeeid value to be equals to 5');
    expect(await requestLeaveUpdatePage.getAcceptedLeaveInput()).to.eq('5', 'Expected acceptedLeave value to be equals to 5');
    await requestLeaveUpdatePage.save();
    expect(await requestLeaveUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await requestLeaveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RequestLeave', async () => {
    const nbButtonsBeforeDelete = await requestLeaveComponentsPage.countDeleteButtons();
    await requestLeaveComponentsPage.clickOnLastDeleteButton();

    requestLeaveDeleteDialog = new RequestLeaveDeleteDialog();
    expect(await requestLeaveDeleteDialog.getDialogTitle()).to.eq('wineaApp.requestLeave.delete.question');
    await requestLeaveDeleteDialog.clickOnConfirmButton();

    expect(await requestLeaveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
