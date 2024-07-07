export interface Blink {
  icon: string;
  label: string;
  title: string;
  description: string;
  links?: Links;
}

export interface Links {
  actions: Action[];
}

export interface Action {
  label: string;
  href: string;
  parameters?: Parameter[];
}

export interface Parameter {
  name: string;
  label: string;
}

export interface ErrorType {
  message: string;
}

export interface TransactionData {
  transaction: string;
  message: string;
}
