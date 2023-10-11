export default class Preview {

    generatorParams: GeneratorParams;
    status: PreviewState;
    path: string;
    uid: string;
}

export class GeneratorParams {
    mask: string;
    scale: number;
    font: string;
    fontType: number;
    minFontSize: number;
    maxFontSize: number;
    fontStep: number;

    words: Array<Object>; //TODO: declare this object make a word class
    maxWords: number;
    repeat: boolean;

    mode: string;
    colors: Array<string>;
    backgroundColor;
    maskColor: boolean;
}

export enum PreviewState {
    INITIAL,
    BACKEND_REACHED,
    GENERATOR_PROCESSING,
    GENERATING,
    FINISHING,
    FINISHED,
    FAILED,
}