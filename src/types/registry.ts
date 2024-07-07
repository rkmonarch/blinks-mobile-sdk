export interface Registry {
  websites: Action[];
  interstitials: Action[];
  actions: Action[];
}

export interface Action {
  host: string;
  state: RegistryState;
}

export enum RegistryState {
  Malicious = 'malicious',
  Trusted = 'trusted',
}
