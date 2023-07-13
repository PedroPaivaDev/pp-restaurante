import React from 'react';
import styled from 'styled-components';

const DivFilterSearchBox = styled.div`
  width: 100%;
  .input {
    color: ${props => props.theme.colors.primaryColor};
    border: 1px solid ${props => props.theme.colors.secondaryColor};
    line-height: 26px;
    padding: 2px 5px;
    border-radius: 5px;
    background: ${props => props.theme.colors.quintenaryColor};
    transition: 0.2s;
    width: 180px;
  }
  .input:focus, .input:hover {
    outline: none;
    border-color: ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.tertiaryColor};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.secondaryColor}
  }
  .input:-internal-autofill-selected {
    background-color: var(--lightPink) !important;
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
        placeholder="Digite um nome"
        className='input'
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
