export default interface validationModel {
  state: 'pending' | 'failed' | 'success' | '';
  message: string;
  valid: boolean;
}
