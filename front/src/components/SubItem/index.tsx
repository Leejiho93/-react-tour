import { Li } from './style';

interface ISubItem {
  name: string;
  html: string;
}
const SubItem: React.FC<ISubItem> = ({ name, html }) => {
  return (
    <>
      <Li>
        <b>{name}</b>
        <p
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Li>
    </>
  );
};

export default SubItem;
