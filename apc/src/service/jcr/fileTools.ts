import XLSX from 'xlsx';

const basePath = './src/service/jcr';
const SCIE = `${basePath}/JCR_SCIE_2019.xlsx`;
const SSCI = `${basePath}/JCR_SSCI_2019.xlsx`;

interface Result {
  SSCI: XLSX.WorkBook;
  SCIE: XLSX.WorkBook;
}

export const fetchFileData = (): Result => {
  return {
    SCIE: XLSX.readFile(SCIE),
    SSCI: XLSX.readFile(SSCI),
  };
};
