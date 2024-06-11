export interface ValidationModel {
  state: 'pending' | 'failed' | 'success' | '';
  message: string;
  valid: boolean | null;
}
