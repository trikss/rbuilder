import { Params } from "./RQbuilder";
import qs from "qs";
interface query {
  filter: Record<string, string | number>;
  include: string;
  limit: number;
  page: number;
  perPage: number;
  sort: string;
  offset: number;
  appends: Record<string, string | number>;
}

export class Query {
  // id: null | number;
  includes: string[];
  sorts: string[];
  filters: Record<string, string | number>;
  appends: Record<string, string | number>;
  page: number | null;
  perPage: number | null;
  limit: number | null;
  offset: number | null;
  uri = "";
  query = {} as query;
  constructor(params: Params) {
    // this.id = params.id;
    this.perPage = params.perPage;
    this.offset = params.offset;
    this.includes = params.includes;
    this.sorts = params.sorts;
    this.filters = params.filters;
    this.page = params.page;
    this.limit = params.limit;
    this.appends = params.appends;
  }
  include() {
    if (!(this.includes.length > 0)) {
      return;
    }
    this.query.include = this.includes.toString();
  }
  sort() {
    if (!(this.sorts.length > 0)) {
      return;
    }
    this.query.sort = this.sorts.toString();
  }
  filter() {
    if (!(Object.keys(this.filters).length > 0)) {
      return;
    }
    this.query.filter = this.filters;
  }
  setPage() {
    if (this.page == null) return;
    this.query.page = this.page;
    // this.query.page = this.page;
  }
  setPerPage() {
    if (this.perPage == null) return;
    this.query.perPage = this.perPage;
  }
  setLimit() {
    if (this.limit == null) return;
    this.query.limit = this.limit;
  }
  setOffset() {
    if (this.offset == null) return;
    this.query.offset = this.offset;
  }
  parse() {
    this.include();
    this.sort();
    this.filter();
    this.setPage();
    this.setPerPage();
    this.setLimit();
    this.setOffset();

    this.uri = qs.stringify(
      { ...this.appends, ...this.query },
      { encode: false }
    );
    return this.uri;
  }
}
