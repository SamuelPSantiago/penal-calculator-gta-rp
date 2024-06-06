import { useState, useEffect, useCallback } from 'react';

import getUsers from './getUsers';
import filterQsv from './filterQsv';
import getResponsible from './getResponsible';

export const useUsersData = () => {
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsersData(users);
        };

        fetchUsers();
    }, []);

    return usersData;
};

export const useOfficers = (formData, selectedVtrs, usersData) => {
    const [officersPresent, setOfficersPresent] = useState(null);
    const [officerResponsible, setOfficerResponsible] = useState(null);

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

    return { officersPresent, officerResponsible };
};

export const useAccusations = () => {
    const [accusations, setAccusations] = useState([]);
    const [hmitigation, setHmitigation] = useState(true);

    useEffect(() => {
        const hasKeyInRange = accusations.some(accusation =>
            (accusation.key >= 74 && accusation.key <= 78) ||
            accusation.key === 59
        );

        if (hasKeyInRange) {
            setHmitigation(false);
            setMitigation({ adv: false, cc: false, rp: false });
        } else {
            setHmitigation(true);
        }
    }, [accusations]);

    const addAccusation = useCallback((selected) => {
        setAccusations((prevAccusations) => [...prevAccusations, selected.item]);
    }, []);

    const removeAccusation = useCallback((accusationToRemove) => {
        setAccusations((prevAccusations) => prevAccusations.filter(accusation => accusation !== accusationToRemove));
    }, []);

    return { accusations, hmitigation, addAccusation, removeAccusation };
};

export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }, []);

    return { formData, handleChange };
};

export const useCheckboxState = (initialState) => {
    const [state, setState] = useState(initialState);

    const handleChange = useCallback((event) => {
        const { value, checked } = event.target;
        setState((prevState) => ({ ...prevState, [value]: checked }));
    }, []);

    return [state, handleChange];
};

export const useVtrSelection = () => {
    const [selectedVtrs, setSelectedVtrs] = useState([]);

    const handleVtrChange = useCallback((e) => {
        const { value, checked } = e.target;
        setSelectedVtrs((prevSelectedVtrs) => {
            if (checked) {
                return [...prevSelectedVtrs, value];
            } else {
                return prevSelectedVtrs.filter(vtr => vtr !== value);
            }
        });
    }, []);

    return [selectedVtrs, handleVtrChange];
};

export const useFileUpload = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleImagePaste = useCallback((file, imageData) => {
        setImage(imageData);
        setFile(file);
    }, []);

    return { image, file, handleImagePaste };
};