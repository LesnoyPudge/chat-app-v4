import * as c1 from './components';
import * as c2 from './hooks';



export namespace Search {
    export import Bar = c1.SearchBar;

    export const { useSearch } = c2;
}