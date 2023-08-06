import React from 'react';
import { SectionTab } from 'polotno/side-panel';
import { Shapes } from 'polotno/side-panel/elements-panel';
import { FaShapes } from 'react-icons/fa';

export const ShapesPanel = ({ store }:any) => {
  return <Shapes store={store} />;
};

// // define the new custom section
export const ShapesSection = {
  name: 'shapes',
  Tab: (props:any) => (
    <SectionTab name="Shapes" {...props}>
      <FaShapes />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: ShapesPanel,
};
