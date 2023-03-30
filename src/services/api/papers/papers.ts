import { API } from '../api';
import ENDPOINTS from '../endpoints';

/**
 * @description searchPapers is a function that returns a list of papers that match the keyword
 * @returns IResponse<IProjectData[]>
 * @throws Error
 */
export function searchPapers(keyword: string) {
  return API.get<any>(
    `${ENDPOINTS.PAPERS.SEARCH}?query=${keyword}&fields=url,abstract,authors,citations,references`,
    {},
    false,
  );
}
