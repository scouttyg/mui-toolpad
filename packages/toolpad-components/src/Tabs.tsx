import * as React from 'react';
import { Tabs as MUITabs, Tab } from '@mui/material';
import { createComponent } from '@mui/toolpad-core';

interface TabProps {
  title: string;
  name: string;
}

interface Props {
  value: string;
  onChange: (value: number) => void;
  tabs: TabProps[];
  defaultValue: string;
}

function Tabs({ value, onChange, tabs, defaultValue }: Props) {
  return (
    <MUITabs
      value={value || defaultValue}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    >
      {tabs.map(({ title, name }) => (
        <Tab label={title} value={name} key={name} />
      ))}
    </MUITabs>
  );
}

export default createComponent(Tabs, {
  layoutDirection: 'horizontal',
  argTypes: {
    value: {
      typeDef: { type: 'string' },
      onChangeProp: 'onChange',
      defaultValueProp: 'defaultValue',
      helperText: 'Currently active tab.',
    },
    defaultValue: {
      label: 'Default active tab',
      typeDef: { type: 'string', default: 'tab-one' },
      helperText: 'The tab which will be active by default.',
    },
    tabs: {
      typeDef: {
        type: 'array',
        default: [
          {
            title: 'Tab one',
            name: 'tab-one',
          },
          { title: 'Tab two', name: 'tab-two' },
          { title: 'Tab three', name: 'tab-three' },
        ],
      },
      helperText: 'Tabs configuration object.',
    },
  },
});
