import { SortButton, SortWrapper } from '../../../styles/common';

interface ISortBox {
  arrange: 'Q' | 'P';
  sortHot: () => void;
  sortRecent: () => void;
}

const SortBox: React.FC<ISortBox> = ({ arrange, sortHot, sortRecent }) => {
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
