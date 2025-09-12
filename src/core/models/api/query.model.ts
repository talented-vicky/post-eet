export interface BaseQuery {
    page: number;
    pageSize: number;
}

export function incrementPage(query: BaseQuery): BaseQuery {
    return {
        ...query,
        page: query.page + 1
    }
}