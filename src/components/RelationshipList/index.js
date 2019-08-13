import React from 'react';
// Material UI
import { styled } from '@material-ui/styles';
import MyList from '../MyList';
import MyListItem from '../MyListItem';
import MyCheckbox from '../MyCheckbox';
import MyListItemText from '../MyListItemText';

function RelationshipList({
  items, name, selected, onChange,
}) {
  // Style

  const StyledLabel = styled('label')({
    display: 'flex',
    alignItems: 'center',
  });

  return (
    <>
      <MyList>
        {items.map(item => (
          <MyListItem key={item.id}>
            <StyledLabel htmlFor={`${name}${item.id}`}>
              <MyCheckbox
                name={name}
                id={`${name}${item.id}`}
                checked={selected && selected.indexOf(item.id) >= 0}
                onChange={onChange}
                value={item.id}
              />
              <MyListItemText>{`${item.title}`}</MyListItemText>
            </StyledLabel>
          </MyListItem>
        ))}
      </MyList>
    </>
  );
}

export default RelationshipList;
