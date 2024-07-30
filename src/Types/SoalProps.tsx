export type SoalProps = {
  text: string | null;
  checked: boolean | undefined;
  setChecked: (value: boolean) => void;
  selectedOption: number | undefined;
  setSelectedOption: (value: number) => void;
};
