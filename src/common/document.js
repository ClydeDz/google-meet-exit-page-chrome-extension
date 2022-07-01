let doc; 

export function initializeDocument(injectedDocument) {
  doc = injectedDocument;
}

export function getJiraStatusLabels() {
    return doc.querySelectorAll(".ghx-heading .ghx-info > span");
}

export function updateJiraStatusStyle(element, configuration) {
    element.style.backgroundColor = configuration.backgroundColour;
    element.style.color = configuration.textColour;
    element.style.border = "1px solid #6B6B6B";
    return element;
}

export function getElementById(id) {
  return doc.getElementById(id);
}

export function createElement(htmlTagName) {
  return doc.createElement(htmlTagName);
}

export function appendChild(parentElement, childElement) {
  parentElement.appendChild(childElement);
}