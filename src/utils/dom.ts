export const setCssProperty = (
  element: HTMLElement,
  property: string,
  value: string,
) => {
  element.style.setProperty(`--${property}`, `${value}`);
};
