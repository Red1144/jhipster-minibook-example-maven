import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Preference e2e test', () => {

    let navBarPage: NavBarPage;
    let preferenceDialogPage: PreferenceDialogPage;
    let preferenceComponentsPage: PreferenceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Preferences', () => {
        navBarPage.goToEntity('preference');
        preferenceComponentsPage = new PreferenceComponentsPage();
        expect(preferenceComponentsPage.getTitle())
            .toMatch(/twentyOnePointsApp.preference.home.title/);

    });

    it('should load create Preference dialog', () => {
        preferenceComponentsPage.clickOnCreateButton();
        preferenceDialogPage = new PreferenceDialogPage();
        expect(preferenceDialogPage.getModalTitle())
            .toMatch(/twentyOnePointsApp.preference.home.createOrEditLabel/);
        preferenceDialogPage.close();
    });

    it('should create and save Preferences', () => {
        preferenceComponentsPage.clickOnCreateButton();
        preferenceDialogPage.setWeeklyGoalInput('5');
        expect(preferenceDialogPage.getWeeklyGoalInput()).toMatch('5');
        preferenceDialogPage.weightUnitsSelectLastOption();
        preferenceDialogPage.userSelectLastOption();
        preferenceDialogPage.save();
        expect(preferenceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PreferenceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-preference div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PreferenceDialogPage {
    modalTitle = element(by.css('h4#myPreferenceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    weeklyGoalInput = element(by.css('input#field_weeklyGoal'));
    weightUnitsSelect = element(by.css('select#field_weightUnits'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWeeklyGoalInput = function(weeklyGoal) {
        this.weeklyGoalInput.sendKeys(weeklyGoal);
    };

    getWeeklyGoalInput = function() {
        return this.weeklyGoalInput.getAttribute('value');
    };

    setWeightUnitsSelect = function(weightUnits) {
        this.weightUnitsSelect.sendKeys(weightUnits);
    };

    getWeightUnitsSelect = function() {
        return this.weightUnitsSelect.element(by.css('option:checked')).getText();
    };

    weightUnitsSelectLastOption = function() {
        this.weightUnitsSelect.all(by.tagName('option')).last().click();
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
