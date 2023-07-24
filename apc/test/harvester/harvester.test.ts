import { mockData } from '$service/doaj/mockData';
import dataParser from '$service/doaj/parser';

describe('DOAJ Harvester Tests', () => {
  it('should receive a json file to harvest', async () => {
    expect(mockData).toBeArrayOfSize(4);
    expect(mockData[0].bibjson.title).toBeString();
    expect(mockData[0].bibjson.publisher).toBeObject();
  });

  it('should process improper data', async () => {
    const improperData = mockData[0];
    improperData.bibjson.title = 'A';
    improperData.bibjson.publisher = { country: 'IT', name: 'B' };
    const parsedData = await dataParser([improperData]);

    parsedData.publishersList.forEach(({ title, country, ...item }) => {
      expect(item).toBeDefined();
      expect(title).toEqual('B Publication');
      expect(country).toEqual('Italy');
    });
    parsedData.journalsList.forEach(({ title, ...item }) => {
      expect(item).toBeDefined();
      expect(title).toEqual('A Journal');
    });
  });
});
