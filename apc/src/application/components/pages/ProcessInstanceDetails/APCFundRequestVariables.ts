import { KeyCloakToken } from '$service/auth/Token';

export default interface APCFundRequestVariables {
  description: string;
  articleTitle: string;
  articlePdfFile: [
    {
      type: string;
      name: string;
      url: string;
      size: number;
    },
  ];
  affiliation: {
    id: string;
    title: string;
  };
  journal?: {
    id: string;
    title: string;
  };
  publisher: {
    id: string;
    title: string;
  };
  orcid: string;
  publishPrice: number;
  currency: string;
  startedBy: Omit<KeyCloakToken, 'exp' | 'iat'>;
  subjectCategory: {
    id: string;
    title: string;
  };
  mainSubject: {
    id: string;
    title: string;
  };
  fundApplicationId?: string;
}
