import * as React from 'react';
import { Grid, styled } from '@mui/material';
import invariant from 'invariant';

export interface OverlayGridHandle {
  gridElement: HTMLDivElement | null;
  getMinColumnWidth: () => number;
  getLeftColumnEdges: () => number[];
  getRightColumnEdges: () => number[];
}

export const GRID_NUMBER_OF_COLUMNS = 12;
export const GRID_COLUMN_GAP = 1;

const StyledGrid = styled(Grid)({
  height: '100vh',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 1,
  border: '2px solid transparent',
});

const StyledGridColumn = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
  height: '100%',
  opacity: 0.2,
}));

export const OverlayGrid = React.forwardRef<OverlayGridHandle>(function OverlayGrid(
  props,
  forwardedRef,
) {
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useImperativeHandle(
    forwardedRef,
    () => {
      const gridElement = gridRef.current;
      invariant(gridElement, 'Overlay grid ref not bound');

      let columnEdges: number[] = [];
      const gridColumnContainers = Array.from(gridElement.children);
      const gridColumnEdges = gridColumnContainers.map((container: Element) => {
        const containerRect = container.firstElementChild?.getBoundingClientRect();
        return containerRect
          ? [Math.round(containerRect.x), Math.round(containerRect.x + containerRect.width)]
          : [];
      });
      columnEdges = gridColumnEdges.flat();

      return {
        gridElement: gridRef.current,
        getMinColumnWidth() {
          return columnEdges[1] - columnEdges[0];
        },
        getLeftColumnEdges() {
          return columnEdges.filter((column, index) => index % 2 === 0);
        },
        getRightColumnEdges() {
          return columnEdges.filter((column, index) => index % 2 === 1);
        },
      };
    },
    [],
  );

  return (
    <StyledGrid ref={gridRef} container columnSpacing={GRID_COLUMN_GAP} px={2}>
      {[...Array(GRID_NUMBER_OF_COLUMNS)].map((column, index) => (
        <Grid key={index} item xs={1}>
          <StyledGridColumn />
        </Grid>
      ))}
    </StyledGrid>
  );
});
