import { API } from '../api';
import ENDPOINTS from '../endpoints';

const API_KEY = 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU';

/**
 * @description searchPapers is a function that returns a list of papers that match the keyword
 * @returns IResponse<IProjectData[]>
 * @throws Error
 */
export function searchPapers(keyword: string) {
  return API.get<any>(
    `${ENDPOINTS.PAPERS.SEARCH}?query=${keyword}&fields=url,abstract,authors,citations,references`,
    {
      'x-api-key': API_KEY,
    },
    false,
  );
}
