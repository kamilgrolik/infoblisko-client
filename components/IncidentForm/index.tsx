import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ErrorMessage } from '@hookform/error-message';
import { gql, useMutation } from '@apollo/client';
import {
  CreateIncidentPayload,
  MutationCreateIncidentArgs,
} from '../../common/types';
import { Wrapper } from './styled';

type Props = {
  isOpen: boolean;
  setIsOpen: any; //TODO: typing
};

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

const IncidentForm = ({ isOpen, setIsOpen }: Props) => {
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
    <Modal isOpen={isOpen} toggle={() => setIsOpen(true)}>
      <ModalHeader>Dodaj wydarzenie</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='author'>Nick</Label>
            <Input
              name='author'
              id='author'
              disabled={mutationLoading}
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
              disabled={mutationLoading}
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
              style={{ minHeight: '200px' }}
            />
            <ErrorMessage errors={errors} name='message' />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={mutationLoading}
          color='primary'
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        <Button color='secondary' onClick={() => setIsOpen(false)}>
          Anuluj
        </Button>
      </ModalFooter>
      {mutationError && alert('Error')}
    </Modal>
  );
};

export default IncidentForm;
