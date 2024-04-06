import ButtonEditor from 'dw/components/editor/ButtonEditor'
import CheckboxEditor from 'dw/components/editor/CheckboxEditor'
import ColorPickerEditor from 'dw/components/editor/ColorPickerEditor'
import DatasetInputEditor from 'dw/components/editor/DatasetInputEditor'
import DatasetVariableEditor from 'dw/components/editor/DatasetVariableEditor'
import ImageEditor from 'dw/components/editor/ImageEditor'
import InputEditor from 'dw/components/editor/InputEditor'
import RadioEditor from 'dw/components/editor/RadioEditor'
import SelectEditor from 'dw/components/editor/SelectEditor'
import StepperEditor from 'dw/components/editor/StepperEditor'
import SwitchEditor from 'dw/components/editor/SwitchEditor'
import TextAreaEditor from 'dw/components/editor/TextAreaEditor'
import TextEditor from 'dw/components/editor/TextEditor'
import EchartDataSet from 'dw/components/editor/EchartDataSet'

export type EditorMapProp = {
  Button: any
  Checkbox: any
  ColorPicker: any
  DatasetInput: any
  DatasetVariable: any
  Image: any
  Input: any
  Radio: any
  Select: any
  Stepper: any
  Switch: any
  TextArea: any
  Text: any
  EchartDataSet: any
}
const editorMap: EditorMapProp = {
  Button: ButtonEditor,
  Checkbox: CheckboxEditor,
  ColorPicker: ColorPickerEditor,
  DatasetInput: DatasetInputEditor,
  DatasetVariable: DatasetVariableEditor,
  Image: ImageEditor,
  Input: InputEditor,
  Radio: RadioEditor,
  Select: SelectEditor,
  Stepper: StepperEditor,
  Switch: SwitchEditor,
  TextArea: TextAreaEditor,
  Text: TextEditor,
  EchartDataSet: EchartDataSet,
}
export default editorMap
