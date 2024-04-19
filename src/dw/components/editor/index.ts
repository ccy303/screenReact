import CheckboxEditor from "dw/components/editor/CheckboxEditor";
import ColorPickerEditor from "dw/components/editor/ColorPickerEditor";
import ImageEditor from "dw/components/editor/ImageEditor";
import InputEditor from "dw/components/editor/InputEditor";
import RadioEditor from "dw/components/editor/RadioEditor";
import SelectEditor from "dw/components/editor/SelectEditor";
import StepperEditor from "dw/components/editor/StepperEditor";
import SwitchEditor from "dw/components/editor/SwitchEditor";
import TextAreaEditor from "dw/components/editor/TextAreaEditor";
import TextEditor from "dw/components/editor/TextEditor";
import EchartDataSet from "dw/components/editor/EchartDataSet";
import VersionSelect from "dw/components/editor/VersionSelect";
import ChartIdSelect from "dw/components/editor/ChartIdSelect";
import RadiosOptions from "dw/components/editor/RadiosOptions";

export type EditorMapProp = {
    Checkbox: any;
    ColorPicker: any;
    Image: any;
    Input: any;
    Radio: any;
    Select: any;
    Stepper: any;
    Switch: any;
    TextArea: any;
    Text: any;
    EchartDataSet: any;
    VersionSelect: any;
    [key: string]: any;
};

const editorMap: EditorMapProp = {
    Checkbox: CheckboxEditor,
    ColorPicker: ColorPickerEditor,
    Image: ImageEditor,
    Input: InputEditor,
    Radio: RadioEditor,
    Select: SelectEditor,
    Stepper: StepperEditor,
    Switch: SwitchEditor,
    TextArea: TextAreaEditor,
    Text: TextEditor,
    EchartDataSet: EchartDataSet,
    VersionSelect: VersionSelect,
    ChartIdSelect: ChartIdSelect,
    RadiosOptions: RadiosOptions
};
export default editorMap;
