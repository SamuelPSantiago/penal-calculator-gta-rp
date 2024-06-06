import React, { useState, useCallback } from 'react';

import ReactSearchBox from "react-search-box";
import PasteImage from '../../components/PasteImage';

import {
    useUsersData,
    useOfficers,
    useAccusations,
    useForm,
    useCheckboxState,
    useVtrSelection,
    useFileUpload
} from '../../services/hooks';

import calculatePenalty from '../../services/calculatePenalty';
import makeReport from '../../services/makeReport';
import sendReport from '../../services/sendReport';

import vtrs from '../../assets/config/vtrs.json';
import penalCode from '../../assets/config/penalCode.json';

import {
    Container,
    Container2,
    Header,
    HeaderTitle,
    Form1,
    Form2,
    Form3,
    Form4,
    HeaderForm1,
    HeaderForm2,
    TitleForm,
    LineForm,
    LabelDataForm,
    InputDataForm,
    LineCheckBoxForm,
    CheckBoxForm,
    LabelCheckBoxForm,
    LineAccusationForm,
    CrimeAccusationForm,
    ImageContainer,
    PastedImage,
    GreenButton,
    RedButton,
    Switch,
    Slider,
    Report
} from './style';

function Home() {
    const { formData, handleChange } = useForm({ id_of: '', id_in: '' });
    const usersData = useUsersData();
    const [selectedVtrs, handleVtrChange] = useVtrSelection();
    const { officersPresent, officerResponsible } = useOfficers(formData, selectedVtrs, usersData);
    const { accusations, hmitigation, addAccusation, removeAccusation } = useAccusations();
    const [mitigation, handleMitigationChange, setMitigation] = useCheckboxState({ adv: false, cc: false, rp: false });
    const [aggravating, handleAggravatingChange] = useCheckboxState({ rm: false, rd: false, cm: false, vp: false });
    const { image, file, handleImagePaste } = useFileUpload();
    const [penalty, setPenalty] = useState(0);
    const [report, setReport] = useState('');

    const handleCalculatePenalty = useCallback(() => {
        const newPenalty = calculatePenalty(accusations, mitigation, aggravating);
        setPenalty(newPenalty);

        const newReport = makeReport(formData, officerResponsible, accusations, newPenalty, officersPresent);
        setReport(newReport);
    }, [accusations, mitigation, aggravating, formData, officerResponsible, officersPresent]);

    const handleSendReport = useCallback(() => {
        sendReport(report, file);
    }, [report, file]);

    const handleDeleteReport = () => {
        setReport('');
    }

    return (
        <Container>
            <Form3>
                <Header>
                    <HeaderTitle>Calculadora Penal</HeaderTitle>
                </Header>
            </Form3>
            <Form1>
                <HeaderForm1>
                    <TitleForm>Dados</TitleForm>
                </HeaderForm1>
                <LineForm>
                    <LabelDataForm>👮‍♂️ Id do oficial responsável:</LabelDataForm>
                    <InputDataForm
                        type="number"
                        name="id_of"
                        value={formData.id_of}
                        onChange={handleChange}
                    />
                </LineForm>
                <LineForm>
                    <LabelDataForm>👤 Id do indivíduo:</LabelDataForm>
                    <InputDataForm
                        type="number"
                        name="id_in"
                        value={formData.id_in}
                        onChange={handleChange}
                    />
                </LineForm>
                <LineForm>
                    <LabelDataForm>🚨 Viaturas presentes:</LabelDataForm>
                    {vtrs.map((vtr, index) => (
                        <LineCheckBoxForm key={vtr.id || index}>
                            <LabelCheckBoxForm>{vtr.name}</LabelCheckBoxForm>
                            <Switch>
                                <CheckBoxForm
                                    type='checkbox'
                                    value={vtr.id}
                                    onChange={handleVtrChange}
                                />
                                <Slider></Slider>
                            </Switch>
                        </LineCheckBoxForm>
                    ))}
                </LineForm>
            </Form1>
            <Form1>
                <HeaderForm2>
                    <TitleForm>🗝️ Acusações</TitleForm>
                    <ReactSearchBox
                        placeholder="Procure o artigo que o indivíduo infringiu..."
                        data={penalCode}
                        onSelect={(record) => addAccusation(record)}
                        autoFocus
                        leftIcon={<>📜</>}
                        iconBoxSize="48px"
                        inputHeight='40px'
                    />
                </HeaderForm2>
                {accusations.map((accusation, index) => (
                    <LineAccusationForm key={accusation.key || index}>
                        <CrimeAccusationForm onClick={() => removeAccusation(accusation)}>
                            Art. {accusation.key} ({accusation.value})
                        </CrimeAccusationForm>
                    </LineAccusationForm>
                ))}
            </Form1>
            <Container2>
                {hmitigation ? (
                    <Form4>
                        <HeaderForm1>
                            <TitleForm>👨🏻‍⚖️ Atenuantes</TitleForm>
                        </HeaderForm1>
                        <LineForm>
                            <LineCheckBoxForm>
                                <LabelCheckBoxForm>Presença de advogado</LabelCheckBoxForm>
                                <Switch>
                                    <CheckBoxForm
                                        type='checkbox'
                                        value={'adv'}
                                        onChange={handleMitigationChange}
                                    />
                                    <Slider></Slider>
                                </Switch>
                            </LineCheckBoxForm>
                            <LineCheckBoxForm>
                                <LabelCheckBoxForm>Confessar crime</LabelCheckBoxForm>
                                <Switch>
                                    <CheckBoxForm
                                        type='checkbox'
                                        value={'cc'}
                                        onChange={handleMitigationChange}
                                    />
                                    <Slider></Slider>
                                </Switch>
                            </LineCheckBoxForm>
                            <LineCheckBoxForm>
                                <LabelCheckBoxForm>Réu primário</LabelCheckBoxForm>
                                <Switch>
                                    <CheckBoxForm
                                        type='checkbox'
                                        value={'rp'}
                                        onChange={handleMitigationChange}
                                    />
                                    <Slider></Slider>
                                </Switch>
                            </LineCheckBoxForm>
                        </LineForm>
                    </Form4>
                ) : ''}
                <Form4>
                    <HeaderForm1>
                        <TitleForm>🧨 Agravantes</TitleForm>
                    </HeaderForm1>
                    <LineForm>
                        <LineCheckBoxForm>
                            <LabelCheckBoxForm>Réu incidente pelo mesmo crime</LabelCheckBoxForm>
                            <Switch>
                                <CheckBoxForm
                                    type='checkbox'
                                    value={'rm'}
                                    onChange={handleAggravatingChange}
                                />
                                <Slider></Slider>
                            </Switch>
                        </LineCheckBoxForm>
                        <LineCheckBoxForm>
                            <LabelCheckBoxForm>Réu incidente por crime diferente</LabelCheckBoxForm>
                            <Switch>
                                <CheckBoxForm
                                    type='checkbox'
                                    value={'rd'}
                                    onChange={handleAggravatingChange}
                                />
                                <Slider></Slider>
                            </Switch>
                        </LineCheckBoxForm>
                        <LineCheckBoxForm>
                            <LabelCheckBoxForm>Ultilizar veículo público para crimes</LabelCheckBoxForm>
                            <Switch>
                                <CheckBoxForm
                                    type='checkbox'
                                    value={'vp'}
                                    onChange={handleAggravatingChange}
                                />
                                <Slider></Slider>
                            </Switch>
                        </LineCheckBoxForm>
                        <LineCheckBoxForm>
                            <LabelCheckBoxForm>Cúmplice</LabelCheckBoxForm>
                            <Switch>
                                <CheckBoxForm
                                    type='checkbox'
                                    value={'cm'}
                                    onChange={handleAggravatingChange}
                                />
                                <Slider></Slider>
                            </Switch>
                        </LineCheckBoxForm>
                    </LineForm>
                </Form4>
            </Container2>
            <Form1>
                <HeaderForm1>
                    <TitleForm>📸 Foto</TitleForm>
                </HeaderForm1>
                <PasteImage onImagePaste={handleImagePaste} />
                {image && (
                    <ImageContainer>
                        <PastedImage src={image} alt="Pasted" />
                    </ImageContainer>
                )}
            </Form1>
            <Form2>
                <HeaderForm1>
                    <TitleForm>📋 Relatório</TitleForm>
                </HeaderForm1>
                {report ? (
                    <>
                        <Report>{report}</Report>
                        <RedButton onClick={handleDeleteReport}>Cancelar relatório</RedButton>
                        <GreenButton onClick={handleSendReport}>Enviar para o DISCORD</GreenButton>
                    </>
                ) : (
                    <GreenButton onClick={handleCalculatePenalty}>Gerar relatório</GreenButton>
                )}
            </Form2>
        </Container>
    );
};

export default Home;