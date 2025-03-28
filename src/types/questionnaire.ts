
// Types for questionnaire data
export interface QuestionnaireData {
  country?: string;
  taxAmount?: string;
  employmentType?: string;
  taxFamiliarity?: string;
  taxGoal?: string;
}

// Define the sequence of screens in the questionnaire flow
export enum QuestionnaireScreen {
  Introduction = 0,
  Country = 1,
  TaxAmount = 2,
  EmploymentType = 3,
  TaxFamiliarity = 4,
  TaxGoal = 5,
  Confirmation = 6,
}
