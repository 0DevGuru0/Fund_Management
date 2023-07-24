import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';

import { ReportArticle } from './ReportArticle';

export interface ReportItemType {
  article: {
    id: string;
    article: string;
    index?: number;
  };
  task: {
    text: string;
    textType: TextType;
  };
  candidate: {
    text: string;
    textType: TextType;
  };
  description: {
    text: string;
    textType: TextType;
  };
  affiliation: {
    text: string;
    textType: TextType;
  };
  assignee: {
    text: string;
    textType: TextType;
    // TO DO add user thumbnail
  };
}

export const reportTableDefinitions = [
  { width: '362px', column: 'article', label: 'Article', renderer: ReportArticle },
  { width: '273px', column: 'task', label: 'Task', renderer: CommonText },
  { width: '180px', column: 'candidate', label: 'Candidate', renderer: CommonText },
  { width: '375px', column: 'assignee', label: 'Assignee', renderer: CommonText },
  { width: '375px', column: 'description', label: 'Description', renderer: CommonText },
  { width: '375px', column: 'affiliation', label: 'Affiliation', renderer: CommonText },
];
