import React, { useState } from 'react';
import { AvatarInput } from './AvatarInput';
import { ButtonInput } from './ButtonInput';
import { CheckboxGroupInput } from './CheckboxGroupInput';
import { DatePicker } from './DatePicker';
import { Dropdown } from './Dropdown';
import { DateRangePicker } from './DateRangePicker';
import { InputOptionsPlaceholder } from "../utils/vinci";
import { File } from './File';
import { FileMultiple } from './FileMultiple';
import { ImageOutput } from './Image';
import { Input } from './Input';
import { PasswordInput } from './PasswordInput';
import { PhoneInput } from './PhoneInput';
import { CreditCardInput } from './CreditCardInput';
import { CurrencyInput } from './CurrencyInput';
import { StockInput } from './StockInput';
import { RadioGroupInput } from './RadioGroupInput';
import { OptionSelect } from './OptionSelect';
import { MultipleSelect } from './MultipleSelect';
import { SliderInput } from './SliderInput';
import { RangeSlider } from './RangeSlider';
import { Toggle } from './Toggle';
import { ConditionalTrigger } from './ConditionalTrigger';
import { Row } from './Row';
import { Accordion, AccordionItem } from './Accordion';
import { Codex, CodexItem } from './Codex';
import { CodexControls } from './Codexcontrols';
import { SectionTitle } from './SectionTitle';
import { Icon } from './Icons';
import { Box, Flex } from '@radix-ui/themes';
import { TextAreaInput } from './InputTextArea';
import { 
  avatarInputType, buttonInputType, checkboxInputType, conditionalInputType, countrydropdownInputType, countrymultiselectInputType, creditCardInputType, 
  currencyInputType, datePickerInputType, dateRangePickerInputType, dateTimePickerInputType, dropdownInputType, 
  fileInputType, fileMultipleInputType, imageOutputType, passwordInputType, phoneInputType, radioInputType, 
  rangeSliderInputType, selectInputType, selectMultipleInputType, sliderInputType, 
  stockInputType, textInputType, toggleInputType, textAreaInputType 
} from "../utils/voltaire";
import type { XFormType, XFormQuery } from '../utils/voltron';
import { DateTimePicker } from './DateTimePicker';
import { CountrySelect } from './CountrySelect';
import type { FormikHelpers } from 'formik';
import type { VectorSigma } from './VectorSigma';
import { VectorSigmaErrorBoundary } from './VectorSigmaErrorBoundary';

export type teletraan1Display = 'accordion' | 'codice' | 'codex' | 'dual';

/**
 * Teletraan1Props Interface
 * @description Dynamic Form Rendering Engine for VectorSigma xForm models.
 */
export interface Teletraan1Props {
  /**
   * The structural schema object describing form sections, queries, layout, and validation rules.
   */
  xFormModel: XFormType;

  /**
   * Disables all interactive inputs across all sections.
   * @default false
   */
  readOnlyMode?: boolean;

  /**
   * Layout presentation strategy for form sections:
   * - `codice`: Standard vertical document flow with section title banners (Default).
   * - `codex`: Multi-step sequential wizard with responsive stepper progress bar.
   * - `accordion`: Multi-panel expandable and collapsible sections.
   * - `dual`: Interactive toggle permitting switching between accordion and vertical cards.
   * @default "codice"
   */
  displayMode?: teletraan1Display;

  /**
   * Primary brand color used for section banners, active step nodes, and accents.
   * @default "#000000"
   */
  brandColor?: string;

  /**
   * Enables section-by-section Formik validation when operating in `codex` mode.
   * Blocks forward step advancement if fields in the active step are invalid.
   * @default false
   */
  strictValidation?: boolean;

  /**
   * Callback fired before navigating backwards in `codex` mode.
   */
  onPrev?: () => void;

  /**
   * Callback fired before advancing forwards in `codex` mode.
   */
  onNext?: () => void;

  /**
   * Callback fired upon terminal form completion or submission.
   */
  onFinish?: (
    values: any, 
    actions: FormikHelpers<any>, 
    instance: VectorSigma<any>
  ) => void | Promise<any>;
}

