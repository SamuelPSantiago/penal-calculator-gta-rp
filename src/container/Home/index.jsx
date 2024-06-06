import React, { useState, useEffect } from 'react';

import ReactSearchBox from "react-search-box";
import PasteImage from '../../components/PasteImage';

import getUsers from '../../services/getUsers';
import filterQsv from '../../services/filterQsv';
import getResponsible from '../../services/getResponsible';
import calculatePenalty from '../../services/calculatePenalty';
import makeReport from '../../services/makeReport';
import sendReport from '../../services/sendReport';

import vtrs from '../../assets/config/vtrs.json';
import penalCode from '../../assets/config/penalCode.json';

import {
    Container,
    Header,
    HeaderTitle,
    Form1,
    Form2,
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
    PastedImage
} from './style';

function Home() {
    const [formData, setFormData] = useState({ id_of: '', id_in: '' });
    const [usersData, setUsersData] = useState(null);
    const [selectedVtrs, setSelectedVtrs] = useState([]);
    const [officersPresent, setOfficersPresent] = useState(null);
    const [officerResponsible, setOfficerResponsible] = useState(null);
    const [accusations, setAccusations] = useState([]);
    const [penalty, setPenalty] = useState(0);

    const [hmitigation, setHmitigation] = useState(true);
    const [mitigation, setMitigation] = useState({ adv: false, cc: false, rp: false });
    const [aggravating, setAggravating] = useState({ rm: false, rd: false, cm: false, vp: false });

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const [report, setReport] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsersData(users);
        };

        fetchUsers();

    }, [selectedVtrs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleVtrChange = (e) => {
        const { value, checked } = e.target;
        setSelectedVtrs((prevSelectedVtrs) => {
            if (checked) {
                return [...prevSelectedVtrs, value];
            } else {
                return prevSelectedVtrs.filter(vtr => vtr !== value);
            }
        });
    };

    useEffect(() => {
        const fetchOfficers = async () => {
            if (usersData) {
                const updatedOfficers = await filterQsv(formData.id_of, selectedVtrs, usersData);
                setOfficersPresent(updatedOfficers);

                const officer = await getResponsible(formData.id_of, usersData);
                setOfficerResponsible(officer);
            }
        };

        fetchOfficers();
    }, [formData, selectedVtrs, usersData]);

    const handleSelectAccusation = (selected) => {
        const newAccusations = [...accusations, selected.item];
        setAccusations(newAccusations);
    };

    const removeAccusation = (accusationToRemove) => {
        setAccusations(accusations.filter(accusation => accusation !== accusationToRemove));
    };

    useEffect(() => {
        const hasKeyInRange = accusations.some(accusation =>
            (accusation.key >= 74 && accusation.key <= 78) ||
            accusation.key === 59
        );

        if (hasKeyInRange) {
            setHmitigation(false);
            setMitigation({
                adv: false,
                cc: false,
                rp: false
            });
        }
        else
            setHmitigation(true);
    }, [accusations]);

    const handleMitigationChange = (event) => {
        const { value, checked } = event.target;
        setMitigation((prevState) => ({
            ...prevState,
            [value]: checked,
        }));
    };

    const handleAggravatingChange = (event) => {
        const { value, checked } = event.target;
        setAggravating((prevState) => ({
            ...prevState,
            [value]: checked,
        }));
    };

    const handleImagePaste = (file, imageData) => {
        setImage(imageData);
        setFile(file);
    };

    const handleCalculatePenalty = () => {
        const newPenalty = calculatePenalty(accusations, mitigation, aggravating);
        setPenalty(newPenalty);

        const newReport = makeReport(formData, officerResponsible, accusations, newPenalty, officersPresent);
        setReport(newReport);
    }

    const handleSendReport = () => {
        sendReport(report, file);
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>Calculadora Penal</HeaderTitle>
            </Header>
            <Form1>
                <HeaderForm1>
                    <TitleForm>Dados</TitleForm>
                </HeaderForm1>
                <LineForm>
                    <LabelDataForm>Id do oficial responsável:</LabelDataForm>
                    <InputDataForm
                        type="number"
                        name="id_of"
                        value={formData.id_of}
                        onChange={handleChange}
                    />
                </LineForm>
                <LineForm>
                    <LabelDataForm>Id do indivíduo:</LabelDataForm>
                    <InputDataForm
                        type="number"
                        name="id_in"
                        value={formData.id_in}
                        onChange={handleChange}
                    />
                </LineForm>
                <LineForm>
                    <LabelDataForm>Viaturas presentes:</LabelDataForm>
                    {vtrs.map((vtr) => (
                        <LineCheckBoxForm key={vtr.id}>
                            <CheckBoxForm
                                type='checkbox'
                                value={vtr.id}
                                onChange={handleVtrChange}
                            />
                            <LabelCheckBoxForm>{vtr.name}</LabelCheckBoxForm>
                        </LineCheckBoxForm>
                    ))}
                </LineForm>
            </Form1>
            <Form1>
                <HeaderForm2>
                    <TitleForm>Acusações</TitleForm>
                    <ReactSearchBox
                        placeholder="Procure o artigo que o indivíduo infringiu..."
                        data={penalCode}
                        onSelect={(record) => handleSelectAccusation(record)}
                        autoFocus
                        leftIcon={<>📜</>}
                        iconBoxSize="48px"
                    />
                </HeaderForm2>
                {accusations.map((accusation) => (
                    <LineAccusationForm key={accusation.key}>
                        <CrimeAccusationForm onClick={() => { removeAccusation(accusation) }}>- Art. {accusation.key} ({accusation.value})</CrimeAccusationForm>
                    </LineAccusationForm>
                ))}
            </Form1>
            {hmitigation ? (
                <Form1>
                    <HeaderForm1>
                        <TitleForm>Atenuantes</TitleForm>
                    </HeaderForm1>
                    <LineForm>
                        <LineCheckBoxForm>
                            <CheckBoxForm
                                type='checkbox'
                                value={'adv'}
                                onChange={handleMitigationChange}
                            />
                            <LabelCheckBoxForm>Presença de advogado</LabelCheckBoxForm>
                        </LineCheckBoxForm>
                        <LineCheckBoxForm>
                            <CheckBoxForm
                                type='checkbox'
                                value={'cc'}
                                onChange={handleMitigationChange}
                            />
                            <LabelCheckBoxForm>Confessar crime</LabelCheckBoxForm>
                        </LineCheckBoxForm>
                        <LineCheckBoxForm>
                            <CheckBoxForm
                                type='checkbox'
                                value={'rp'}
                                onChange={handleMitigationChange}
                            />
                            <LabelCheckBoxForm>Réu primário</LabelCheckBoxForm>
                        </LineCheckBoxForm>
                    </LineForm>
                </Form1>
            ) : ''}
            <Form1>
                <HeaderForm1>
                    <TitleForm>Agravantes</TitleForm>
                </HeaderForm1>
                <LineForm>
                    <LineCheckBoxForm>
                        <CheckBoxForm
                            type='checkbox'
                            value={'rm'}
                            onChange={handleAggravatingChange}
                        />
                        <LabelCheckBoxForm>Réu incidente pelo mesmo crime</LabelCheckBoxForm>
                    </LineCheckBoxForm>
                    <LineCheckBoxForm>
                        <CheckBoxForm
                            type='checkbox'
                            value={'rd'}
                            onChange={handleAggravatingChange}
                        />
                        <LabelCheckBoxForm>Réu incidente por crime diferente</LabelCheckBoxForm>
                    </LineCheckBoxForm>
                    <LineCheckBoxForm>
                        <CheckBoxForm
                            type='checkbox'
                            value={'vp'}
                            onChange={handleAggravatingChange}
                        />
                        <LabelCheckBoxForm>Ultilizar veículo público para crimes</LabelCheckBoxForm>
                    </LineCheckBoxForm>
                    <LineCheckBoxForm>
                        <CheckBoxForm
                            type='checkbox'
                            value={'cm'}
                            onChange={handleAggravatingChange}
                        />
                        <LabelCheckBoxForm>Cúmplice</LabelCheckBoxForm>
                    </LineCheckBoxForm>
                </LineForm>
            </Form1>
            <Form1>
                <HeaderForm1>
                    <TitleForm>Foto</TitleForm>
                </HeaderForm1>
                <PasteImage onImagePaste={handleImagePaste} />
                {image && (
                    <ImageContainer>
                        <h3>Imagem colada:</h3>
                        <PastedImage src={image} alt="Pasted" />
                    </ImageContainer>
                )}
            </Form1>
            <Form2>
                <HeaderForm1>
                    <TitleForm>Relatório</TitleForm>
                </HeaderForm1>
                <button onClick={handleCalculatePenalty}>Gerar Relatório</button>
                {report && (
                    <pre>{report}</pre>
                )}
                <button onClick={handleSendReport}>Enviar Relatório</button>
            </Form2>
        </Container>
    );
}

export default Home;