class Button {
  constructor(caption,Id,template) {
    const text = document.createTextNode(caption || "Button");
    this.text = caption || "Button";
    this.Element = document.createElement("button");
    this.Element.appendChild(text);
    this.Element.id = (Id) ? Id : "button";
    this.template = template
    document.body.appendChild(this.Element);
  }

}
