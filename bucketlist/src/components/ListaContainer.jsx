import React from 'react';
import ListaItem from './ListaItem';

function ListaContainer({ listas, onDelete, onEdit }) {
  return (
    <div>
      {listas.map((lista) => (
        <ListaItem
          key={lista._id}
          lista={lista}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ListaContainer;
