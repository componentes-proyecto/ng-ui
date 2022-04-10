import { Common } from "./common.model";

export interface ApiResponse extends Common {
  statusCode: number;
  message: string;
  data: Common[];
}