import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAsync } from '../../modules/detail';
import { useRouter } from 'next/router';

const SearchForm = () => {
  const [search, setSearch] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: { search: search, pageNo: 1 },
      },
      `/search`
    );
    dispatch(searchAsync.request({ search, pageNo }));
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={search} onChange={onChangeSearch} />
        <button>검색</button>
      </form>
    </>
  );
};

export default SearchForm;
