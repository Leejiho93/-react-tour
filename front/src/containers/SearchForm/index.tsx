import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Input, SearchButton, SearchWrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
import useInput from '../../../utils/useInput';

const SearchForm: React.FC = () => {
  const [search, onChangeSearch] = useInput('');
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
          <Input value={search} onChange={onChangeSearch} />
          <SearchButton type="submit">
            <SearchOutlined style={{ color: 'white' }} />
          </SearchButton>
        </SearchWrapper>
      </form>
    </>
  );
};

export default SearchForm;
