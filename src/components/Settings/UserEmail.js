import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/Api';
import AlertErrors from '../../utils/AlertErrors';
import firebase from '../../utils/Firebase';
import 'firebase/auth';

export default function UserEmail(props) {

    const { user, setShowModal, setTitleModal, setContentModal } = props;

    const onEdit = () => {
        setTitleModal("Actualizar email");
        setContentModal(<ChangeEmailFrom email={user.email} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    return (
        <div className="user-email">
            <h3>Email: { user.email }</h3>
            <Button circular onClick={onEdit}>Actualizar</Button>
        </div>
    )
}

function ChangeEmailFrom(props){

    const { email, setShowModal } = props;
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if(!formData.email || formData.email === email){
            toast.warning("El email no puede ser el mismo o estar vacío");
        }else if(!formData.password){
            toast.warning("El password no puede estar vacío");
        }else{
            setIsLoading(true);
            reauthenticate(formData.password).then(() => {
                const currentUser = firebase.auth().currentUser;
                currentUser.updateEmail(formData.email).then(() => {
                    toast.success("Email actualizado");
                    setIsLoading(false);
                    setShowModal(false);

                    currentUser.sendEmailVerification().then(() => {
                        firebase.auth().signOut();
                    });

                })
                .catch(err => {
                    AlertErrors(err?.code);
                    setIsLoading(false);
                })
            })
            .catch(err => {
                AlertErrors(err?.code);
                setIsLoading(false);
            })
        }
    }

    return(
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    type="email" 
                    defaultValue={email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </Form.Field>
            <Form.Field>
                <Input
                    type={ showPassword ? "text" : "password" }
                    placeholder="Password"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    icon={ 
                        <Icon 
                            name={ showPassword ? "eye slash outline" : "eye" } 
                            link 
                            onClick={ () => setShowPassword(!showPassword) }
                        /> }
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Actualizar email
            </Button>
        </Form>
    )
}
