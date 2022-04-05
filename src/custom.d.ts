declare module "*.module.scss";
declare module "*.scss";
declare module "*.module.css";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare interface String {
  trimSpace: () => string;
}
