import { appendChild, createElement, getElementById } from "../common/document";
import { PLACEHOLDER_CONFIGURATION } from "../common/settings";
import * as self from "./componentCreator";

export function createJiraStatusInput(id, defaultSettingKey) {
    const jiraStatusInput = createElement("input");
    jiraStatusInput.type = "text";
    jiraStatusInput.id = `JiraStatus-${id}`;
    jiraStatusInput.style = "text-transform:uppercase";
    jiraStatusInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).innerText = event.target.value;
    });    
    jiraStatusInput.value = defaultSettingKey ? defaultSettingKey : PLACEHOLDER_CONFIGURATION.jiraStatusLabel;

    return jiraStatusInput;
}

export function createBackgroundColourPickerInput(id, defaultSettingValue) {
    const backgroundColourInput = createElement("input");
    backgroundColourInput.type = "color";
    backgroundColourInput.id = `BackgroundColour-${id}`;
    backgroundColourInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).style.backgroundColor = event.target.value;
    });
    backgroundColourInput.value = defaultSettingValue ? defaultSettingValue.backgroundColour : PLACEHOLDER_CONFIGURATION.backgroundColour;
    
    return backgroundColourInput;
}

export function createTextColourPickerInput(id, defaultSettingValue) {
    const textColourInput = createElement("input");
    textColourInput.type = "color";
    textColourInput.id = `TextColour-${id}`;
    textColourInput.addEventListener("change", (event) => {
        getElementById(`SampleOutput-${id}`).style.color = event.target.value;
    });
    textColourInput.value = defaultSettingValue ?defaultSettingValue.textColour :  PLACEHOLDER_CONFIGURATION.textColour;
    
    return textColourInput;
}

export function createDeleteButton(id) {
    const deleteButton = createElement("span");
    deleteButton.id = `DeleteButton-${id}`;
    deleteButton.innerText = "";
    deleteButton.ariaLabel = "Delete";
    deleteButton.className = "icon-btn-secondary icon-delete";
    deleteButton.addEventListener("click", (event) => {
        const row = event.target.parentElement.parentElement;
        row.parentElement.removeChild(row);
    });
    return deleteButton;
}

export function createPreviewLabel(id, defaultSettingValue, defaultSettingKey) {
    const sampleOutput = createElement("span");
    sampleOutput.id = `SampleOutput-${id}`;
    sampleOutput.className = "preview-label";

    const doesConfigurationExist = defaultSettingKey && defaultSettingValue;
    sampleOutput.innerText = doesConfigurationExist ? defaultSettingKey : PLACEHOLDER_CONFIGURATION.jiraStatusLabel;
    sampleOutput.style.backgroundColor = doesConfigurationExist ? defaultSettingValue.backgroundColour : PLACEHOLDER_CONFIGURATION.backgroundColour;
    sampleOutput.style.color = doesConfigurationExist ? defaultSettingValue.textColour : PLACEHOLDER_CONFIGURATION.textColour;

    return sampleOutput;
}

export function createTableRow() {
    return createElement("tr");
}

export function createTableCell() {
    return createElement("td");
}

export function createRow(id, parentElement, defaultSettingValue, defaultSettingKey) {
    const jiraStatusInput = self.createJiraStatusInput(id, defaultSettingKey);
    const backgroundColourPickerInput = self.createBackgroundColourPickerInput(id, defaultSettingValue);
    const textColourPickerInput = self.createTextColourPickerInput(id, defaultSettingValue);
    const deleteButton = self.createDeleteButton(id);
    const previewLabel = self.createPreviewLabel(id, defaultSettingValue, defaultSettingKey);   
    
    const tableRow = self.createTableRow();
    appendChild(parentElement, tableRow);

    const tableColumnOne = self.createTableCell();
    appendChild(tableColumnOne, deleteButton);
    appendChild(tableRow, tableColumnOne);

    const tableColumnTwo = self.createTableCell();
    appendChild(tableColumnTwo, jiraStatusInput);
    appendChild(tableRow, tableColumnTwo);

    const tableColumnThree = self.createTableCell();
    appendChild(tableColumnThree, backgroundColourPickerInput);
    appendChild(tableRow, tableColumnThree);

    const tableColumnFour = self.createTableCell();
    appendChild(tableColumnFour, textColourPickerInput);
    appendChild(tableRow, tableColumnFour);

    const tableColumnFive = self.createTableCell();
    appendChild(tableColumnFive, previewLabel);
    appendChild(tableRow, tableColumnFive);    
}