export const Teletraan1 = ({ 
  xFormModel, 
  readOnlyMode = false, 
  displayMode = 'codice', 
  brandColor = "#000000",
  strictValidation = true,
  onPrev, 
  onNext, 
  onFinish
}: Teletraan1Props) => {

  const [dualToggled, setDualToggled] = useState(false);

  /**
   * Resolves an individual XFormQuery schema node into its matching VectorSigma input primitive.
   */
  const renderInputPrimitive = (query: XFormQuery, childInputNode?: React.ReactNode) => {
    const {
      inputAlias,
      inputType,
      inputWidth,
      inputLabel,
      inputPlaceholder,
      newRow = false,
      isHinted,
      hintText,
      hintUrl,
      errorText,
      defaultValue,
      inputOptions,
      triggerValue,
      minValue,
      maxValue,
      stepValue,
      inputHeight,
      readOnly: fieldReadOnly,
    } = query;

    const normalizedWidth = (inputWidth == null || inputWidth > 12 || inputWidth < 1) ? 12 : inputWidth;
    const isFieldReadOnly = readOnlyMode || Boolean(fieldReadOnly);
    const normalizedType = (inputType || 'text').toLowerCase();

    // REMOVED 'key: inputAlias' to fix React spread key warning. 
    // The key is already supplied by the wrapping React.Fragment in renderQueries.
    const layoutProps = {
      alias: inputAlias,
      width: normalizedWidth,
      inputLabel: inputLabel,
      newRow: newRow,
      readOnly: isFieldReadOnly,
      isHinted: isHinted,
      hintText: hintText,
      hintUrl: hintUrl,
      errorText: errorText
    };

    const parsedMin = minValue !== undefined && minValue !== '' ? Number(minValue) : undefined;
    const parsedMax = maxValue !== undefined && maxValue !== '' ? Number(maxValue) : undefined;
    const parsedStep = stepValue !== undefined && stepValue !== '' ? Number(stepValue) : undefined;

    switch (true) {
      case avatarInputType.includes(normalizedType):
        return <AvatarInput {...layoutProps} />;

      case buttonInputType.includes(normalizedType):
        return <ButtonInput {...layoutProps}>{defaultValue}</ButtonInput>;

      case checkboxInputType.includes(normalizedType):
        return (
          <CheckboxGroupInput 
            {...layoutProps} 
            direction="row" 
            inputOptions={inputOptions || [InputOptionsPlaceholder]} 
          />
        );

      case conditionalInputType.includes(normalizedType):
        return (
          <ConditionalTrigger 
            {...layoutProps} 
            inputOptions={inputOptions} 
            inputtype={inputType as any} 
            triggerValue={triggerValue}
          >
            {childInputNode}
          </ConditionalTrigger>
        );

      case datePickerInputType.includes(normalizedType):
        return <DatePicker {...layoutProps} placeholder={inputPlaceholder} />;

      case dateRangePickerInputType.includes(normalizedType):
        return <DateRangePicker {...layoutProps} placeholder={inputPlaceholder} />;

      case dateTimePickerInputType.includes(normalizedType):
        return <DateTimePicker {...layoutProps} placeholder={inputPlaceholder} />;

      case dropdownInputType.includes(normalizedType):
        return (
          <Dropdown 
            {...layoutProps} 
            placeholder={inputPlaceholder} 
            inputOptions={inputOptions || [InputOptionsPlaceholder]} 
          />
        );

      case countrydropdownInputType.includes(normalizedType):
        return (
          <CountrySelect 
            displayFlag 
            enableSearch 
            {...layoutProps} 
            placeholder={inputPlaceholder} 
          />
        );

      case countrymultiselectInputType.includes(normalizedType):
        return (
          <CountrySelect 
            displayFlag 
            enableSearch 
            multiselect 
            {...layoutProps} 
            placeholder={inputPlaceholder} 
          />
        );

      case fileInputType.includes(normalizedType):
        return <File {...layoutProps} preview />;

      case fileMultipleInputType.includes(normalizedType):
        return <FileMultiple {...layoutProps} placeholder={inputPlaceholder} preview />;

      case imageOutputType.includes(normalizedType):
        return (
          <ImageOutput 
            id={inputAlias} 
            src={defaultValue} 
            alt={inputPlaceholder} 
            width={normalizedWidth} 
            height={inputHeight ? Number(inputHeight) : 200} 
          />
        );

      case textAreaInputType.includes(normalizedType):
        return <TextAreaInput {...layoutProps} placeholder={inputPlaceholder} defaultValue={defaultValue} />;

      case textInputType.includes(normalizedType):
        return <Input {...layoutProps} placeholder={inputPlaceholder} />;

      case passwordInputType.includes(normalizedType):
        return <PasswordInput {...layoutProps} placeholder={inputPlaceholder} />;

      case phoneInputType.includes(normalizedType):
        return <PhoneInput {...layoutProps} placeholder={inputPlaceholder} />;

      case creditCardInputType.includes(normalizedType):
        return <CreditCardInput {...layoutProps} placeholder={inputPlaceholder} />;

      case currencyInputType.includes(normalizedType):
        return <CurrencyInput {...layoutProps} placeholder={inputPlaceholder} />;

      case stockInputType.includes(normalizedType):
        return <StockInput {...layoutProps} placeholder={inputPlaceholder} defaultvalue={defaultValue} />;

      case radioInputType.includes(normalizedType):
        return (
          <RadioGroupInput 
            {...layoutProps} 
            direction="row" 
            inputOptions={inputOptions || [InputOptionsPlaceholder]} 
          />
        );

      case selectInputType.includes(normalizedType):
        return (
          <OptionSelect 
            {...layoutProps} 
            placeholder={inputPlaceholder} 
            inputOptions={inputOptions || [InputOptionsPlaceholder]} 
          />
        );

      case selectMultipleInputType.includes(normalizedType):
        return (
          <MultipleSelect 
            {...layoutProps} 
            placeholder={inputPlaceholder} 
            inputOptions={inputOptions || [InputOptionsPlaceholder]} 
          />
        );

      case sliderInputType.includes(normalizedType):
        return (
          <SliderInput 
            {...layoutProps} 
            stepvalue={parsedStep} 
            minvalue={parsedMin} 
            maxvalue={parsedMax} 
          />
        );

      case rangeSliderInputType.includes(normalizedType):
        return (
          <RangeSlider 
            {...layoutProps} 
            stepvalue={parsedStep} 
            minvalue={parsedMin} 
            maxvalue={parsedMax} 
          />
        );

      case toggleInputType.includes(normalizedType):
        return <Toggle {...layoutProps} icon="layers" />;

      default:
        return <Input {...layoutProps} placeholder={inputPlaceholder} />;
    }
  };

  /**
   * Recursively traverses and renders an array of XFormQuery nodes, resolving nested conditional children.
   */
  const renderQueries = (queries: XFormQuery[]) => {
    if (!queries || !Array.isArray(queries)) return null;

    return queries.map((queryNode, index) => {
      const stableKey = queryNode.inputAlias || `query-${index}`;

      const childInput = queryNode.toggledInput 
        ? renderInputPrimitive(queryNode.toggledInput) 
        : null;

      return (
        <React.Fragment key={stableKey}>
          {renderInputPrimitive(queryNode, childInput)}
        </React.Fragment>
      );
    });
  };

  /**
   * Renders the form model according to the configured display strategy.
   */
  const renderDisplayMode = () => {
    const sections = xFormModel.model || [];
    const defaultSectionId = sections[0]?.sectionId ? String(sections[0].sectionId) : '';

    switch (displayMode) {
      case 'dual':
        return (
          <Box px={{ initial: '4', sm: '6', md: '8' }} style={{ width: '100%', boxSizing: 'border-box' }}>
            <Flex align="center" justify="center" gap="3" style={{ marginBottom: '24px' }}>
              <div
                onClick={() => setDualToggled(!dualToggled)}
                role="switch"
                aria-checked={dualToggled}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDualToggled(!dualToggled);
                  }
                }}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: dualToggled ? (brandColor || 'var(--accent-9)') : 'var(--gray-5)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                  padding: '2px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    transform: dualToggled ? 'translateX(20px)' : 'translateX(0)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
              <Icon 
                name="layers" 
                height="20" 
                width="20" 
                color={dualToggled ? (brandColor || 'var(--accent-9)') : 'var(--gray-9)'} 
                style={{ opacity: readOnlyMode ? 0.5 : 1, cursor: 'pointer', transition: 'color 0.2s ease' }} 
                onClick={() => setDualToggled(!dualToggled)} 
              />
            </Flex>

            {dualToggled ? (
              <Accordion 
                defaultOpenId={defaultSectionId} 
                allowMultiple 
                brandcolor={brandColor} 
                titleColor="#ffffff"
              >
                {sections.map((formsection) => (
                  <AccordionItem 
                    key={String(formsection.sectionId)} 
                    sectionId={String(formsection.sectionId)} 
                    title={formsection.title} 
                    subtitle={formsection.subtitle || undefined} 
                    icon={<Icon name={formsection.icon || "layers"} />}
                  >
                    <Row>{renderQueries(formsection.queries)}</Row>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              sections.map((formsection) => (
                <React.Fragment key={String(formsection.sectionId)}>
                  <Box 
                    style={{ 
                      backgroundColor: brandColor || 'var(--accent-9)', 
                      padding: '8px 16px',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}
                  >
                    <SectionTitle 
                      withSeparator={false} 
                      titleColor="#ffffff" 
                      subtitleColor="#ffffff" 
                      title={formsection.title}
                      subTitle={formsection.subtitle || undefined} 
                      icon={<Icon name={formsection.icon || "layers"} color="#ffffff" />}
                    />
                  </Box>
                  <Box mb="6">
                    <Row>{renderQueries(formsection.queries)}</Row>
                  </Box>
                </React.Fragment>
              ))
            )}
          </Box>
        );

      case 'accordion':
        return (
          <Accordion 
            defaultOpenId={defaultSectionId} 
            allowMultiple 
            brandcolor={brandColor} 
            titleColor="#ffffff"
          >
            {sections.map((formsection) => (
              <AccordionItem 
                key={String(formsection.sectionId)} 
                sectionId={String(formsection.sectionId)} 
                title={formsection.title} 
                subtitle={formsection.subtitle || undefined} 
                icon={<Icon name={formsection.icon || "layers"} />}
              >
                <Row>{renderQueries(formsection.queries)}</Row>
              </AccordionItem>
            ))}
          </Accordion>
        );

      case 'codex':
        return (
          <Codex brandColor={brandColor} strictValidation={strictValidation}>
            {sections.map((formsection, index, array) => (
              <CodexItem 
                key={String(formsection.sectionId)} 
                stepId={String(formsection.sectionId)} 
                title={formsection.title}
                subtitleDescription={formsection.subtitle || undefined} 
                icon={<Icon name={formsection.icon || "layers"} />}
              >
                <Row>{renderQueries(formsection.queries)}</Row>
                <CodexControls 
                  prevStepId={index > 0 ? String(array[index - 1].sectionId) : undefined} 
                  nextStepId={index < array.length - 1 ? String(array[index + 1].sectionId) : undefined}
                  onPrev={onPrev}
                  onNext={onNext}
                  onFinish={onFinish as any}
                />
              </CodexItem>
            ))}
          </Codex>
        );

      case 'codice':
      default:
        return (
          <Box key={xFormModel.uuid} px={{ initial: '4', sm: '6', md: '8' }} style={{ width: '100%', boxSizing: 'border-box' }}>
            {sections.map((formsection) => (
              <React.Fragment key={String(formsection.sectionId)}>
                <Box 
                  style={{ 
                    backgroundColor: brandColor || 'var(--accent-9)', 
                    padding: '8px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                >
                  <SectionTitle 
                    withSeparator={false} 
                    titleColor="#ffffff" 
                    subtitleColor="#ffffff" 
                    title={formsection.title}
                    subTitle={formsection.subtitle || undefined} 
                    icon={<Icon name={formsection.icon || "layers"} color="#ffffff" />}
                  />
                </Box>
                <Box mb="6">
                  <Row>{renderQueries(formsection.queries)}</Row>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        );
    }
  };

  return <><VectorSigmaErrorBoundary brandColor={brandColor}>{renderDisplayMode()}</VectorSigmaErrorBoundary></>;
};