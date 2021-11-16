import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  //   const dispatch = useDispatch();
  //   useEffect(() => {});

  return <p>detail {id}</p>;
};

export default Detail;
