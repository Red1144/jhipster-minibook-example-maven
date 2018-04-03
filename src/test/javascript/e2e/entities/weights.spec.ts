import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Weights e2e test', () => {

    let navBarPage: NavBarPage;
    let weightsDialogPage: WeightsDialogPage;
    let weightsComponentsPage: WeightsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Weights', () => {
        navBarPage.goToEntity('weights');
        weightsComponentsPage = new WeightsComponentsPage();
        expect(weightsComponentsPage.getTitle())
            .toMatch(/twentyOnePointsApp.weights.home.title/);

    });

    it('should load create Weights dialog', () => {
        weightsComponentsPage.clickOnCreateButton();
        weightsDialogPage = new WeightsDialogPage();
        expect(weightsDialogPage.getModalTitle())
            .toMatch(/twentyOnePointsApp.weights.home.createOrEditLabel/);
        weightsDialogPage.close();
    });

    it('should create and save Weights', () => {
        weightsComponentsPage.clickOnCreateButton();
        weightsDialogPage.setTimeInput(12310020012301);
        expect(weightsDialogPage.getTimeInput()).toMatch('2001-12-31T02:30');
        weightsDialogPage.setWeightInput('5');
        expect(weightsDialogPage.getWeightInput()).toMatch('5');
        weightsDialogPage.userSelectLastOption();
        weightsDialogPage.save();
        expect(weightsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WeightsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-weights div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WeightsDialogPage {
    modalTitle = element(by.css('h4#myWeightsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    timeInput = element(by.css('input#field_time'));
    weightInput = element(by.css('input#field_weight'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
    };

    setWeightInput = function(weight) {
        this.weightInput.sendKeys(weight);
    };

    getWeightInput = function() {
        return this.weightInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
