import { ComponentProps, createContext, useContext, useState } from "react";

const TabsContext = createContext<
  { value: string; setValue: React.Dispatch<React.SetStateAction<string>> } | undefined
>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext는 TabsContext.Provider 내부에서 사용해야 합니다.");
  }

  return context;
};

type TabsProps = {
  defaultValue: string;
} & ComponentProps<"div">;
function Tabs({ children, defaultValue }: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

type TriggerProps = {
  value: string;
} & ComponentProps<"div">;
function Trigger({ value, children, ...props }: TriggerProps) {
  const context = useTabsContext();
  const isSelected = value === context.value;

  return (
    <div
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        context.setValue(value);
      }}
      data-state={isSelected ? "active" : "inactive"}
    >
      {children}
    </div>
  );
}

type ContentProps = {
  value: string;
} & ComponentProps<"div">;
function Content({ value, children, ...props }: ContentProps) {
  const context = useTabsContext();
  const isSelected = value === context.value;

  if (!isSelected) {
    return undefined;
  }

  return <div {...props}>{children}</div>;
}

Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;
