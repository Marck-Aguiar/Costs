import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }) {
    const [service, setService] = useState({})
    const [errors, setErrors] = useState({})

    function validate() {
        const errors = {}
        if (!service.name || service.name.trim() === '') {
            errors.name = 'Nome do serviço é obrigatório.'
        }
        if (!service.cost || service.cost.trim() === '') {
            errors.cost = 'Custo do serviço é obrigatório.'
        }
        return errors
    }

    function submit(e) {
        e.preventDefault()
        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return
        }
        setErrors({}) // Clear errors if validation passes
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
                value={service.name || ''}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}

            <Input
                type="number"
                text="Custo do Serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
                value={service.cost || ''}
            />
            {errors.cost && <p className={styles.error}>{errors.cost}</p>}

            <Input
                type="text"
                text="Descrição do Serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
                value={service.description || ''}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm
