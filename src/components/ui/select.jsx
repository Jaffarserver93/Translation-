import * as SelectPrimitive from '@radix-ui/react-select';

export function Select({ children, onValueChange, value, defaultValue }) {
  return (
    <SelectPrimitive.Root onValueChange={onValueChange} value={value} defaultValue={defaultValue}>
      {children}
    </SelectPrimitive.Root>
  );
}

export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = SelectPrimitive.Item;
