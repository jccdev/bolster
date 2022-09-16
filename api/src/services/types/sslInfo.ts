export interface SslInfo {
  protocol: string;
  subjectAlternativeNames: string[];
  validFrom: number;
  issuer: string;
  validTo: number;
  subjectName: string;
}
