// eslint-disable-next-line import/prefer-default-export
export const createElement = (html) => {
  const parentElement = document.createElement('div');
  parentElement.innerHTML = html;

  return parentElement.firstElementChild;
};
