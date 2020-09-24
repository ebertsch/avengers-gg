import {Data, Params} from '@angular/router';

export interface MergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}