
export namespace PInCategory{
    export interface Category {
        readonly _id: string;
        readonly category: string;
    }
    export interface Data {
        readonly categories: Array<Category>;
    }
}


