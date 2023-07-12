import React from 'react';
import styled from 'styled-components';

const DivFilterSearchBox = styled.div`
  input {
    color: ${props => props.theme.colors.primaryColor};
  }
`;

interface PropsFilterSearchBox {
  data: UsersDB;
  filterMethod: (data:UsersDB, filterText:string) => UsersDB;
  onClickMethod: (customer:UserDB) => void
  renderItem: (props: {
    customer: UserDB;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }) => React.ReactNode;
}

const FilterSearchBox = ({data, filterMethod, onClickMethod, renderItem}:PropsFilterSearchBox) => {
  const [filterText, setFilterText] = React.useState('');

  const filteredData = filterMethod(data, filterText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  return (
    <DivFilterSearchBox>
      <input
        type="text"
        value={filterText}
        onChange={handleChange}
        placeholder="Digite sua busca"
      />
      {filterText ?
        <div className='row'>
          {Object.keys(filteredData).map(customerUid =>
            <React.Fragment key={customerUid}>
              {renderItem({
                customer: data[customerUid],
                onClick: () => onClickMethod(data[customerUid])
              })}
            </React.Fragment>
          )}
        </div> :
        <div className='row'>
          {Object.keys(data).map(customerUid =>
            <React.Fragment key={customerUid}>
              {renderItem({
                customer: data[customerUid],
                onClick: () => onClickMethod(data[customerUid])
              })}
            </React.Fragment>
          )}
        </div>
      }
    </DivFilterSearchBox>
  );
};

export default FilterSearchBox;
