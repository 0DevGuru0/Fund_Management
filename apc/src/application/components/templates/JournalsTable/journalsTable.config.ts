import { ItemState } from '$application/components/organisms/tables/Table/CornerColumn/ItemState';
import { JournalTitle } from '$application/components/organisms/tables/Table/CornerColumn/JournalTitle';
import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { taskToColor } from '$application/lib/taskToColor';

export interface JournalItemType {
  title: {
    id: string;
    title: string;
    index?: number;
    journalType: string;
    isChecked?: boolean;
    selectable?: boolean;
    onToggle?: (newState: boolean, journalId: string) => void;
  };
  issn: {
    text: string;
    textType: TextType;
  };
  eissn: {
    text: string;
    textType: TextType;
  };
  publisher: {
    text: string;
    textType: TextType;
  };
  price: {
    text: string;
    textType: TextType;
  };
  license: {
    text: string;
    textType: TextType;
  };
  subjects: {
    text: string;
    textType: TextType;
  };
  languages: {
    text: string;
    textType: TextType;
  };
  jcrQuartile: {
    text: string;
    textType: TextType;
  };
  sjrQuartile: {
    text: string;
    textType: TextType;
  };
  state: {
    label: keyof typeof taskToColor;
  };
}

export const journalsTableDefinitions = [
  { width: '406px', column: 'title', label: 'Title', renderer: JournalTitle },
  { width: '120px', column: 'issn', label: 'ISSN', renderer: CommonText },
  { width: '120px', column: 'eissn', label: 'E-ISSN', renderer: CommonText },
  { width: '300px', column: 'publisher', label: 'Publisher', renderer: CommonText },
  // { width: '120px', column: 'price', label: 'Price', renderer: CommonText },
  { width: '126px', column: 'license', label: 'License', renderer: CommonText },
  { width: '200px', column: 'languages', label: 'Languages', renderer: CommonText },
  { width: '150px', column: 'jcrQuartile', label: 'JCR Quartile', renderer: CommonText },
  { width: '150px', column: 'sjrQuartile', label: 'SJR Quartile', renderer: CommonText },
  { width: '300px', column: 'subjects', label: 'Subjects', renderer: CommonText },
  { width: '201px', column: 'state', label: 'State', renderer: ItemState },
];
