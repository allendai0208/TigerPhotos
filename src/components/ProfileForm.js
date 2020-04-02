import React, {useState} from 'react';
import { Form, Input, Button } from 'semantic-ui-react';

export const ProfileForm = ({onNewProfile}) => {
    const[first_name, setFirstname] = useState('');
    const[last_name, setLastname] = useState('');
    const[email, setEmail] = useState('');
    const[description, setDescription] = useState('');

    return (
        <Form>
            <Form.Field>
                <Input 
                    placeholder="First Name:" 
                    value={first_name} 
                    onChange={e => setFirstname(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Last Name:" 
                    value={last_name} 
                    onChange={e => setLastname(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Input 
                    placeholder="Description" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <Button 
                    onClick={ async () => {
                        const photographer = { first_name, last_name, email, description };
                        const response = await fetch('/api/createProfile', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(photographer)
                        });
                    
                        if (response.ok) {
                            console.log('response worked');
                            onNewProfile(photographer);
                            setFirstname('');
                            setLastname('');
                            setEmail('');
                            setDescription('');
                        }
                    }}
                >
                    submit
                </Button>
            </Form.Field>
        </Form>
        );
    };
