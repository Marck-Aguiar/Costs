import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const validate = () => {
        const errors = {};
        if (!project.name || project.name.trim() === '') {
            errors.name = 'Nome do Projeto é obrigatório.';
        }
        if (!project.budget || project.budget <= 0) {
            errors.budget = 'Orçamento do Projeto deve ser um valor positivo.';
        }
        if (!project.category || !project.category.id) {
            errors.category = 'Selecione uma categoria.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleSubmit(project);
        }
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o Nome do Projeto"
                handleOnChange={handleChange}
                value={project.name || ''}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
            
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o Orçamento Total"
                handleOnChange={handleChange}
                value={project.budget || ''}
            />
            {errors.budget && <div className={styles.error}>{errors.budget}</div>}
            
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            {errors.category && <div className={styles.error}>{errors.category}</div>}
            
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;