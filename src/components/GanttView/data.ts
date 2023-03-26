export interface IGanttList {
  id: string;
  name: string;
  planStartDate: string;
  planEndDate: string;
  left?: string;
  right?: string;
  children?: IGanttList[];
  statue?: string;
}
