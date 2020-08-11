import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { ErrorMessage } from '@hookform/error-message';
import { gql, useMutation } from '@apollo/client';
import {
  CreateIncidentPayload,
  MutationCreateIncidentArgs,
} from '../../common/types';

type Inputs = {
  author: string;
  message: string;
};

const CREATE_INCIDENT = gql`
  mutation CreateIncident($input: createIncidentInput) {
    createIncident(input: $input) {
      incident {
        author
        message
      }
    }
  }
`;

const IncidentForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [
    createIncident,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<CreateIncidentPayload, MutationCreateIncidentArgs>(
    CREATE_INCIDENT,
  );

  function onSubmit(data: Inputs) {
    createIncident({
      variables: {
        input: { data: { author: data.author, message: data.message } },
      },
      refetchQueries: ['Incidents'],
    });
  }

  return (
    <div>
      {mutationLoading ? (
        <Spinner color='primary' />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='author'>Nick</Label>
            <Input
              name='author'
              id='author'
              innerRef={register({
                maxLength: {
                  value: 50,
                  message: 'Maksymalna liczba znaków wynosi 250.',
                },
              })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='message'>Wiadomość</Label>
            <Input
              type='textarea'
              name='message'
              id='message'
              innerRef={register({
                required: 'To pole jest wymagane.',
                minLength: {
                  value: 10,
                  message: 'Minimalna ilość znaków dla tego pola wynosi 10.',
                },
                maxLength: {
                  value: 250,
                  message: 'Maksymalna liczba znaków wynosi 250.',
                },
              })}
            />
            <ErrorMessage errors={errors} name='message' />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      )}
      {mutationError && alert('Error')}
    </div>
  );
};

export default IncidentForm;
