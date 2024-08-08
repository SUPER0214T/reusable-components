import React, { createContext, useContext, useState } from "react";

type SelectProps = {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  defaultValue: any;
};

const SelectOpenContext = createContext<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>({
  isOpen: false,
  setIsOpen: () => {},
});

const SelectedOptionContext = createContext<{ selectedOption: any; setSelectedOption: React.Dispatch<any> }>({
  selectedOption: "",
  setSelectedOption: () => {},
});

function Select({ children, onValueChange, defaultValue }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<any>(defaultValue);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  onValueChange(selectedOption);

  return (
    <SelectedOptionContext.Provider value={{ selectedOption: selectedOption, setSelectedOption: setSelectedOption }}>
      <SelectOpenContext.Provider value={{ isOpen: isSelectOpen, setIsOpen: setIsSelectOpen }}>
        <div className="select">{children}</div>
      </SelectOpenContext.Provider>
    </SelectedOptionContext.Provider>
  );
}

type TriggerProps = {
  children?: React.ReactNode;
};

function Trigger({ children }: TriggerProps) {
  const { setIsOpen } = useContext(SelectOpenContext);
  const { selectedOption } = useContext(SelectedOptionContext);

  return (
    <div
      className="select__trigger"
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      onBlur={() => {
        setTimeout(() => {
          setIsOpen(false);
        }, 0);
      }}
      tabIndex={0}
    >
      <span className="select__text">{selectedOption}</span>
      {children}
    </div>
  );
}

type OptionsProps = {
  children: React.ReactNode;
};

function Options({ children }: OptionsProps) {
  const { isOpen } = useContext(SelectOpenContext);

  return <>{isOpen && <div className="select__options">{children}</div>}</>;
}

type OptionProps = {
  children: React.ReactNode;
  value: any;
};

function Option({ children, value }: OptionProps) {
  const { setIsOpen } = useContext(SelectOpenContext);
  const { setSelectedOption } = useContext(SelectedOptionContext);

  return (
    <div
      className="select__option"
      onClick={() => {
        setSelectedOption(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}

Select.Trigger = Trigger;
Select.Options = Options;
Select.Option = Option;

export default Select;
