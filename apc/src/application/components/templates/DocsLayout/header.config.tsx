import { HeaderProps } from '$application/components/templates/ResearcherLayout/Header';
import { Role } from '$service/groups/Role';

type HeaderConfig = {
  roles: Role[];
} & Pick<HeaderProps, 'links' | 'services'>;

interface DocsLayout {
  header: HeaderConfig;
}

export const docsLayoutConfig: DocsLayout = {
  header: {
    roles: [
      Role.Researcher,
      Role.SystemAdmin,
      Role.FundManager,
      Role.FundFinancialManager,
    ],
    links: [],
    services: [],
  },
};
