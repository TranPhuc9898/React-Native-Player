import {getData, saveData} from '../LocalStorage';

describe('LocalStorage', () => {
  it('should save and get correct data', async () => {
    const data = 'Nguyen Quoc Trung';
    const key = '@myname';
    await saveData(key, data);
    const retrievedData = await getData(key);
    expect(retrievedData).toBe(data);
  });
});
