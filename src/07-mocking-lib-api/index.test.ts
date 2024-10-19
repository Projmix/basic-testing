import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn), 
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('should create an axios instance with the correct base URL', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as any);

    await throttledGetDataFromApi('/posts');

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform a request to the correct provided URL', async () => {
    const axiosGetSpy = jest.fn().mockResolvedValue({ data: { id: 1, title: 'post' } });

    mockedAxios.create.mockReturnValue({
      get: axiosGetSpy,
    } as any);

    await throttledGetDataFromApi('/posts/1');

    expect(axiosGetSpy).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponse = { id: 1, title: 'post' };
    
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponse }),
    } as any);

    const data = await throttledGetDataFromApi('/posts/1');

    expect(data).toEqual(mockResponse);
  });
});
