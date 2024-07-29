export type SoalProps = {
  text: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
};
