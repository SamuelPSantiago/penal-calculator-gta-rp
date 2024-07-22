import { useState, useEffect, useCallback } from 'react';
import getUsers from './getUsers';
import filterQsv from './filterQsv';
import getResponsible from './getResponsible';

// Debounce hook to delay execution of a function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// Hook to fetch users data
export const useUsersData = (formData) => {
    const [usersData, setUsersData] = useState(null);
    const debouncedFormData = useDebounce(formData, 300); // 300ms delay

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsersData(users);
        };

        fetchUsers();
    }, [debouncedFormData]);

    return usersData;
};

// Hook to manage officers data
export const useOfficers = (formData, selectedVtrs, usersData) => {
    const [officersPresent, setOfficersPresent] = useState(null);
    const [officerResponsible, setOfficerResponsible] = useState(null);
    const debouncedFormData = useDebounce(formData, 300); // 300ms delay

    useEffect(() => {
        const fetchOfficers = async () => {
            if (usersData) {
                const updatedOfficers = await filterQsv(debouncedFormData.id_of, selectedVtrs, usersData);
                setOfficersPresent(updatedOfficers);

                const officer = await getResponsible(debouncedFormData.id_of, usersData);
                setOfficerResponsible(officer);
            }
        };

        fetchOfficers();
    }, [debouncedFormData, selectedVtrs, usersData]);

    return { officersPresent, officerResponsible };
};

// Hook to manage accusations state
export const useAccusations = () => {
    const [accusations, setAccusations] = useState([]);
    const [hmitigation, setHmitigation] = useState(true);
    const [mitigation, setMitigation] = useState({ adv: true, cc: true, rp: true });

    useEffect(() => {
        const hasKeyInRange = accusations.some(accusation =>
            (accusation.key >= 74 && accusation.key <= 78) || accusation.key === 59
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

    return { accusations, hmitigation, mitigation, addAccusation, removeAccusation };
};

// Hook to manage form data
export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }, []);

    return { formData, handleChange };
};

// Hook to manage checkbox state
export const useCheckboxState = (initialState) => {
    const [state, setState] = useState(initialState);

    const handleChange = useCallback((event) => {
        const { value, checked } = event.target;
        setState((prevState) => ({ ...prevState, [value]: checked }));
    }, []);

    return [state, handleChange];
};

// Hook to manage VTR selection
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

// Hook to manage file upload
export const useFileUpload = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const handleImagePaste = useCallback((file, imageData) => {
        setImage(imageData);
        setFile(file);
    }, []);

    return { image, file, handleImagePaste };
};
