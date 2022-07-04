let doc; 

export function initializeDocument(injectedDocument) {
  doc = injectedDocument;
}

export function getElementById(id) {
  return doc.getElementById(id);
}

export function querySelectorAll(selector) {
  return doc.querySelectorAll(selector);
}