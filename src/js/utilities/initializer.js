export default function intializer(selector, Component) {
  const targets = document.querySelectorAll(selector);

  targets.forEach(target => {
    const component = new Component(target);

    component.bindUI();
  });
}
