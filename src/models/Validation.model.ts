export interface ValidationModel {
  state: 'pending' | 'failed' | 'success' | 'ready to save' | '';
  message: string;
  proceed: boolean | null;
}
