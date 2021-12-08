import { SortButton, SortWrapper } from '../../../styles/common';

const SortBox = ({ arrange, sortHot, sortRecent }: any) => {
  return (
    <SortWrapper>
      <SortButton
        onClick={sortRecent}
        className={arrange === 'Q' ? 'active' : ''}
      >
        최신순
      </SortButton>
      <SortButton onClick={sortHot} className={arrange === 'P' ? 'active' : ''}>
        인기순
      </SortButton>
    </SortWrapper>
  );
};

export default SortBox;
