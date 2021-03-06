import { element, by, ElementFinder } from 'protractor';

export class RequestLeaveComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-request-leave div table .btn-danger'));
  title = element.all(by.css('jhi-request-leave div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class RequestLeaveUpdatePage {
  pageTitle = element(by.id('jhi-request-leave-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  employeeidInput = element(by.id('field_employeeid'));
  acceptedLeaveInput = element(by.id('field_acceptedLeave'));
  employeeSelect = element(by.id('field_employee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async setEmployeeidInput(employeeid: string): Promise<void> {
    await this.employeeidInput.sendKeys(employeeid);
  }

  async getEmployeeidInput(): Promise<string> {
    return await this.employeeidInput.getAttribute('value');
  }

  async setAcceptedLeaveInput(acceptedLeave: string): Promise<void> {
    await this.acceptedLeaveInput.sendKeys(acceptedLeave);
  }

  async getAcceptedLeaveInput(): Promise<string> {
    return await this.acceptedLeaveInput.getAttribute('value');
  }

  async employeeSelectLastOption(): Promise<void> {
    await this.employeeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async employeeSelectOption(option: string): Promise<void> {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect(): ElementFinder {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption(): Promise<string> {
    return await this.employeeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RequestLeaveDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-requestLeave-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-requestLeave'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
