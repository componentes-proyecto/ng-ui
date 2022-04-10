import { HttpHeaders } from "@angular/common/http";

export interface ApiOptionsModel {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  } | undefined,
}