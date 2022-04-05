export const setCookie = (cName: string, cValue: any) => {
  localStorage.setItem(cName, JSON.stringify(cValue));
};

export const getCookie = (cName: string) => {
  const item = localStorage.getItem(cName);
  return item && JSON.parse(item);
};
