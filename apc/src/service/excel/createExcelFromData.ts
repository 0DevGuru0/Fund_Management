import XLSX from 'xlsx';

type Item = Record<string, string>;
type RowCol<T extends Item> = T[];

const workSheetName = 'Iknito';

export const createExcelFromData = <T extends Item>(data: RowCol<T>): XLSX.WorkBook => {
  const workBook = XLSX.utils.book_new();
  workBook.Props = {
    Title: 'Iknito',
    Subject: 'Iknito',
    Author: 'Admin',
    CreatedDate: new Date(),
  };
  workBook.SheetNames.push(workSheetName);

  const arrayOfArrays: string[][] = [];
  if (data.length > 0) {
    const header = Object.keys(data[0]);
    arrayOfArrays.push(header);
  }
  for (const item of data) {
    const row: string[] = [];
    for (const fieldKey of Object.keys(item)) {
      row.push(item[fieldKey]);
    }
    arrayOfArrays.push(row);
  }

  const workSheet = XLSX.utils.aoa_to_sheet(arrayOfArrays);
  workBook.Sheets[workSheetName] = workSheet;
  return workBook;
};
