import React, { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Input, SearchButton, SearchWrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
interface ISearchForm {
  label: string;
  search: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: React.FC<ISearchForm> = ({
  label,
  search,
  onChangeSearch,
}) => {
  const router = useRouter();
  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      router.push(
        {
          pathname: '/search',
          query: { search: search, pageNo: 1 },
        },
        `/search?search=${search}`
      );
    },
    [router, search]
  );

  return (
    <>
      <form onSubmit={onSearch}>
        <SearchWrapper>
          <label htmlFor={`${label}-search`}></label>
          <Input
            type="text"
            id={`${label}-search`}
            value={search}
            onChange={onChangeSearch}
            autoComplete="off"
            required
          />
          <SearchButton type="submit">
            <SearchOutlined />
          </SearchButton>
        </SearchWrapper>
      </form>
    </>
  );
};

export default SearchForm;
