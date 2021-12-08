import React, { FormEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { searchAsync } from '../../modules/detail';
import { useRouter } from 'next/router';
// import { Input } from 'antd';
import { Input, SearchButton, SearchWrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';

// const { Search } = Input;

const SearchForm = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: { search: search, pageNo: 1 },
      },
      `/search?search=${search}`
    );
  };
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
      {/* <SearchInput value={search} onChange={onChange} onSearch={onSearch} /> */}
    </>
  );
};

export default SearchForm;
