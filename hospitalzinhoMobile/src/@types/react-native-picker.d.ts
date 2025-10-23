declare module '@react-native-picker/picker' {
  import * as React from 'react';
    import { ViewProps } from 'react-native';

  export interface PickerProps extends ViewProps {
    selectedValue?: any;
    onValueChange?: (itemValue: any, itemIndex: number) => void;
    mode?: 'dialog' | 'dropdown';
    enabled?: boolean;
    prompt?: string;
    testID?: string;
  }

  export interface PickerItemProps {
    label?: string;
    value?: any;
    color?: string;
    testID?: string;
  }

  export const Picker: React.ComponentType<PickerProps> & {
    Item: React.ComponentType<PickerItemProps>;
  };

  export default Picker;
}
