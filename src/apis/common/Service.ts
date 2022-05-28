import { Address } from "./Address";
import { FileUploaded } from "./FileUploaded";
import { Category } from "./Category";

export interface Service {
  readonly _id: string;
  readonly name: string;
  readonly avatar?: any;
  readonly enterprise: any;
  readonly address: Address;
  readonly email: string;
  readonly phone: string;
  readonly openTime: string;
  readonly closeTime: string;
  readonly maxPrice: number;
  readonly minPrice: number;
  readonly category: Category;
  readonly images?: FileUploaded[];
  readonly introduction?: string;
  readonly shortIntroduction?: string;
  readonly imgCmtCount?: number;
  readonly textCmtCount: number;
  readonly blogScore: number;
  readonly cmtScore: number;
  readonly enableSchedule: boolean;
  readonly rankingScore: number;
  readonly ratingScore: number;
  readonly sortScore: number;
}
