import React, { Suspense } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { CircularProgress } from '@mui/material';
import { InventoryItem } from '../types/inventoryTypes';

const LazyInventoryItem = React.lazy(() => import('./InventoryItem'));

interface InventoryListProps {
  items: InventoryItem[];
  onUpdateItem: (item: InventoryItem) => void;
  onDeleteItem: (itemId: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onUpdateItem, onDeleteItem }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <Suspense fallback={<CircularProgress />}>
        <LazyInventoryItem
          item={items[index]}
          onUpdate={onUpdateItem}
          onDelete={onDeleteItem}
        />
      </Suspense>
    </div>
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={items.length}
          itemSize={50}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default InventoryList;