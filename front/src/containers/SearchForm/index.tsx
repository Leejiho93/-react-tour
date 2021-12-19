import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, SearchButton, SearchWrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';

const SearchForm = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
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
          <Input value={search} onChange={onChange} />
          <SearchButton type="submit">
            <SearchOutlined style={{ color: 'white' }} />
          </SearchButton>
        </SearchWrapper>
      </form>
    </>
  );
};

export default SearchForm;
