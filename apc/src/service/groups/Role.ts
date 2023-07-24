export enum Role {
  SystemAdmin = 'SystemAdmin',
  FundManager = 'FundManager',
  FundFinancialManager = 'FundFinancialManager',
  Researcher = 'Researcher',
  PublisherAdmin = 'PublisherAdmin',
}

export const roles = Object.keys(Role) as (keyof typeof Role)[];
