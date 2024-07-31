export interface Questions {
    id: string | undefined;
    type: "physical" | "verbal" | "seksual" | "cyber" ;
    question: string | null;
    isChecked: boolean | undefined;
    selectedOption: number | undefined;
}

export interface QuestionCollection {
    physical: Questions[];
    verbal: Questions[];
    sexual: Questions[];
}